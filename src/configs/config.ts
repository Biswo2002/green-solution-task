export const AppConfig = {
  API_BASE_URL: 'https://api.sportup.ai',
  REQUEST_TIMEOUT: 30_000,
  ENABLE_NETWORK_LOGS: __DEV__,
  MAX_RETRIES: 3,
  /** Minimum level emitted by Logger. */
  LOG_LEVEL: 'info' as 'debug' | 'info' | 'warn' | 'error',
  /** Used for error reporting (e.g. Sentry) gating. */
  ENVIRONMENT: __DEV__ ? 'development' : 'production',
} as const;
