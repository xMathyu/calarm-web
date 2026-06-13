import { ui, defaultLang, type Lang } from './ui';

/** Returns a translator bound to a locale, falling back to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
  };
}

/**
 * Builds an in-site URL for the given locale (Spanish at root, English under /en).
 * Always returns a trailing-slash form to match the directory build output and sitemap.
 */
export function localizedPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const joined = `${prefix}/${clean}`.replace(/\/{2,}/g, '/');
  return joined.endsWith('/') ? joined : `${joined}/`;
}

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

/** Locale-less path segment for each page, keyed by locale. */
export const routes = {
  home: { es: '', en: '' },
  privacy: { es: 'privacidad', en: 'privacy' },
} as const;

/** Full in-site href for a known page in a locale. */
export function pageHref(page: keyof typeof routes, lang: Lang): string {
  return localizedPath(lang, routes[page][lang]);
}
