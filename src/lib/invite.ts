/**
 * Invitation links — the shared contract between the iOS app and this site.
 *
 * The whole invitation travels *inside the URL*: there is no database and
 * nothing is stored server-side. The app base64url-encodes a small JSON payload
 * and appends it as a path segment (`/i/<data>/`); this module decodes it again
 * so the page can render the preview card.
 *
 * Keep `Version` and the field names in sync with `InviteLink.swift` in the iOS
 * app — they are the same wire format, written twice.
 */

/** Bumped only on a breaking change; older links must keep decoding. */
export const INVITE_VERSION = 1;

/** Only CloudKit share links may be carried, see `decodeInvite`. */
const SHARE_URL_PREFIX = 'https://www.icloud.com/share/';

export interface InvitePayload {
  /** Wire format version. */
  v: number;
  /** Alarm title, shown as the preview's headline. */
  t: string;
  /** The moment it rings, as an ISO-8601 instant. */
  d: string;
  /** IANA zone the alarm was set in, so the card shows the sender's time. */
  tz?: string;
  /** Sender's app language, picks the card's wording. */
  l?: 'es' | 'en';
  /** Category tint as `#rrggbb`, colors the card. */
  c?: string;
  /** The emoji the sender picked as the alarm's icon, when they picked one. */
  e?: string;
  /** The CloudKit share URL the app needs in order to accept the invite. */
  s: string;
}

/** Decodes base64url (no padding) into a UTF-8 string. */
function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64').toString('utf8');
}

/** Encodes a UTF-8 string as base64url without padding. */
function toBase64Url(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

/** Builds the `/i/<data>/` path segment for a payload. Used by tests/tooling. */
export function encodeInvite(payload: InvitePayload): string {
  return toBase64Url(JSON.stringify(payload));
}

/**
 * Parses a link's data segment, returning `null` for anything malformed.
 *
 * This is the trust boundary: the segment is attacker-controlled, so a failure
 * here must render the "invitación no válida" page rather than throw. The
 * `s` field is checked against iCloud's prefix specifically — without that, a
 * crafted link could use this page to dress an arbitrary URL in Calarm's
 * branding.
 */
export function decodeInvite(data: string | undefined): InvitePayload | null {
  if (!data) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(fromBase64Url(data));
  } catch {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null) return null;

  const p = parsed as Partial<InvitePayload>;
  if (p.v !== INVITE_VERSION) return null;
  if (typeof p.t !== 'string' || p.t.trim() === '') return null;
  if (typeof p.d !== 'string' || Number.isNaN(Date.parse(p.d))) return null;
  if (typeof p.s !== 'string' || !p.s.startsWith(SHARE_URL_PREFIX)) return null;

  return {
    v: p.v,
    // Titles are rendered as text by Astro (escaped) but cap the length so a
    // huge string can't blow up the card or the OG tags.
    t: p.t.slice(0, 120),
    d: p.d,
    tz: isValidTimeZone(p.tz) ? p.tz : undefined,
    l: p.l === 'en' ? 'en' : 'es',
    c: /^#[0-9a-fA-F]{6}$/.test(p.c ?? '') ? p.c : undefined,
    // A couple of code points is all an emoji ever needs; anything longer is
    // someone trying to push text into the card.
    e: typeof p.e === 'string' && p.e.length > 0 && p.e.length <= 8 ? p.e : undefined,
    s: p.s,
  };
}

/** True when `tz` is a zone this runtime actually knows. */
function isValidTimeZone(tz: string | undefined): tz is string {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat('en', { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

/**
 * Everything is formatted in the alarm's own zone — one set for 9:30 in Madrid
 * reads "9:30" to everyone, which is what the sender meant.
 */
function format(payload: InvitePayload, options: Intl.DateTimeFormatOptions): string {
  const locale = payload.l === 'en' ? 'en-US' : 'es-ES';
  const text = new Intl.DateTimeFormat(locale, {
    ...options,
    timeZone: payload.tz ?? 'UTC',
  }).format(new Date(payload.d));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "Martes, 22 de septiembre" — the day, for the card's own layout. */
export function formatDay(payload: InvitePayload): string {
  return format(payload, { weekday: 'long', day: 'numeric', month: 'long' });
}

/** "9:30" — set apart from the day so the card can give it real weight. */
export function formatTime(payload: InvitePayload): string {
  return format(payload, { hour: 'numeric', minute: '2-digit' });
}

/** Day and time on one line, for the link preview's description. */
export function formatWhen(payload: InvitePayload): string {
  return `${formatDay(payload)}, ${formatTime(payload)}`;
}
