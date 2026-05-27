import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SITE_URL = 'https://sudokumaster.vip';
const DEFAULT_OG = `${SITE_URL}/og-image.png`;

export function useSEO({ title, description, canonicalPath, ogImage, noIndex, jsonLd }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      const created = !el;
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
      return { el, created };
    };

    const cleanups: (() => void)[] = [];

    const desc = setMeta('meta[name="description"]', { name: 'description', content: description });
    if (desc.created) cleanups.push(() => desc.el.remove());

    const robots = setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
    if (robots.created) cleanups.push(() => robots.el.remove());

    const canonical = canonicalPath ? `${SITE_URL}${canonicalPath}` : SITE_URL + window.location.pathname;
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonical);

    const ogUrl = setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    const ogTitle = setMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    const ogDesc = setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    const ogImg = setMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage || DEFAULT_OG });
    if (ogUrl.created) cleanups.push(() => ogUrl.el.remove());
    if (ogTitle.created) cleanups.push(() => ogTitle.el.remove());
    if (ogDesc.created) cleanups.push(() => ogDesc.el.remove());
    if (ogImg.created) cleanups.push(() => ogImg.el.remove());

    const twTitle = setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    const twDesc = setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    const twImg = setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage || DEFAULT_OG });
    if (twTitle.created) cleanups.push(() => twTitle.el.remove());
    if (twDesc.created) cleanups.push(() => twDesc.el.remove());
    if (twImg.created) cleanups.push(() => twImg.el.remove());

    let scriptEls: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((item) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', 'page');
        script.textContent = JSON.stringify(item);
        document.head.appendChild(script);
        scriptEls.push(script);
      });
    }

    return () => {
      document.title = prevTitle;
      scriptEls.forEach((s) => s.remove());
      cleanups.forEach((fn) => fn());
    };
  }, [title, description, canonicalPath, ogImage, noIndex, JSON.stringify(jsonLd)]);
}
