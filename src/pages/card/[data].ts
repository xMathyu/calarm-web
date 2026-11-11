/**
 * The image half of an invitation's link preview (`og:image`); the drawing
 * itself lives in `lib/card.ts`.
 *
 * Served extension-less on purpose: the site uses `trailingSlash: 'always'`,
 * which would turn `/card/x.png` into `/card/x.png/` and collide with Vercel's
 * own redirect back to the extension-less form. Crawlers read the Content-Type.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { decodeInvite, decodePhoto, PHOTO_PARAM } from '../../lib/invite';
import { renderCard } from '../../lib/card';

export const GET: APIRoute = async ({ params, url }) => {
  // An unreadable segment still returns a valid image: a broken preview looks
  // worse to the recipient than a generic one.
  const invite = decodeInvite(params.data);
  const photo = invite ? decodePhoto(url.searchParams.get(PHOTO_PARAM)) : undefined;
  const png = await renderCard(invite, photo);

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      // The URL (payload + photo) is the cache key, and the output is a pure
      // function of it.
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
