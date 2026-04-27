import appStorage from './AppStorage';
import { STORAGE_KEYS } from './storageKeys';

function asString(v: unknown): string | undefined {
  return typeof v === 'string' ? v : undefined;
}

export function getPendingInviteToken(): string | undefined {
  return asString(appStorage.getItem(STORAGE_KEYS.PENDING_INVITE_TOKEN as never));
}

export function clearPendingInviteToken() {
  appStorage.removeItem(STORAGE_KEYS.PENDING_INVITE_TOKEN as never);
}

export function setConsumedInviteToken(t: string) {
  appStorage.setItem(STORAGE_KEYS.CONSUMED_INVITE_TOKEN as never, t as never);
}

export function clearConsumedInviteToken() {
  appStorage.removeItem(STORAGE_KEYS.CONSUMED_INVITE_TOKEN as never);
}

export function getPendingPublicGameId(): string | undefined {
  return asString(appStorage.getItem(STORAGE_KEYS.PENDING_PUBLIC_GAME_ID as never));
}

export function clearPendingPublicGameId() {
  appStorage.removeItem(STORAGE_KEYS.PENDING_PUBLIC_GAME_ID as never);
}

export function setConsumedPublicGameId(id: string) {
  appStorage.setItem(STORAGE_KEYS.CONSUMED_PUBLIC_GAME_ID as never, id as never);
}

export function clearConsumedPublicGameId() {
  appStorage.removeItem(STORAGE_KEYS.CONSUMED_PUBLIC_GAME_ID as never);
}
