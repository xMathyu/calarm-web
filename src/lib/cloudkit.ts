/**
 * Reads an invitation from CloudKit, for the links that carry only the share
 * token (`/c/07628shg9cGxsh2Moi-46rp9A/`, app 1.0.18+).
 *
 * The alarm or countdown is the share's root record, readable by anyone with
 * the link (`publicPermission` READ_ONLY), so CloudKit Web Services' `resolve`
 * hands it over with only the container's API token — no Apple Account. The
 * record's `payload` field is the app's own JSON (`SharePayload`,
 * `SharedCountdownPayload`), plus the `invitePreview` the app adds for this
 * page: the sender's zone and language, and the icon and color resolved the way
 * the app draws them. Field names here are a contract with those structs.
 *
 * Nothing is stored on this site; the page always shows what the share holds
 * now, so an edited title or date shows up on links already sent, and a share
 * the owner stopped shows as no longer valid.
 */
import sharp from 'sharp';
import {
  cleanInvite,
  isoInstant,
  isValidTimeZone,
  shareURLForToken,
  SHARE_LINK_VERSION,
  type InvitePayload,
} from './invite';

const CONTAINER = 'iCloud.MathyuSolutions.Calarm';
const RESOLVE_URL = `https://api.apple-cloudkit.com/database/1/${CONTAINER}/production/public/records/resolve`;

/** Link-preview crawlers give up after a few seconds; better a generic page. */
const TIMEOUT_MS = 3500;

/** How long a lookup is reused inside one function instance. */
const CACHE_MS = 60_000;
const CACHE_ENTRIES = 500;

/** Seconds from 1970 to 2001: the app's `JSONEncoder` writes dates from 2001. */
const FOUNDATION_EPOCH = 978_307_200;

/** The photo is shrunk to this square before anything else draws it. */
const PHOTO_SIZE = 256;
/** Pixels sharp may decode from a record's photo: the app sends up to 1080². */
const MAX_PHOTO_PIXELS = 4096 * 4096;

export type ShareLookup =
  /** `tag` changes whenever the record does: it versions the card's URL. */
  | { status: 'found'; invite: InvitePayload; photo?: Buffer; tag: string }
  /** No such share, or it's no longer shared: the invitation is gone. */
  | { status: 'gone' }
  /** CloudKit didn't answer in time or refused us: try again later. */
  | { status: 'unavailable' };

const cache = new Map<string, { at: number; result: ShareLookup }>();

/** The invitation behind a share token. Never throws. */
export async function lookupShare(token: string): Promise<ShareLookup> {
  const hit = cache.get(token);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.result;

  const result = await resolve(token);
  // A failure is not remembered: the next request tries again.
  if (result.status !== 'unavailable') {
    cache.delete(token);
    cache.set(token, { at: Date.now(), result });
    if (cache.size > CACHE_ENTRIES) cache.delete(cache.keys().next().value!);
  }
  return result;
}

async function resolve(token: string): Promise<ShareLookup> {
  const apiToken = import.meta.env.CLOUDKIT_API_TOKEN ?? process.env.CLOUDKIT_API_TOKEN;
  if (!apiToken) {
    console.error('[cloudkit] CLOUDKIT_API_TOKEN is not set');
    return { status: 'unavailable' };
  }

  let body: any;
  try {
    const response = await fetch(`${RESOLVE_URL}?ckAPIToken=${encodeURIComponent(apiToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shortGUIDs: [{ value: token, shouldFetchRootRecord: true }] }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    body = await response.json();
    if (!response.ok) {
      console.error(`[cloudkit] resolve answered ${response.status}: ${body?.serverErrorCode}`);
      return { status: 'unavailable' };
    }
  } catch (error) {
    console.error('[cloudkit] resolve failed:', error);
    return { status: 'unavailable' };
  }

  const result = body?.results?.[0];
  if (!result) return { status: 'unavailable' };
  if (result.serverErrorCode) {
    // NOT_FOUND / ACCESS_DENIED: the share is gone or no longer public.
    // Anything else (throttling, an outage) is worth another try.
    const gone = ['NOT_FOUND', 'ACCESS_DENIED', 'ZONE_NOT_FOUND', 'BAD_REQUEST'].includes(result.serverErrorCode);
    if (!gone) console.error(`[cloudkit] resolve result: ${result.serverErrorCode}`);
    return gone ? { status: 'gone' } : { status: 'unavailable' };
  }

  const root = result.rootRecord;
  if (!root || root.deleted || result.share?.deleted) return { status: 'gone' };
  const isCountdown = root.recordType === 'CalarmSharedCountdown';
  if (!isCountdown && root.recordType !== 'CalarmSharedReminder') return { status: 'gone' };

  let payload: any;
  try {
    payload = JSON.parse(Buffer.from(String(root.fields?.payload?.value ?? ''), 'base64').toString('utf8'));
  } catch {
    return { status: 'gone' };
  }
  if (typeof payload !== 'object' || payload === null || payload.isDeleted === true) return { status: 'gone' };

  const invite = isCountdown ? countdownInvite(payload, token) : alarmInvite(payload, token);
  if (!invite) return { status: 'gone' };

  const photoField = isCountdown ? payload.photo : payload.photoThumbnail;
  const photo = payload.iconKindRaw === ICON_PHOTO ? await shrinkPhoto(photoField) : undefined;
  return { status: 'found', invite, photo, tag: String(root.recordChangeTag ?? '') };
}

// `ReminderIconKind` raw values.
const ICON_SYMBOL = 0;
const ICON_PHOTO = 1;
const ICON_EMOJI = 2;

/** `InvitePreview` as the app writes it. Absent in payloads older than 1.0.18. */
interface Preview {
  timeZone?: string;
  language?: string;
  tintHex?: string;
  emoji?: string;
  symbol?: string;
}

function previewOf(payload: any): Preview {
  const preview = payload.invitePreview;
  return typeof preview === 'object' && preview !== null ? preview : {};
}

function zoneOf(preview: Preview): string | undefined {
  return isValidTimeZone(preview.timeZone) ? preview.timeZone : undefined;
}

function language(preview: Preview): InvitePayload['l'] {
  return preview.language === 'en' || preview.language === 'pt' ? preview.language : 'es';
}

/** A `Date` from the app's JSON, as milliseconds since 1970. */
function foundationDate(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? (value + FOUNDATION_EPOCH) * 1000 : undefined;
}

/** `SharePayload`: an alarm. */
function alarmInvite(payload: any, token: string): InvitePayload | null {
  const date = foundationDate(payload.date);
  if (date === undefined) return null;
  const preview = previewOf(payload);
  const ownIcon = typeof payload.symbolName === 'string' && payload.symbolName !== '' ? payload.symbolName : undefined;
  return cleanInvite({
    v: SHARE_LINK_VERSION,
    t: payload.title,
    d: isoInstant(date),
    tz: zoneOf(preview),
    l: language(preview),
    c: preview.tintHex ?? payload.customCategory?.colorHex,
    e: preview.emoji ?? (payload.iconKindRaw === ICON_EMOJI ? ownIcon : undefined),
    y: preview.symbol ?? (payload.iconKindRaw === ICON_SYMBOL ? ownIcon : undefined),
    s: shareURLForToken(token),
  });
}

/** `SharedCountdownPayload`: a countdown, aimed at its next occurrence. */
function countdownInvite(payload: any, token: string): InvitePayload | null {
  const date = foundationDate(payload.date);
  if (date === undefined) return null;
  const preview = previewOf(payload);
  const zone = zoneOf(preview);
  const includesTime = payload.includesTime === true;
  const target = payload.repeatsYearly === true ? nextAnniversary(date, includesTime, zone ?? 'UTC') : date;
  return cleanInvite({
    v: SHARE_LINK_VERSION,
    t: payload.title,
    d: isoInstant(target),
    tz: zone,
    l: language(preview),
    c: preview.tintHex ?? payload.colorHex,
    e: preview.emoji ?? (payload.iconKindRaw === ICON_EMOJI ? payload.iconValue : undefined),
    y: preview.symbol ?? (payload.iconKindRaw === ICON_SYMBOL ? payload.iconValue : undefined),
    s: shareURLForToken(token),
    k: 'c',
    h: includesTime,
  });
}

/**
 * The app's `CountdownMath.target` for a yearly countdown: the date itself
 * while it's today or later, otherwise its next anniversary (today included).
 * A 29 February falls on the 28th in other years. Worked out in the sender's
 * zone, like the app does on the sender's phone.
 */
export function nextAnniversary(date: number, includesTime: boolean, zone: string, now: number = Date.now()): number {
  const event = wallClock(date, zone);
  const today = wallClock(now, zone);
  const day = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d);
  if (day(event.year, event.month, event.day) >= day(today.year, today.month, today.day)) return date;

  const inYear = (year: number) => {
    const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    return { year, day: event.month === 2 && event.day === 29 && !leap ? 28 : event.day };
  };
  let next = inYear(today.year);
  if (day(next.year, event.month, next.day) < day(today.year, today.month, today.day)) next = inYear(today.year + 1);
  return instantOf(next.year, event.month, next.day, includesTime ? event.hour : 0, includesTime ? event.minute : 0, zone);
}

interface WallClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

/** What a clock in `zone` reads at `ms`. */
function wallClock(ms: number, zone: string): WallClock {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    hourCycle: 'h23',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).formatToParts(new Date(ms));
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') };
}

/** The instant a clock in `zone` reads the given time (DST-aware). */
function instantOf(year: number, month: number, day: number, hour: number, minute: number, zone: string): number {
  const asUTC = Date.UTC(year, month - 1, day, hour, minute);
  const offsetAt = (ms: number) => {
    const w = wallClock(ms, zone);
    return Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute) - Math.floor(ms / 60_000) * 60_000;
  };
  let instant = asUTC - offsetAt(asUTC);
  // Across a DST change the first guess lands an hour off; one more pass fixes it.
  const second = asUTC - offsetAt(instant);
  if (second !== instant) instant = second;
  return instant;
}

/**
 * The record's photo, square and small, as a JPEG both the page and the card
 * can use. It's someone else's image: sharp decodes it with a pixel cap, and
 * anything that isn't a readable JPEG is dropped (the icon is drawn instead).
 */
async function shrinkPhoto(value: unknown): Promise<Buffer | undefined> {
  if (typeof value !== 'string' || value === '') return undefined;
  const bytes = Buffer.from(value, 'base64');
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) return undefined;
  try {
    return await sharp(bytes, { limitInputPixels: MAX_PHOTO_PIXELS })
      .rotate()
      .resize(PHOTO_SIZE, PHOTO_SIZE, { fit: 'cover' })
      .jpeg({ quality: 80 })
      .toBuffer();
  } catch {
    return undefined;
  }
}
