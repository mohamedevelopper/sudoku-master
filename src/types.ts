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

export type ThemeType = 'classic' | 'cosmic' | 'retro' | 'sand' | 'sakura';

export interface ThemeColors {
  name: string;
  type: ThemeType;
  bodyBg: string;
  headerBg: string;
  headerBorder: string;
  textPrimary: string;
  textSecondary: string;
  cardBg: string;
  cardBorder: string;
  btnPrimary: string;
  btnSecondary: string;
  btnAccentBg: string;
  activeText: string;
  boardBg: string;
  boardGridColor: string;
  boardSubgridBorder: string;
  cellBg: string;
  cellGiven: string;
  cellUser: string;
  cellSelected: string;
  cellRelated: string;
  cellSameValue: string;
  cellError: string;
  keypadBtn: string;
}

