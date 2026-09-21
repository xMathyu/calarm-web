// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Canonical production URL — drives canonical tags, sitemap and absolute OG URLs.
const SITE = 'https://calarm-puce.vercel.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      // Spanish lives at the root (/) and English under /en — no prefix for the default.
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-US' },
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
