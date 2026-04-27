export const STORAGE_KEYS = {
  CRED_IDENTIFIER: 'cred_identifier',
  CRED_PASSWORD: 'cred_password',
  AUTH_TOKEN: '@sport-up/auth_token',
  USER: '@sport-up/user',
  LOGGED_IN: '@sport-up/isLoggedIn',
  IM_ENTERING: 'Im_Entering',
  REFRESH_TOKEN: '@sport-up/refresh_token',
  PIN_CODE_IDENTIFY: '@user_pin_code',
  IS_GUEST: '@sport-up/isGuest',
  CORE_PERMISSIONS_REQUESTED: '@sport-up/core_permissions_requested',
  /** Set when user has gone through in-app location request at least once (iOS: allows reading real status on next launch). */
  LOCATION_REQUESTED_ONCE: '@sport-up/location_requested_once',
  MOBILE_VERIFIED: '@sport-up/mobile_verified',
  PENDING_INVITE_TOKEN: '@sport-up/pending_invite_token',
  CONSUMED_INVITE_TOKEN: '@sport-up/consumed_invite_token',
  PENDING_PUBLIC_GAME_ID: '@sport-up/pending_public_game_id',
  CONSUMED_PUBLIC_GAME_ID: '@sport-up/consumed_public_game_id',
};
