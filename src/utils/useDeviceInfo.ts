import {Platform, PermissionsAndroid, NativeModules} from 'react-native';

export interface DeviceInfo {
  countryIso?: string;
  carrierName?: string;
  osVersion?: string;
  androidId?: string;
  device?: string;
  sdkInt?: number;
  brand?: string;
  manufacturer?: string;
  model?: string;
  product?: string;
  phoneNumber?: string;
}

export const getDeviceInfo = async (): Promise<DeviceInfo> => {
  const {TelephonyModule} = NativeModules;
  const info: DeviceInfo = {};

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
          title: 'Phone Permission',
          message: 'This app needs access to your phone state.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await TelephonyModule.getDeviceAndTelephonyInfo();
        return {
          countryIso: result.countryIso,
          carrierName: result.carrierName,
          osVersion: result.osVersion,
          androidId: result.androidId,
          device: result.device,
          sdkInt: result.sdkInt,
          brand: result.brand,
          manufacturer: result.manufacturer,
          model: result.model,
          product: result.product,
          phoneNumber: result.phoneNumber, // optional
        };
      } else {
        console.log('Permission denied');
      }
    } catch (error) {
      console.warn('Error fetching device info:', error);
    }
  }

  return info;
};
