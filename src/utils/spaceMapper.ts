// src/utils/spaceMapper.ts
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);

type NameObj = { name?: string };
type Ground = {
  id?: string;
  name?: string;
  pricePerSlot?: number | string;
  pricePerSlotRaw?: number | string;
  currency?: string;
  surfaceTypes?: NameObj[];
  venueTypes?: NameObj[];
  slotDurationMinutes?: number;          // ✅ add to type
};
type Sport = { name?: string };
type Slot = { id?: string; ground?: Ground; sport?: Sport; slotDurationMinutes?: number };

const getNames = (arr?: NameObj[]) =>
  (arr ?? []).map(a => a?.name).filter(Boolean).join(', ');

const asNumber = (v: unknown) => (typeof v === 'number' ? v : Number(v ?? 0));

const formatCurrencyINR = (amount: number, currency = 'INR') => {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount}`;
  }
};

// Accepts either: array of slots, or an object that contains .data.availableSlots or .availableSlots
export const extractSlots = (input: any): Slot[] => {
  if (Array.isArray(input)) return input;
  if (Array.isArray(input?.availableSlots)) return input.availableSlots;
  if (Array.isArray(input?.data?.availableSlots)) return input.data.availableSlots;
  return [];
};

export interface SpaceCardData {
  id: string;
  name: string;
  details: string;
  price: string;
  _sortByPrice: number;
  slotDurationMinutes?: number;          // ✅ keep optional for safety
}

export const buildSpacesAvailable = (input: any): SpaceCardData[] => {
  const slots: Slot[] = extractSlots(input);

  const spaces = slots
    .map((slot) => {
      const g = slot?.ground ?? {};
      const surface = getNames(g.surfaceTypes);
      const venue = getNames(g.venueTypes);
      const sportName = slot?.sport?.name ?? '';

      // ✅ Duration pulled from ground first, then from slot as fallback
      const slotDuration = g.slotDurationMinutes ?? slot?.slotDurationMinutes;

      const details = [sportName, venue, surface].filter(Boolean).join(' • ');
      const priceNum = asNumber(g.pricePerSlot ?? g.pricePerSlotRaw);
      const price = formatCurrencyINR(priceNum, g.currency ?? 'INR');

      const id = g.id ?? slot?.id;

      return id
        ? {
            id,
            name: g.name ?? 'Ground',
            details,
            price,
            _sortByPrice: Number.isFinite(priceNum) ? priceNum : Number.MAX_SAFE_INTEGER,
            slotDurationMinutes: typeof slotDuration === 'number' ? slotDuration : undefined, // ✅ include
          }
        : null;
    })
    .filter(Boolean) as SpaceCardData[];

  // Dedupe by ground id
  const dedup = new Map<string, SpaceCardData>();
  for (const s of spaces) dedup.set(s.id, s);

  return Array.from(dedup.values()).sort((a, b) => a._sortByPrice - b._sortByPrice);
};

/** Pricing rule with optional band, dayType, priority and updatedAt for selection */
export type PricingRuleWithBand = {
  sportId: string;
  pricePerHour: string;
  currency?: string;
  band?: string;
  /** e.g. 7 for 7v7; used when venue has sideCountHave */
  sideCount?: number | null;
  dayType?: 'Any' | 'Weekday' | 'Weekend';
  priority?: number;
  updatedAt?: string;
};

/** Venue ground shape from get venue by id */
export type VenueGroundForSpace = {
  id: string;
  name: string;
  slotDurationMinutes?: number;
  pricePerSlot?: string;
  currency?: string;
  sports?: { id: string; name: string }[];
  venueTypes?: { name?: string }[];
  surfaceTypes?: { name?: string }[];
  pricingRules?: PricingRuleWithBand[];
};

/** Band display label and API value */
export const BAND_DISPLAY: Record<string, { label: string; apiValue: string }> = {
  Day: { label: 'Morning', apiValue: 'day' },
  Morning: { label: 'Morning', apiValue: 'day' },
  Evening: { label: 'Evening', apiValue: 'evening' },
  Night: { label: 'Night', apiValue: 'night' },
};

export type BandPriceOption = {
  band: string;
  apiValue: string;
  label: string;
  pricePerHour: string;
  currency: string;
};

const BAND_ORDER: { key: string; band: string; label: string; apiValue: string }[] = [
  { key: 'day', band: 'Day', label: 'Morning', apiValue: 'day' },
  { key: 'evening', band: 'Evening', label: 'Evening', apiValue: 'evening' },
  { key: 'night', band: 'Night', label: 'Night', apiValue: 'night' },
];

/** Config from booking-meta; used to hide bands whose time has passed for the selected date */
export type PricingBandConfigForFilter = {
  dayStart?: string;    // e.g. "06:00"
  eveningStart?: string; // e.g. "18:00"
  nightStart?: string;   // e.g. "21:00"
  timeZone?: string;
};

/** Parse "HH:mm" or "H:mm" to minutes since midnight. Returns null if invalid. */
function parseTimeToMinutes(timeStr: string | undefined): number | null {
  if (!timeStr || typeof timeStr !== 'string') return null;
  const parts = timeStr.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!parts) return null;
  const h = parseInt(parts[1], 10);
  const m = parseInt(parts[2], 10);
  if (!Number.isFinite(h) || !Number.isFinite(m) || h < 0 || h > 23 || m < 0 || m > 59)
    return null;
  return h * 60 + m;
}

/** Default band boundaries when API does not provide pricingBandConfig (e.g. 18:00 = evening, 21:00 = night) */
const DEFAULT_DAY_START = '06:00';
const DEFAULT_EVENING_START = '18:00';
const DEFAULT_NIGHT_START = '21:00';

const DEFAULT_TIMEZONE = 'Asia/Kolkata';

/** Slot-like item with startAt/endAt ISO strings (e.g. SlotLite from venueSolts.services) */
export type SlotWithTimes = { id?: string; startAt: string; endAt: string; [key: string]: unknown };

/**
 * Get minutes since midnight for an ISO date string in the given timezone.
 * Parses startAt/endAt as UTC (e.g. 2026-02-26T12:30:00.000Z) then converts to venue zone.
 */
function getMinutesSinceMidnightInZone(isoDateStr: string, timeZone: string): number {
  try {
    const d = dayjs.utc(isoDateStr).tz(timeZone);
    return d.hour() * 60 + d.minute();
  } catch {
    return 0;
  }
}

/** Band boundaries are almost always in venue local time (e.g. IST). If API sends UTC, slot times would be miscompared. */
function effectiveTimeZoneForBandFilter(config: PricingBandConfigForFilter | null | undefined): string {
  const tz = config?.timeZone ?? DEFAULT_TIMEZONE;
  const u = tz?.toLowerCase?.();
  if (u === 'utc' || u === 'etc/utc' || u === 'gmt') return DEFAULT_TIMEZONE;
  return tz;
}

/**
 * Filter slots by selected pricing band only.
 * Backend already returns only future/available slots, so we do not filter by "current time" here
 * (avoid double-filtering and timezone/clock skew that could hide valid slots).
 * - If selectedBand is set: show only slots whose start time falls in that band
 *   (day: dayStart–eveningStart, evening: eveningStart–nightStart, night: nightStart–midnight).
 * Slot times are converted to venue local time (band boundaries are in venue time); if API sends timeZone "UTC", we use default venue TZ so slots are not wrongly excluded.
 */
export function filterSlotsByPricingBandConfig<T extends SlotWithTimes>(
  slots: T[],
  _selectedDate: string,
  selectedBand: string | null,
  config: PricingBandConfigForFilter | null | undefined,
): T[] {
  if (!slots?.length) return slots;
  const timeZone = effectiveTimeZoneForBandFilter(config);
  const dayStartMin =
    parseTimeToMinutes(config?.dayStart) ?? parseTimeToMinutes(DEFAULT_DAY_START) ?? 6 * 60;
  const eveningStartMin =
    parseTimeToMinutes(config?.eveningStart) ?? parseTimeToMinutes(DEFAULT_EVENING_START) ?? 18 * 60;
  const nightStartMin =
    parseTimeToMinutes(config?.nightStart) ?? parseTimeToMinutes(DEFAULT_NIGHT_START) ?? 21 * 60;

  const bandApi = selectedBand?.trim().toLowerCase() ?? null;

  return slots.filter((slot) => {
    const slotStartMin = getMinutesSinceMidnightInZone(slot.startAt, timeZone);

    if (bandApi === 'day') {
      return slotStartMin >= dayStartMin && slotStartMin < eveningStartMin;
    }
    if (bandApi === 'evening') {
      return slotStartMin >= eveningStartMin && slotStartMin < nightStartMin;
    }
    if (bandApi === 'night') {
      return slotStartMin >= nightStartMin;
    }
    return true;
  });
}

/**
 * For the selected date, return which band keys (day, evening, night) are still available.
 * If selected date is today: hide bands whose time window has passed (e.g. after 18:00 hide Morning).
 * If selected date is in the future: show all bands.
 * Uses default times (18:00, 21:00) when config is missing so Morning still hides after evening start.
 */
export function getAvailableBandKeysForDate(
  selectedDate: string,
  config: PricingBandConfigForFilter | null | undefined,
): ('day' | 'evening' | 'night')[] {
  const all: ('day' | 'evening' | 'night')[] = ['day', 'evening', 'night'];

  const today = new Date();
  const todayStr =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0');
  if (selectedDate !== todayStr) return all;

  const eveningStartMin =
    parseTimeToMinutes(config?.eveningStart) ?? parseTimeToMinutes(DEFAULT_EVENING_START) ?? 18 * 60;
  const nightStartMin =
    parseTimeToMinutes(config?.nightStart) ?? parseTimeToMinutes(DEFAULT_NIGHT_START) ?? 21 * 60;
  const now = new Date();
  const currentMin = now.getHours() * 60 + now.getMinutes();

  const available: ('day' | 'evening' | 'night')[] = [];
  if (currentMin < eveningStartMin) available.push('day');
  if (currentMin < nightStartMin) available.push('evening');
  available.push('night');
  return available;
}

/** Derive dayType from ISO date string (YYYY-MM-DD) for rule matching */
export function getDayTypeFromDate(isoDate: string): 'Weekday' | 'Weekend' {
  try {
    const d = new Date(isoDate + 'T12:00:00Z');
    const day = d.getUTCDay();
    return day >= 1 && day <= 5 ? 'Weekday' : 'Weekend';
  } catch {
    return 'Weekday';
  }
}

/**
 * Get time band options (Morning, Evening, Night) for a ground for the given sport.
 * When selectedDate is provided, filters rules by dayType (Weekday/Weekend); "Any" matches both.
 * When selectedDate and pricingBandConfig are provided and selected date is today, hides bands
 * whose time has passed (e.g. after 18:00 hide Morning).
 * Among matching rules per band: lowest priority, then most recently updated (updatedAt desc).
 * Returns only bands that have a valid price. Static grounds use pricePerSlot for all bands.
 */
export function getBandPricesForGround(
  ground: VenueGroundForSpace | null | undefined,
  sportId: string | undefined,
  selectedDate?: string,
  pricingBandConfig?: PricingBandConfigForFilter | null,
  selectedSideCount?: number | null,
): BandPriceOption[] {
  if (!ground) return [];

  const currency = ground.currency ?? 'INR';
  const byBand = new Map<string, string>();
  const sportIdStr = sportId != null ? String(sportId) : '';
  const dayType = selectedDate ? getDayTypeFromDate(selectedDate) : null;
  const allowedKeys =
    selectedDate
      ? getAvailableBandKeysForDate(selectedDate, pricingBandConfig ?? null)
      : (['day', 'evening', 'night'] as const);

  if (ground.pricingRules?.length && sportIdStr) {
    const hasBand = (r: { band?: string; [k: string]: unknown }) =>
      ((r.band ?? (r as { pricingBand?: string }).pricingBand ?? '').trim() || '').length > 0;
    const baseRules = ground.pricingRules.filter(
      r =>
        (String(r.sportId ?? '') === sportIdStr || r.sportId == null) &&
        hasBand(r),
    );
    const rules =
      dayType != null
        ? baseRules.filter(
            r => !r.dayType || r.dayType === 'Any' || r.dayType === dayType,
          )
        : baseRules;

    const getRuleBand = (r: { band?: string; [k: string]: unknown }) =>
      (r.band ?? (r as { pricingBand?: string }).pricingBand ?? 'Day').trim().toLowerCase();

    const hasSideCount = selectedSideCount != null && selectedSideCount > 0;

    const bandKeys = ['day', 'evening', 'night'] as const;
    for (const key of bandKeys) {
      if (!allowedKeys.includes(key)) continue;
      let bandRules = rules.filter(r => getRuleBand(r) === key);
      if (bandRules.length === 0) continue;

      if (hasSideCount) {
        const exactMatch = bandRules.filter(r => r.sideCount === selectedSideCount);
        if (exactMatch.length > 0) {
          bandRules = exactMatch;
        } else {
          const nullMatch = bandRules.filter(r => r.sideCount == null);
          if (nullMatch.length > 0) bandRules = nullMatch;
        }
      }

      const sorted = [...bandRules].sort((a, b) => {
        const pa = a.priority ?? 0;
        const pb = b.priority ?? 0;
        if (pa !== pb) return pa - pb;
        const ta = a.updatedAt ?? '';
        const tb = b.updatedAt ?? '';
        return tb.localeCompare(ta);
      });
      const r = sorted[0];
      const price = r.pricePerHour ?? '0';
      const num = Number(price);
      if (Number.isFinite(num) && num > 0) byBand.set(key, price);
    }
  }

  const fallbackPrice =
    !byBand.size && ground.pricePerSlot && Number(ground.pricePerSlot) > 0
      ? String(ground.pricePerSlot).trim()
      : null;

  const allBands = BAND_ORDER.filter(({ key }) =>
    (allowedKeys as readonly string[]).includes(key),
  ).map(
    ({ key, band, label, apiValue }) => ({
      band,
      apiValue,
      label,
      pricePerHour: byBand.get(key) ?? fallbackPrice ?? '—',
      currency,
    }),
  );

  return allBands.filter(
    b => b.pricePerHour !== '—' && b.pricePerHour !== '' && Number(b.pricePerHour) > 0,
  );
}

/**
 * Get minimum price from pricing rules for a ground and sport (for card display/sort when pricePerSlot is 0).
 * When selectedDate is provided, filters by dayType (Weekday/Weekend); "Any" matches both.
 */
function getMinPriceFromRules(
  ground: VenueGroundForSpace,
  sportId: string | undefined,
  selectedDate?: string,
): number | null {
  if (!sportId || !Array.isArray(ground.pricingRules) || ground.pricingRules.length === 0)
    return null;
  const sportIdStr = String(sportId);
  const dayType = selectedDate ? getDayTypeFromDate(selectedDate) : null;
  const filtered =
    dayType != null
      ? ground.pricingRules.filter(
          r =>
            (String(r.sportId ?? '') === sportIdStr &&
              (!r.dayType || r.dayType === 'Any' || r.dayType === dayType)),
        )
      : ground.pricingRules.filter(r => String(r.sportId ?? '') === sportIdStr);
  let min: number | null = null;
  for (const r of filtered) {
    const n = asNumber(r.pricePerHour);
    if (Number.isFinite(n) && n > 0 && (min == null || n < min)) min = n;
  }
  return min;
}

/**
 * Build space cards from venue grounds. When sportId is provided, only includes grounds
 * that support that sport (sports array contains sportId). Grounds with no/empty sports
 * are still shown so we don't hide all when the API doesn't return sport per ground.
 * Price: static uses pricePerSlot; dynamic uses min of pricingRules (optionally filtered by selectedDate dayType).
 */
export const buildSpacesFromVenueGrounds = (
  grounds: VenueGroundForSpace[],
  sportId?: string,
  selectedDate?: string,
): SpaceCardData[] => {
  if (!Array.isArray(grounds) || grounds.length === 0) return [];

  const filtered =
    sportId == null || sportId === ''
      ? grounds
      : grounds.filter(
          g =>
            !g.sports?.length ||
            g.sports.some((s: any) => String(s?.id) === String(sportId)),
        );

  return filtered
    .map(g => {
      const venue = getNames(g.venueTypes);
      const surface = getNames(g.surfaceTypes);
      const details = [venue, surface].filter(Boolean).join(' | ') || '—';
      let priceNum = asNumber(g.pricePerSlot);

      if (
        (priceNum === 0 || !Number.isFinite(priceNum)) &&
        sportId &&
        Array.isArray(g.pricingRules) &&
        g.pricingRules.length > 0
      ) {
        const ruleMin = getMinPriceFromRules(g, sportId, selectedDate);
        if (ruleMin != null) priceNum = ruleMin;
      }
      if (!Number.isFinite(priceNum) || priceNum < 0) priceNum = Number.MAX_SAFE_INTEGER;
      const price = formatCurrencyINR(priceNum, g.currency ?? 'INR');
      const slotDuration = g.slotDurationMinutes ?? 60;
      return {
        id: g.id,
        name: g.name ?? 'Ground',
        details,
        price,
        _sortByPrice: priceNum,
        slotDurationMinutes: slotDuration,
      };
    })
    .sort((a, b) => a._sortByPrice - b._sortByPrice);
};
