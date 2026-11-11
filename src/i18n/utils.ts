import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';

/** Returns a translator bound to a locale, falling back to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}

/** Every locale, in menu order. */
export const allLangs = Object.keys(languages) as Lang[];

/**
 * Builds an in-site URL for the given locale (Spanish at root, the rest under
 * /<lang>). Always returns a trailing-slash form to match the directory build
 * output and sitemap.
 */
export function localizedPath(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  const joined = `${prefix}/${clean}`.replace(/\/{2,}/g, '/');
  return joined.endsWith('/') ? joined : `${joined}/`;
}

/** Locale-less path segment for each page, keyed by locale. */
export const routes = {
  home: { es: '', en: '', pt: '', de: '' },
  privacy: { es: 'privacidad', en: 'privacy', pt: 'privacidade', de: 'datenschutz' },
  help: { es: 'ayuda', en: 'help', pt: 'ajuda', de: 'hilfe' },
} as const satisfies Record<string, Record<Lang, string>>;

export type Page = keyof typeof routes;

/** Full in-site href for a known page in a locale. */
export function pageHref(page: Page, lang: Lang): string {
  return localizedPath(lang, routes[page][lang]);
}

/** The same page in every locale, for the language menu and hreflang. */
export function pageHrefs(page: Page): Record<Lang, string> {
  return Object.fromEntries(allLangs.map((l) => [l, pageHref(page, l)])) as Record<Lang, string>;
}
