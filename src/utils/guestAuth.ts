import { setGuest, setToken } from '~/redux/slices/authSlice';
import { AuthService } from '~/redux/api/AuthService';
import type { AppDispatch } from '~/redux/store';
import { STORAGE_KEYS } from './storageKeys';
import appStorage from './AppStorage';

/**
 * Exit guest mode and return to a logged-out state so the user can sign in.
 */
export async function exitGuestModeToLogin(dispatch: AppDispatch) {
  dispatch(setGuest(false));
  AuthService.setToken(null);
  appStorage.removeItem(STORAGE_KEYS.IS_GUEST as never);
  appStorage.setItem(STORAGE_KEYS.LOGGED_IN as never, false as never);
  appStorage.setItem(STORAGE_KEYS.AUTH_TOKEN as never, null as never);
  dispatch(setToken(null));
}
