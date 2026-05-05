import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from './logger';
import { STORAGE_KEYS } from './storageKeys';

type JsonValue = string | number | boolean | null | Record<string, any> | JsonValue[];

const cache = new Map<string, JsonValue>();

const hydrate = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (!keys.length) return;
    const st = AsyncStorage as typeof AsyncStorage & {
      multiGet: (k: readonly string[]) => Promise<readonly [string, string | null][]>;
    };
    const entries = await st.multiGet(keys);
    entries.forEach(([key, value]) => {
      if (value !== null) {
        try {
          cache.set(key, JSON.parse(value));
        } catch (err) {
          cache.set(key, value);
          Logger.error('AppStorage hydrate parse error', err);
        }
      }
    });
  } catch (error) {
    Logger.error('AppStorage hydrate error', error);
  }
};

export const appStorageReady = hydrate();

const serialize = (value: JsonValue) => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    Logger.error('AppStorage serialize error', error);
    return JSON.stringify(null);
  }
};

/** Updates in-memory cache immediately, then persists. Await this when the value must survive process death (e.g. onboarding flags). */
const setItem = (key: string, data: JsonValue): Promise<void> => {
  try {
    cache.set(key, data);
    return AsyncStorage.setItem(key, serialize(data)).then(
      () => undefined,
      err => {
        Logger.error('AppStorage setItem error', err);
      },
    );
  } catch (error) {
    Logger.error('AppStorage setItem error', error);
    return Promise.resolve();
  }
};

const getItem = (key: string) => {
  try {
    return cache.has(key) ? cache.get(key) ?? null : null;
  } catch (error) {
    Logger.error('AppStorage getItem error', error);
    return null;
  }
};

/** Reads the value from AsyncStorage (source of truth) and syncs the in-memory cache. Prefer this after startup for flags that must match disk (e.g. one-time onboarding). */
const getItemAsync = async (key: string): Promise<JsonValue | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      cache.delete(key);
      return null;
    }
    let parsed: JsonValue;
    try {
      parsed = JSON.parse(value) as JsonValue;
    } catch {
      parsed = value as JsonValue;
    }
    cache.set(key, parsed);
    return parsed;
  } catch (error) {
    Logger.error('AppStorage getItemAsync error', error);
    return null;
  }
};

const removeItem = (key: string) => {
  try {
    cache.delete(key);
    AsyncStorage.removeItem(key).catch(err =>
      Logger.error('AppStorage removeItem error', err),
    );
  } catch (error) {
    Logger.error('AppStorage removeItem error', error);
  }
};

const getAllKeys = () => {
  try {
    return Array.from(cache.keys());
  } catch (error) {
    Logger.error('AppStorage getAllKeys error', error);
    return [];
  }
};

const clearAll = () => {
  try {
    // Preserve keys that should survive app-level logouts / cache clears.
    const preservedKeys = [
      'has_Seen_Splash',
      STORAGE_KEYS.CORE_PERMISSIONS_REQUESTED,
    ];

    const preservedValues: Record<string, JsonValue> = {};

    preservedKeys.forEach(key => {
      try {
        if (cache.has(key)) {
          const val = cache.get(key);
          if (val !== undefined) {
            preservedValues[key] = val;
          }
        }
      } catch (error) {
        Logger.error('AppStorage clearAll preserve read error', error);
      }
    });

    cache.clear();

    AsyncStorage.clear()
      .then(() => {
        // Restore preserved keys after full clear.
        Object.entries(preservedValues).forEach(([key, value]) => {
          try {
            setItem(key, value);
          } catch (error) {
            Logger.error('AppStorage clearAll restore error', error);
          }
        });
      })
      .catch(err => {
        Logger.error('AppStorage clearAll error', err);
      });
  } catch (error) {
    Logger.error('AppStorage clearAll error', error);
  }
};

export default { setItem, getItem, getItemAsync, removeItem, getAllKeys, clearAll };
