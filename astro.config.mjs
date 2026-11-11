// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Canonical production URL — drives canonical tags, sitemap and absolute OG URLs.
// calarm-puce.vercel.app y calarmi.vercel.app siguen sirviendo el mismo sitio: los
// enlaces de invitación ya enviados viven ahí (ver INVITE_ORIGIN en InvitePage.astro).
const SITE = 'https://calarmi.mathyusolutions.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'pt', 'de'],
    routing: {
      // Spanish lives at the root (/), the rest under /en, /pt and /de.
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-US', pt: 'pt-BR', de: 'de-DE' },
      },
    }),
  ],
  // The whole site stays prerendered; only the invitation routes opt out with
  // `export const prerender = false`, since every invite renders its own card.
  adapter: vercel(),
  build: {
    inlineStylesheets: 'auto',
  },
});
