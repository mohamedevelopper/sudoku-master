export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface SudokuCell {
  id: string; // "cell-row-col"
  row: number; // 0 to 8
  col: number; // 0 to 8
  value: number; // 0 to 9 (0 is empty)
  given: boolean; // Is it part of the initial puzzle?
  candidates: number[]; // Pencil marks (1 to 9)
  error?: boolean; // Does it conflict with other cells?
}

export interface DifficultyConfig {
  label: string;
  cellsRevealed: number; // Number of cells initially visible
  color: string;
}

export interface LevelStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number | null; // in seconds
}

export interface GameStats {
  easy: LevelStats;
  medium: LevelStats;
  hard: LevelStats;
  expert: LevelStats;
}

export interface HistoryItem {
  cells: SudokuCell[];
  description: string;
}
