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
import { isShareToken } from '../../lib/invite';
import { loadInvite } from '../../lib/loadInvite';
import { renderCard } from '../../lib/card';

export const GET: APIRoute = async ({ params, url }) => {
  // An unreadable segment still returns a valid image: a broken preview looks
  // worse to the recipient than a generic one.
  const loaded = await loadInvite(params.data, url);
  const png = await renderCard(loaded.invite, loaded.photo);

  // The URL is the cache key. A JSON link's card is a pure function of it, and
  // so is a token link's once the page adds the record's change tag (`?v=`).
  // Without the tag it may change; while CloudKit is down it's a placeholder.
  const fixed = !isShareToken(params.data) || (loaded.invite && url.searchParams.has('v'));
  const cacheControl = loaded.unavailable
    ? 'no-store'
    : fixed
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=0, s-maxage=60';

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': cacheControl },
  });
};
