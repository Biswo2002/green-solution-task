import {Appearance} from 'react-native';
import LocalStorage from './AppStorage'; // Adjust the path if necessary

/**
 * Loads the dark mode setting from AsyncStorage or defaults to the current system color scheme.
 * @returns A promise resolving to the parsed boolean value of the dark mode setting.
 */
export const loadDarkModeSetting = async (): Promise<boolean> => {
  try {
    const raw = await Promise.resolve(LocalStorage.getItem('isDarkMode'));
    if (typeof raw === 'boolean') {
      return raw;
    }
    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw) as boolean;
      } catch {
        return false;
      }
    }
    if (raw !== null) {
      return false;
    }

    // Fallback to the current system color scheme if no stored preference exists
    const systemColorScheme = Appearance.getColorScheme(); // 'light', 'dark', or null
    return systemColorScheme === 'dark';
  } catch (error) {
    console.error('Failed to load dark mode preference:', error);
    return false; // Default to false in case of an error
  }
};
