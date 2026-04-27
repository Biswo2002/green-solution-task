import DeviceInfo from 'react-native-device-info';
import { Logger } from '$/utils/logger';

/**
 * Check if device location services (system-level) are enabled.
 * When this returns false, the app should NOT request location permission
 * or show any location permission dialogs.
 * Safe to call from any platform; returns false on error or unsupported platform.
 */
export const isLocationServicesEnabled = async (): Promise<boolean> => {
  try {
    const enabled = await DeviceInfo.isLocationEnabled();
    return Boolean(enabled);
  } catch (error) {
    Logger.warn('Error checking if location services are enabled (non-fatal)', error);
    return false;
  }
};
