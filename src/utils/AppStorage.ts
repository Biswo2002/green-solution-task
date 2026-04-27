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

const setItem = (key: string, data: JsonValue) => {
  try {
    cache.set(key, data);
    AsyncStorage.setItem(key, serialize(data)).catch(err =>
      Logger.error('AppStorage setItem error', err),
    );
  } catch (error) {
    Logger.error('AppStorage setItem error', error);
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

export default { setItem, getItem, removeItem, getAllKeys, clearAll };
