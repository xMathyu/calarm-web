# Calarm — Landing (Astro)

Sitio de marketing de **Calarm** migrado a [Astro](https://astro.build) para máximo SEO y rendimiento. Genera HTML 100 % estático, sin JavaScript de framework en el cliente.

## Comandos

Este proyecto usa **pnpm**.

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo (http://localhost:4321)
pnpm build        # build de producción → ./dist
pnpm preview      # servir el build localmente
```

> La config de pnpm vive en `pnpm-workspace.yaml` (pnpm 11 ya no la lee de `.npmrc` ni de `package.json`). Ahí se autorizan los scripts de build de `sharp`/`esbuild` (`allowBuilds`), necesarios para la optimización de imágenes.

## Estructura

```
src/
  pages/
    index.astro          → /              (landing, español — idioma por defecto)
    privacidad.astro     → /privacidad/   (política, español)
    en/index.astro       → /en/           (landing, inglés)
    en/privacy.astro     → /en/privacy/   (política, inglés)
    404.astro            → página de error
  layouts/Layout.astro   → <head> con todo el SEO (meta, OG, canonical, hreflang, JSON-LD)
  components/
    Landing.astro        → contenido de la landing (recibe `lang`)
    Privacy.astro        → contenido de la política (recibe `lang`)
    Nav.astro / Footer.astro / IPhone.astro / LangToggle.astro
  i18n/
    ui.ts                → TODOS los textos en ES y EN
    utils.ts             → traductor `t()` y helpers de rutas localizadas
  styles/global.css      → sistema de diseño compartido
  assets/images/         → imágenes optimizadas en build (WebP/AVIF)
public/                  → archivos servidos tal cual (favicon, og-image, robots.txt,
                           pitch-deck.html y sus assets crudos)
```

## i18n

El **español vive en la raíz** (`/`) y el **inglés bajo `/en/`** — cada idioma es una página real e indexable (antes el inglés solo existía en JavaScript). Para editar textos, toca un único archivo: [`src/i18n/ui.ts`](src/i18n/ui.ts). Para añadir una página, crea la ruta en ES y su equivalente bajo `en/`, y registra el slug en `routes` de [`src/i18n/utils.ts`](src/i18n/utils.ts).

## SEO incluido

- Rutas reales por idioma con `hreflang` (es / en / x-default) y `canonical` consistentes.
- `sitemap-index.xml` automático (`@astrojs/sitemap`) + `robots.txt`.
- Open Graph y Twitter Cards por página.
- JSON-LD: `MobileApplication` en la landing y `BreadcrumbList` en la política.
- Imágenes optimizadas automáticamente (las capturas pasaron de ~370 kB PNG a ~25 kB WebP).
- Fallback sin JavaScript para el contenido animado.

## Notas

- El **dominio canónico** está en `astro.config.mjs` (`site`). Cámbialo si cambia el dominio.
- La **imagen Open Graph** (`public/og-image.png`) se generó desde `screenshots/01-deck.png`. Para una OG ideal usa 1200×630 px.
- El **pitch deck** se conserva como archivo estático en `/pitch-deck.html` (excluido del sitemap y del indexado en `robots.txt`).
- Los archivos HTML originales se conservan en [`legacy/`](legacy/) como referencia.
