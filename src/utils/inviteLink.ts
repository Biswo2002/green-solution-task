const TOKEN_QUERY_KEYS = ['token', 'inviteToken', 'invite_token'];
const TOKEN_PATH_PATTERNS = [
  /\/invite\/game\/([^/?#]+)/i,
  /\/invite-links\/([^/?#]+)/i,
  /\/game\/invite\/([^/?#]+)/i,
];

const PUBLIC_GAME_PATH_PATTERN = /\/game\/public\/([^/?#]+)/i;

const safelyDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const extractTokenFromQuery = (url: string): string | null => {
  for (const key of TOKEN_QUERY_KEYS) {
    const pattern = new RegExp(`[?&]${key}=([^&#]+)`, 'i');
    const match = url.match(pattern);
    if (match?.[1]) {
      const token = safelyDecode(match[1]).trim();
      if (token) return token;
    }
  }
  return null;
};

const extractTokenFromPath = (url: string): string | null => {
  for (const pattern of TOKEN_PATH_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) {
      const token = safelyDecode(match[1]).trim();
      if (token) return token;
    }
  }
  return null;
};

export const extractInviteTokenFromUrl = (
  url: string | null | undefined,
): string | null => {
  if (!url || typeof url !== 'string') return null;
  return extractTokenFromQuery(url) ?? extractTokenFromPath(url);
};

/**
 * Extracts gameId from public game share links.
 * Pattern: /game/public/:gameId
 */
export const extractPublicGameIdFromUrl = (
  url: string | null | undefined,
): string | null => {
  if (!url || typeof url !== 'string') return null;
  const match = url.match(PUBLIC_GAME_PATH_PATTERN);
  if (match?.[1]) {
    const gameId = safelyDecode(match[1]).trim();
    if (gameId) return gameId;
  }
  return null;
};

export type DeepLinkResult =
  | { type: 'invite'; token: string }
  | { type: 'publicGame'; gameId: string }
  | null;

/**
 * Parses any deep link URL and returns a typed result.
 * Checks public game pattern first (more specific), then invite patterns.
 */
export const parseDeepLinkUrl = (
  url: string | null | undefined,
): DeepLinkResult => {
  if (!url || typeof url !== 'string') return null;

  const publicGameId = extractPublicGameIdFromUrl(url);
  if (publicGameId) return { type: 'publicGame', gameId: publicGameId };

  const inviteToken = extractInviteTokenFromUrl(url);
  if (inviteToken) return { type: 'invite', token: inviteToken };

  return null;
};
