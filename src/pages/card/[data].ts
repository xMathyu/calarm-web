/**
 * The image half of an invitation's link preview (`og:image`).
 *
 * Deliberately text-free: rendering the alarm's name into the PNG would mean
 * shipping font files into the serverless function, and link previews already
 * show the name and time as text from `og:title` / `og:description`. So this
 * draws the same tinted tile the app uses for a shared alarm's avatar, which
 * makes the card recognisably Calarm's at a glance.
 *
 * Served extension-less on purpose: the site uses `trailingSlash: 'always'`,
 * which would turn `/card/x.png` into `/card/x.png/` and collide with Vercel's
 * own redirect back to the extension-less form. Crawlers read the Content-Type.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { decodeInvite } from '../../lib/invite';

const WIDTH = 1200;
const HEIGHT = 630;
const DEFAULT_TINT = '#f16826';

/**
 * The card as SVG. No `<text>` anywhere — librsvg would need system fonts for
 * it, which is exactly the fragility this endpoint avoids.
 */
function cardSVG(tint: string): string {
  const cx = WIDTH / 2;
  const cy = HEIGHT / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="8%" r="75%">
      <stop offset="0%" stop-color="${tint}" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="${tint}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${tint}"/>
      <stop offset="100%" stop-color="${tint}" stop-opacity="0.72"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#060709"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- The same rounded, gradient-filled tile the app renders as a share avatar. -->
  <rect x="${cx - 130}" y="${cy - 130}" width="260" height="260" rx="58" fill="url(#tile)"/>

  <!-- Alarm clock, built from primitives so no glyph or font is involved. -->
  <g stroke="#ffffff" stroke-width="13" stroke-linecap="round" fill="none">
    <circle cx="${cx - 47}" cy="${cy - 62}" r="20"/>
    <circle cx="${cx + 47}" cy="${cy - 62}" r="20"/>
    <circle cx="${cx}" cy="${cy + 6}" r="72"/>
    <path d="M${cx} ${cy + 6} L${cx} ${cy - 40}"/>
    <path d="M${cx} ${cy + 6} L${cx + 36} ${cy + 6}"/>
    <path d="M${cx - 52} ${cy + 74} L${cx - 68} ${cy + 96}"/>
    <path d="M${cx + 52} ${cy + 74} L${cx + 68} ${cy + 96}"/>
  </g>
</svg>`;
}

export const GET: APIRoute = async ({ params }) => {
  // An unreadable segment still returns a valid image: a broken preview looks
  // worse to the recipient than a generic one.
  const invite = decodeInvite(params.data);
  const tint = invite?.c ?? DEFAULT_TINT;

  const png = await sharp(Buffer.from(cardSVG(tint))).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      // The payload is the cache key and the output is a pure function of it.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
