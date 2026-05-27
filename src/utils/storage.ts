// Safe localStorage wrapper with JSON serialization.

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export const STORAGE_KEYS = {
  STATS: 'sudoku_master_stats',
  THEME: 'sudoku_master_theme',
  STREAK: 'sudoku_master_streak',
  AUDIO: 'sudoku_master_audio',
  SETTINGS: 'sudoku_master_settings',
  BEST_TIMES: 'sudoku_master_best_times',
  CURRENT_GAME: 'sudoku_master_current_game',
  DAILY_PROGRESS: 'sudoku_master_daily_progress',
  COOKIE_CONSENT: 'sudoku_master_cookie_consent',
} as const;
