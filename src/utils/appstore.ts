/**
 * Apple App Store app configuration.
 * To disable the button entirely, set APP_STORE_URL to ''.
 */

export const APP_STORE_ID = '6787259916';
export const APP_STORE_URL = `https://apps.apple.com/app/id${APP_STORE_ID}`;
export const APP_BUNDLE_ID = 'com.medosapp.sudokumaster';

export const appStoreEnabled = (): boolean => APP_STORE_URL.length > 0;

// Track click in GA4
export function trackAppStoreClick(source: string) {
  // @ts-ignore
  if (typeof window !== 'undefined' && window.gtag) {
    // @ts-ignore
    window.gtag('event', 'app_store_click', { source });
  }
}
