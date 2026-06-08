/**
 * Google Play Store app configuration.
 * To disable the button entirely, set PLAY_STORE_URL to ''.
 */

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.medosapp.sudokumaster';
export const APP_PACKAGE_NAME = 'com.medosapp.sudokumaster';

export const playStoreEnabled = (): boolean => PLAY_STORE_URL.length > 0;

// Track click in GA4
export function trackPlayStoreClick(source: string) {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.gtag) {
    // @ts-ignore
    window.gtag('event', 'play_store_click', { source });
  }
}
