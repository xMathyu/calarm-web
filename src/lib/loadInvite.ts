/**
 * Turns a link's data segment into the invitation to draw, whichever shape it
 * has (see `invite.ts`): a share token is looked up in CloudKit, JSON is
 * decoded on the spot. Shared by the two invitation pages and the card.
 */
import { lookupShare } from './cloudkit';
import { decodeInvite, decodePhoto, isShareToken, PHOTO_PARAM, type InvitePayload } from './invite';

export interface LoadedInvite {
  /** The invitation, or null for a bad or gone link, or while unavailable. */
  invite: InvitePayload | null;
  /** CloudKit didn't answer: the link may be fine, try again later. */
  unavailable: boolean;
  /** The alarm's photo, already checked (and shrunk, from CloudKit). */
  photo?: Buffer;
  /**
   * Query string for the card's URL, which is also its cache key: the record's
   * change tag for a token link (a new card after every edit), the photo for a
   * JSON link.
   */
  cardQuery: string;
  /**
   * `Cache-Control` for the page. A token link's page changes when the owner
   * edits the alarm, so the CDN keeps it only a minute; an unavailable one
   * isn't kept at all. JSON links are a pure function of the URL.
   */
  cacheControl?: string;
}

export async function loadInvite(data: string | undefined, url: URL): Promise<LoadedInvite> {
  if (isShareToken(data)) {
    const lookup = await lookupShare(data);
    switch (lookup.status) {
      case 'found':
        return {
          invite: lookup.invite,
          unavailable: false,
          photo: lookup.photo,
          cardQuery: `?v=${encodeURIComponent(lookup.tag)}`,
          cacheControl: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
        };
      case 'gone':
        return { invite: null, unavailable: false, cardQuery: '', cacheControl: 'public, max-age=0, s-maxage=60' };
      case 'unavailable':
        return { invite: null, unavailable: true, cardQuery: '', cacheControl: 'no-store' };
    }
  }

  const invite = decodeInvite(data);
  const photo = invite ? decodePhoto(url.searchParams.get(PHOTO_PARAM)) : undefined;
  return {
    invite,
    unavailable: false,
    photo,
    cardQuery: photo ? `?${PHOTO_PARAM}=${photo.toString('base64url')}` : '',
  };
}
