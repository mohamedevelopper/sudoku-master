import { Difficulty, GridSize, SudokuCell } from '../types';

// Get sub-grid (box) dimensions for a given grid size.
// 4x4 -> 2x2 boxes, 6x6 -> 2x3 boxes, 9x9 -> 3x3, 12x12 -> 3x4, 16x16 -> 4x4
export function getBoxDims(size: GridSize): { boxRows: number; boxCols: number } {
  switch (size) {
    case 4: return { boxRows: 2, boxCols: 2 };
    case 6: return { boxRows: 2, boxCols: 3 };
    case 9: return { boxRows: 3, boxCols: 3 };
    case 12: return { boxRows: 3, boxCols: 4 };
    case 16: return { boxRows: 4, boxCols: 4 };
  }
}

export function isValidInMatrix(
  matrix: number[][],
  row: number,
  col: number,
  num: number,
  size: GridSize
): boolean {
  for (let c = 0; c < size; c++) {
    if (matrix[row][c] === num && c !== col) return false;
  }
  for (let r = 0; r < size; r++) {
    if (matrix[r][col] === num && r !== row) return false;
  }
  const { boxRows, boxCols } = getBoxDims(size);
  const boxRowStart = Math.floor(row / boxRows) * boxRows;
  const boxColStart = Math.floor(col / boxCols) * boxCols;
  for (let r = boxRowStart; r < boxRowStart + boxRows; r++) {
    for (let c = boxColStart; c < boxColStart + boxCols; c++) {
      if (matrix[r][c] === num && (r !== row || c !== col)) return false;
    }
  }
  return true;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function solveMatrix(matrix: number[][], size: GridSize): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] === 0) {
        const nums = shuffleArray(Array.from({ length: size }, (_, i) => i + 1));
        for (const num of nums) {
          if (isValidInMatrix(matrix, row, col, num, size)) {
            matrix[row][col] = num;
            if (solveMatrix(matrix, size)) return true;
            matrix[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Deterministic solver (no shuffle) for the uniqueness check
function deterministicSolve(matrix: number[][], size: GridSize): boolean {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] === 0) {
        for (let num = 1; num <= size; num++) {
          if (isValidInMatrix(matrix, row, col, num, size)) {
            matrix[row][col] = num;
            if (deterministicSolve(matrix, size)) return true;
            matrix[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function fillBox(matrix: number[][], row: number, col: number, size: GridSize) {
  const { boxRows, boxCols } = getBoxDims(size);
  const nums = shuffleArray(Array.from({ length: size }, (_, i) => i + 1));
  let idx = 0;
  for (let r = 0; r < boxRows; r++) {
    for (let c = 0; c < boxCols; c++) {
      matrix[row + r][col + c] = nums[idx++];
    }
  }
}

export function generateFullMatrix(size: GridSize): number[][] {
  const matrix: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));
  const { boxRows, boxCols } = getBoxDims(size);

  // Fill diagonal boxes since they are independent
  const numDiagBoxes = Math.min(Math.floor(size / boxRows), Math.floor(size / boxCols));
  for (let i = 0; i < numDiagBoxes; i++) {
    fillBox(matrix, i * boxRows, i * boxCols, size);
  }

  solveMatrix(matrix, size);
  return matrix;
}

// Difficulty config: percentage of cells revealed
const DIFFICULTY_REVEAL_PCT: Record<Difficulty, number> = {
  easy: 0.55,
  medium: 0.42,
  hard: 0.32,
  expert: 0.26,
  master: 0.22,
  extreme: 0.18,
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
  expert: 'Expert',
  master: 'Master',
  extreme: 'Extreme',
};

export const DIFFICULTY_FILL_PCT: Record<Difficulty, number> = {
  easy: 55,
  medium: 42,
  hard: 32,
  expert: 26,
  master: 22,
  extreme: 18,
};

export function generateSudoku(
  difficulty: Difficulty,
  size: GridSize = 9
): { puzzle: number[][]; solution: number[][] } {
  const solution = generateFullMatrix(size);
  const puzzle = solution.map((row) => [...row]);

  const totalCells = size * size;
  const revealPct = DIFFICULTY_REVEAL_PCT[difficulty];
  const cellsToRemove = Math.floor(totalCells * (1 - revealPct));

  const positions: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      positions.push({ r, c });
    }
  }

  const shuffledPositions = shuffleArray(positions);
  for (let i = 0; i < cellsToRemove; i++) {
    const { r, c } = shuffledPositions[i];
    puzzle[r][c] = 0;
  }

  return { puzzle, solution };
}

// Deterministic daily puzzle from a date seed
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateDailyPuzzle(dateStr: string, size: GridSize = 9, difficulty: Difficulty = 'medium'): {
  puzzle: number[][];
  solution: number[][];
} {
  // Create seed from date string
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed * 31 + dateStr.charCodeAt(i)) % 2147483647;
  }
  // Add grid+difficulty mix so different daily configs differ
  seed = (seed + size * 17 + difficulty.charCodeAt(0) * 7) % 2147483647;

  const rand = seededRandom(seed);

  // Generate using seeded random
  const matrix: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));

  const seededShuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const seededSolve = (m: number[][]): boolean => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (m[row][col] === 0) {
          const nums = seededShuffle(Array.from({ length: size }, (_, i) => i + 1));
          for (const num of nums) {
            if (isValidInMatrix(m, row, col, num, size)) {
              m[row][col] = num;
              if (seededSolve(m)) return true;
              m[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const { boxRows, boxCols } = getBoxDims(size);
  const numDiagBoxes = Math.min(Math.floor(size / boxRows), Math.floor(size / boxCols));
  for (let i = 0; i < numDiagBoxes; i++) {
    const nums = seededShuffle(Array.from({ length: size }, (_, k) => k + 1));
    let idx = 0;
    for (let r = 0; r < boxRows; r++) {
      for (let c = 0; c < boxCols; c++) {
        matrix[i * boxRows + r][i * boxCols + c] = nums[idx++];
      }
    }
  }

  seededSolve(matrix);
  const solution = matrix.map((row) => [...row]);
  const puzzle = matrix.map((row) => [...row]);

  const totalCells = size * size;
  const revealPct = DIFFICULTY_REVEAL_PCT[difficulty];
  const cellsToRemove = Math.floor(totalCells * (1 - revealPct));

  const positions: { r: number; c: number }[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      positions.push({ r, c });
    }
  }

  const shuffled = seededShuffle(positions);
  for (let i = 0; i < cellsToRemove; i++) {
    const { r, c } = shuffled[i];
    puzzle[r][c] = 0;
  }

  return { puzzle, solution };
}

export function initializeBoard(puzzle: number[][], size: GridSize): SudokuCell[] {
  const cells: SudokuCell[] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const val = puzzle[r][c];
      cells.push({
        id: `cell-${r}-${c}`,
        row: r,
        col: c,
        value: val,
        given: val !== 0,
        candidates: [],
        error: false,
      });
    }
  }
  return cells;
}

export function checkBoardConflicts(cells: SudokuCell[], size: GridSize): Set<string> {
  const errorIds = new Set<string>();
  const { boxRows, boxCols } = getBoxDims(size);

  const rows: SudokuCell[][] = Array(size).fill(null).map(() => []);
  const cols: SudokuCell[][] = Array(size).fill(null).map(() => []);
  const boxes: SudokuCell[][] = Array(size).fill(null).map(() => []);

  cells.forEach((cell) => {
    rows[cell.row].push(cell);
    cols[cell.col].push(cell);
    const boxIdx = Math.floor(cell.row / boxRows) * (size / boxCols) + Math.floor(cell.col / boxCols);
    boxes[Math.floor(boxIdx)].push(cell);
  });

  const checkGroup = (group: SudokuCell[]) => {
    const valueMap = new Map<number, SudokuCell[]>();
    group.forEach((cell) => {
      if (cell.value > 0) {
        const valCells = valueMap.get(cell.value) || [];
        valCells.push(cell);
        valueMap.set(cell.value, valCells);
      }
    });
    valueMap.forEach((valCells) => {
      if (valCells.length > 1) {
        valCells.forEach((c) => errorIds.add(c.id));
      }
    });
  };

  rows.forEach(checkGroup);
  cols.forEach(checkGroup);
  boxes.forEach(checkGroup);

  return errorIds;
}

export function isCompletedAndCorrect(cells: SudokuCell[], solution: number[][]): boolean {
  const hasEmptyCell = cells.some((cell) => cell.value === 0);
  if (hasEmptyCell) return false;
  return cells.every((cell) => cell.value === solution[cell.row][cell.col]);
}

export function findHintCell(
  cells: SudokuCell[],
  solution: number[][]
): { index: number; value: number } | null {
  const candidates: { index: number; value: number }[] = [];
  cells.forEach((cell, idx) => {
    if (!cell.given && (cell.value === 0 || cell.value !== solution[cell.row][cell.col])) {
      candidates.push({ index: idx, value: solution[cell.row][cell.col] });
    }
  });
  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function cellsToMatrix(cells: SudokuCell[], size: GridSize): number[][] {
  const matrix: number[][] = Array(size).fill(null).map(() => Array(size).fill(0));
  cells.forEach((cell) => {
    matrix[cell.row][cell.col] = cell.value;
  });
  return matrix;
}

// Display helper: convert a number to symbol (for 16x16 use hex-like A-G)
export function cellDisplay(value: number, size: GridSize): string {
  if (value === 0) return '';
  if (size <= 9) return String(value);
  if (size === 12) return String(value);
  // 16x16: 1-9, A-G
  if (value <= 9) return String(value);
  return String.fromCharCode('A'.charCodeAt(0) + (value - 10));
}

export function getTodayDateStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
