import axios, { AxiosError } from 'axios';
import { LOCATION_IQ_API_KEY } from './hosts';

const url = 'https://www.google.com/search?tbm=map&tch=1&q=';

type ResponseKind = 'success' | 'failure';

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

/** In-memory cache to avoid hitting LocationIQ rate limit (429) for same/nearby coords. */
const GEO_CACHE_MAX = 50;
const GEO_CACHE_TTL_MS = 5 * 60 * 1000; // 5 min
const GEO_CACHE_ROUND = 1e4; // ~11m precision

type CachedGeo = { data: { address?: Record<string, string> }; at: number };
const geoCache = new Map<string, CachedGeo>();

function cacheKey(lat: number, lon: number): string {
  const r = GEO_CACHE_ROUND;
  return `${Math.round(lat * r) / r}_${Math.round(lon * r) / r}`;
}

function getCached(lat: number, lon: number): { address?: Record<string, string> } | null {
  const key = cacheKey(lat, lon);
  const entry = geoCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at > GEO_CACHE_TTL_MS) {
    geoCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCached(lat: number, lon: number, data: { address?: Record<string, string> }) {
  if (geoCache.size >= GEO_CACHE_MAX) {
    const firstKey = geoCache.keys().next().value;
    if (firstKey != null) geoCache.delete(firstKey);
  }
  const key = cacheKey(lat, lon);
  geoCache.set(key, { data, at: Date.now() });
}

/** Normalize Nominatim response to same shape as LocationIQ { address: { ... } }. */
function toAddressShape(raw: unknown): { address: Record<string, string> } {
  const addr: Record<string, string> = {};
  const o = raw as Record<string, unknown>;
  if (o?.address && typeof o.address === 'object') {
    const a = o.address as Record<string, string>;
    addr.postcode = a.postcode ?? a.postal_code ?? '';
    addr.house_number = a.house_number ?? a.house ?? '';
    addr.road = a.road ?? a.street ?? '';
    addr.suburb = a.suburb ?? a.neighbourhood ?? '';
    addr.city = a.city ?? a.town ?? a.village ?? a.county ?? '';
    addr.state = a.state ?? a.region ?? '';
    addr.country = a.country ?? '';
  }
  return { address: addr };
}

const GetLocationName = async ({ lat, lon }: { lat: number; lon: number }) => {
  const urlLoc = `${lat}%20${lon}`;
  try {
    const response = await axios.get(url + urlLoc);
    const str = await response.data;

    return await str
      .split('[[\\')[2]
      .replace(']]],[7,', '')
      .replace('\\"', '')
      .replace('"', '');
  } catch (error) {
    console.error(error);
  }
};

/**
 * Fetches address by lat/lon with minimal API usage to avoid 429:
 * 1. In-memory cache (same/nearby coords within 5 min)
 * 2. LocationIQ reverse (single call)
 * 3. Nominatim as free fallback
 */
const GetAddressByLatLon = async (lat: number, lon: number) => {
  const cached = getCached(lat, lon);
  if (cached) return cached;

  // 1) LocationIQ reverse
  if (LOCATION_IQ_API_KEY) {
    try {
      const reverseUrl = `https://us1.locationiq.com/v1/reverse?key=${LOCATION_IQ_API_KEY}&lat=${lat}&lon=${lon}&format=json&accept-language=en`;
      const reverseRes = await axios.get(reverseUrl);
      if (reverseRes.status === 200 && reverseRes.data) {
        setCached(lat, lon, reverseRes.data);
        return reverseRes.data;
      }
    } catch (err) {
      const status = (err as AxiosError)?.response?.status;
      if (status === 429) {
        console.warn('⚠️ LocationIQ rate limited (429), using Nominatim fallback');
      }
      // Fall through to Nominatim
    }
  }

  // 2) Nominatim (free, no key)
  try {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`;
    const resNom = await axios.get(nominatimUrl, {
      headers: { 'User-Agent': 'SportUp/1.0 (contact@sportup.ai)' },
    });
    const normalized = toAddressShape(resNom.data);
    setCached(lat, lon, normalized);
    return normalized;
  } catch (nominatimError) {
    console.error('❌ All geocode providers failed:', nominatimError);
    throw nominatimError;
  }
};


// const CheckForOperatingArea = async (
//   pin_code: string,
// ): Promise<NetworkResponse<any>> => {
//   try {
//     const response = await APIClient.get(
//       URLs.CHECK_OPERATING_AREA + '/' + pin_code,
//     );
//     if (response.status === 200 && !response.data.error) {
//       return {
//         kind: 'success',
//         body: { message: response.data.message, valid: true },
//       };
//     }
//     return {
//       kind: 'failure',
//       body: response.data.message,
//     };
//   } catch (e: any) {
//     console.error(e.response.data);
//     return {
//       kind: 'failure',
//       body: e.response.data.message,
//     };
//   }
// };

export {
  GetLocationName,
  GetAddressByLatLon,
  //  CheckForOperatingArea
};
