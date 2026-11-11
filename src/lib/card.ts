/**
 * The image half of an invitation's link preview (`og:image`), as a pure
 * function of the decoded link.
 *
 * Deliberately text-free: rendering the alarm's name into the PNG would mean
 * shipping font files into the serverless function, and link previews already
 * show the name and time as text from `og:title` / `og:description`. So this
 * draws the tinted tile the app uses for the alarm's avatar — with the alarm's
 * own icon in it, the way the sender sees it: their photo filling the tile,
 * the emoji they picked (drawn from Twemoji's SVGs, fetched at render time,
 * since the function has no emoji font either), or the look-alike of their SF
 * Symbol (`icons.ts`). The alarm clock stays as the fallback for anything
 * else, offline included.
 */
import sharp from 'sharp';
import type { InvitePayload } from './invite';
import { ALARM_CLOCK_GLYPH, HOURGLASS_GLYPH, glyphFor, twemojiURL } from './icons';

export const CARD_WIDTH = 1200;
export const CARD_HEIGHT = 630;
export const DEFAULT_TINT = '#f16826';

const TILE = 260;
/** The icon's box inside the tile: outlines breathe a little, emoji fill more. */
const GLYPH_BOX = 170;
const EMOJI_BOX = 180;
const CX = CARD_WIDTH / 2;
const CY = CARD_HEIGHT / 2;

/** Pixels sharp may decode from a link's photo: the app sends 64×64. */
const MAX_PHOTO_PIXELS = 512 * 512;

/** The finished PNG. A malformed link still gets a card: the generic tile. */
export async function renderCard(invite: InvitePayload | null, photo?: Buffer): Promise<Buffer> {
  const tint = invite?.c ?? DEFAULT_TINT;
  if (invite && photo) {
    const card = await photoCard(tint, photo);
    if (card) return card;
  }
  const fallback = invite?.k === 'c' ? HOURGLASS_GLYPH : ALARM_CLOCK_GLYPH;
  const art = (invite?.e ? await emojiArt(invite.e) : undefined) ?? glyphArt(glyphFor(invite?.y) ?? fallback);
  return sharp(Buffer.from(cardSVG(tint, art))).png().toBuffer();
}

/**
 * The card with the alarm's photo as the tile, rounded like the tile. It's
 * composited by sharp instead of embedded in the SVG, so librsvg never sees
 * untrusted image data; a JPEG sharp can't read (or one claiming a huge size)
 * yields `undefined`, and the caller draws the symbol card instead.
 */
async function photoCard(tint: string, photo: Buffer): Promise<Buffer | undefined> {
  try {
    const mask = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE}" height="${TILE}"><rect width="${TILE}" height="${TILE}" rx="58" fill="#fff"/></svg>`,
    );
    const tile = await sharp(photo, { limitInputPixels: MAX_PHOTO_PIXELS })
      .resize(TILE, TILE, { fit: 'cover' })
      .ensureAlpha()
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toBuffer();
    return await sharp(Buffer.from(cardSVG(tint, '')))
      .composite([{ input: tile, left: CX - TILE / 2, top: CY - TILE / 2 }])
      .png()
      .toBuffer();
  } catch {
    return undefined;
  }
}

/** The whole card as SVG. No `<text>` anywhere — librsvg would need system fonts. */
export function cardSVG(tint: string, art: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
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

  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="#060709"/>
  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" fill="url(#glow)"/>

  <!-- The same rounded, gradient-filled tile the app renders as the alarm's avatar. -->
  <rect x="${CX - TILE / 2}" y="${CY - TILE / 2}" width="${TILE}" height="${TILE}" rx="58" fill="url(#tile)"/>

  ${art}
</svg>`;
}

/** A 24-unit outline glyph scaled into the tile; the stroke scales with it. */
export function glyphArt(body: string): string {
  const scale = GLYPH_BOX / 24;
  return `<g transform="translate(${CX - GLYPH_BOX / 2} ${CY - GLYPH_BOX / 2}) scale(${scale})" fill="none" stroke="#ffffff" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
}

/**
 * Twemoji's drawing of the emoji, nested into the card as an inner `<svg>`.
 * Any hiccup (no network, an emoji Twemoji doesn't have, an odd file) yields
 * `undefined` and the caller falls back to a glyph — never a broken card.
 */
async function emojiArt(emoji: string): Promise<string | undefined> {
  try {
    const response = await fetch(twemojiURL(emoji), { signal: AbortSignal.timeout(2500) });
    if (!response.ok) return undefined;
    const svg = await response.text();
    // Bounded and shaped like an SVG document, or we don't touch it.
    if (svg.length > 200_000) return undefined;
    const start = svg.indexOf('<svg');
    if (start < 0 || !svg.trimEnd().endsWith('</svg>')) return undefined;
    const document = svg.slice(start);
    const viewBox = /viewBox="([^"]+)"/.exec(document)?.[1] ?? '0 0 36 36';
    return document.replace(
      /^<svg\b[^>]*>/,
      `<svg x="${CX - EMOJI_BOX / 2}" y="${CY - EMOJI_BOX / 2}" width="${EMOJI_BOX}" height="${EMOJI_BOX}" viewBox="${viewBox}">`,
    );
  } catch {
    return undefined;
  }
}
