import { Difficulty, SudokuCell } from '../types';

// Check if a number can be placed in a standard number[][] grid
export function isValidInMatrix(matrix: number[][], row: number, col: number, num: number): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (matrix[row][c] === num && c !== col) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (matrix[r][col] === num && r !== row) return false;
  }

  // Check 3x3 box
  const boxRowStart = Math.floor(row / 3) * 3;
  const boxColStart = Math.floor(col / 3) * 3;

  for (let r = boxRowStart; r < boxRowStart + 3; r++) {
    for (let c = boxColStart; c < boxColStart + 3; c++) {
      if (matrix[r][c] === num && (r !== row || c !== col)) return false;
    }
  }

  return true;
}

// Backtracking solver for matrices
export function solveMatrix(matrix: number[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (matrix[row][col] === 0) {
        // Try digits 1-9
        for (let num = 1; num <= 9; num++) {
          if (isValidInMatrix(matrix, row, col, num)) {
            matrix[row][col] = num;
            if (solveMatrix(matrix)) {
              return true;
            }
            matrix[row][col] = 0; // backtrack
          }
        }
        return false; // trigger backtracking
      }
    }
  }
  return true; // solved
}

// Shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Fill a 3x3 box on the diagonal starting at (row, col)
function fillBox(matrix: number[][], row: number, col: number) {
  const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let idx = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      matrix[row + r][col + c] = nums[idx++];
    }
  }
}

// Generate a complete, solved valid Sudoku matrix
export function generateFullMatrix(): number[][] {
  const matrix: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  // Fill diagonal boxes because they are independent
  fillBox(matrix, 0, 0);
  fillBox(matrix, 3, 3);
  fillBox(matrix, 6, 6);

  // Solve the rest
  solveMatrix(matrix);

  return matrix;
}

// Generate initial puzzle according to difficulty level
export function generateSudoku(difficulty: Difficulty): {
  puzzle: number[][];
  solution: number[][];
} {
  const solution = generateFullMatrix();
  
  // Clone solution
  const puzzle = solution.map((row) => [...row]);

  // Determine how many cells to remove
  // Easy: ~43 revealed elements (remove 38)
  // Medium: ~35 revealed elements (remove 46)
  // Hard: ~27 revealed elements (remove 54)
  // Expert: ~19 revealed elements (remove 62)
  let cellsToRemove = 38;
  if (difficulty === 'medium') cellsToRemove = 46;
  else if (difficulty === 'hard') cellsToRemove = 54;
  else if (difficulty === 'expert') cellsToRemove = 62;

  // Create list of all 81 coordinates
  const positions: { r: number; c: number }[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push({ r, c });
    }
  }

  // Shuffle coordinates
  const shuffledPositions = shuffleArray(positions);

  // Erase numbers one by one
  for (let i = 0; i < cellsToRemove; i++) {
    const { r, c } = shuffledPositions[i];
    puzzle[r][c] = 0;
  }

  return { puzzle, solution };
}

// Convert number[][] matrix to SudokuCell[] format
export function initializeBoard(puzzle: number[][]): SudokuCell[] {
  const cells: SudokuCell[] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
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

// Validate the current grid and find conflicting error cells
export function checkBoardConflicts(cells: SudokuCell[]): Set<string> {
  const errorIds = new Set<string>();

  // Helper arrays of cells grouped by constraints
  const rows: SudokuCell[][] = Array(9).fill(null).map(() => []);
  const cols: SudokuCell[][] = Array(9).fill(null).map(() => []);
  const boxes: SudokuCell[][] = Array(9).fill(null).map(() => []);

  cells.forEach((cell) => {
    rows[cell.row].push(cell);
    cols[cell.col].push(cell);
    
    const boxIdx = Math.floor(cell.row / 3) * 3 + Math.floor(cell.col / 3);
    boxes[boxIdx].push(cell);
  });

  // Verify elements in each structural group
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

// Checks if the puzzle is complete and error-free
export function isCompletedAndCorrect(cells: SudokuCell[], solution: number[][]): boolean {
  // Must have no zero-valued elements
  const hasEmptyCell = cells.some((cell) => cell.value === 0);
  if (hasEmptyCell) return false;

  // Compare every cell's value directly with the solution matrix
  return cells.every((cell) => cell.value === solution[cell.row][cell.col]);
}

// Returns a single hint for an empty or incorrect cell
export function findHintCell(cells: SudokuCell[], solution: number[][]): { index: number; value: number } | null {
  // Look for either empty cells or cells that have incorrect (but user-entered) values
  const candidates: { index: number; value: number }[] = [];

  cells.forEach((cell, idx) => {
    if (!cell.given && (cell.value === 0 || cell.value !== solution[cell.row][cell.col])) {
      candidates.push({
        index: idx,
        value: solution[cell.row][cell.col],
      });
    }
  });

  if (candidates.length === 0) return null;

  // Pick a random incorrect or empty cell to reveal
  const randomPick = candidates[Math.floor(Math.random() * candidates.length)];
  return randomPick;
}

// Convert flat SudokuCell[] to a standard 9x9 matrix (filled cells only, 0 for empty)
export function cellsToMatrix(cells: SudokuCell[]): number[][] {
  const matrix: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));
  
  cells.forEach((cell) => {
    matrix[cell.row][cell.col] = cell.value;
  });

  return matrix;
}
