// Google Analytics 4 wrapper — Measurement ID G-D7VDTZY17X (configured in index.html).

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    adsbygoogle?: any[];
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    /* ignore */
  }
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
  } catch {
    /* ignore */
  }
}

export function trackGameStart(difficulty: string, gridSize: number): void {
  trackEvent('sudoku_game_start', { difficulty, grid_size: gridSize });
}

export function trackGameWin(difficulty: string, gridSize: number, durationSec: number): void {
  trackEvent('sudoku_game_win', {
    difficulty,
    grid_size: gridSize,
    duration_sec: durationSec,
  });
}

export function trackGameAction(action: string, extra: Record<string, any> = {}): void {
  trackEvent(`sudoku_${action}`, extra);
}
