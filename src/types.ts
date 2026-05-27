export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert' | 'master' | 'extreme';

export type GridSize = 4 | 6 | 9 | 12 | 16;

export type ThemeType = 'classic' | 'cosmic' | 'retro' | 'sand' | 'sakura' | 'ocean' | 'forest';

export interface SudokuCell {
  id: string;
  row: number;
  col: number;
  value: number;
  given: boolean;
  candidates: number[];
  error?: boolean;
  hinted?: boolean;
}

export interface LevelStats {
  gamesPlayed: number;
  gamesWon: number;
  bestTime: number | null;
}

export interface GameStats {
  easy: LevelStats;
  medium: LevelStats;
  hard: LevelStats;
  expert: LevelStats;
  master: LevelStats;
  extreme: LevelStats;
}

export interface HistoryItem {
  cells: SudokuCell[];
  description: string;
}

export interface DailyStreak {
  current: number;
  longest: number;
  lastPlayed: string | null;
  completedDates: string[];
}

export interface AudioSettings {
  sfxEnabled: boolean;
  sfxVolume: number;
}
