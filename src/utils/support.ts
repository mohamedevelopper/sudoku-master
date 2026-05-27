/**
 * Support / "Buy me a coffee" configuration.
 *
 * Currently using Ko-fi. To switch platforms, just change SUPPORT_URL:
 *   - Ko-fi:           https://ko-fi.com/YOUR_USERNAME
 *   - Buy Me a Coffee: https://www.buymeacoffee.com/YOUR_USERNAME
 *   - PayPal.me:       https://www.paypal.me/YOUR_USERNAME
 *   - Patreon:         https://www.patreon.com/YOUR_USERNAME
 *
 * To disable the button entirely, set SUPPORT_URL to '' (empty string).
 */

export const SUPPORT_URL = 'https://ko-fi.com/malik16443';
export const SUPPORT_LABEL = 'Buy me a coffee';
export const SUPPORT_EMOJI = '☕';

export const supportEnabled = (): boolean => SUPPORT_URL.length > 0;
