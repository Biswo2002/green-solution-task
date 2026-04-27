import { AppConfig } from "$/configs/config";


type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class LoggerService {
  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };

    const currentLevel = levels[AppConfig.LOG_LEVEL as LogLevel] || 1;
    return levels[level] >= currentLevel;
  }

  debug(message: string, data?: any) {
    if (this.shouldLog('debug')) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog('info')) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog('warn')) {
      if (data !== undefined) {
        console.warn(`[WARN] ${message}`, data);
      } else {
        console.warn(`[WARN] ${message}`);
      }
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog('error')) {
      // console.error(`[ERROR] ${message}`, error);
      // In production, send to crash reporting service
      if (AppConfig.ENVIRONMENT === 'production') {
        // Uncomment when Sentry is configured
        // import * as Sentry from '@sentry/react-native';
        // Sentry.captureException(error, {
        //   tags: { source: 'logger' },
        //   extra: { message },
        // });
      }
    }
  }
}

export const Logger = new LoggerService();