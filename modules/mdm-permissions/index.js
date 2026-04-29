import { NativeModules, Platform, PermissionsAndroid } from 'react-native';

const { MdmPermissions } = NativeModules;

const getAllGrantedFromDetails = (details) =>
  Object.values(details).every(Boolean);

export const requestCustomPermissions = async () => {
  if (Platform.OS === 'ios') {
    if (MdmPermissions && MdmPermissions.requestAllPermissions) {
      const details = (await MdmPermissions.requestAllPermissions()) || {};
      return {
        allGranted: getAllGrantedFromDetails(details),
        details,
      };
    }
    return {
      allGranted: false,
      details: {},
      error: 'MdmPermissions native module is not linked on iOS.',
    };
  } else if (Platform.OS === 'android') {
    const requestedDetails = {
      camera: await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA),
      microphone: await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO),
      photos: await PermissionsAndroid.request(
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ),
      notifications:
        Platform.Version >= 33
          ? await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
          : PermissionsAndroid.RESULTS.GRANTED,
    };

    const details = {
      camera: requestedDetails.camera === PermissionsAndroid.RESULTS.GRANTED,
      microphone: requestedDetails.microphone === PermissionsAndroid.RESULTS.GRANTED,
      photos: requestedDetails.photos === PermissionsAndroid.RESULTS.GRANTED,
      notifications: requestedDetails.notifications === PermissionsAndroid.RESULTS.GRANTED,
    };

    return { allGranted: getAllGrantedFromDetails(details), details };
  }

  return {
    allGranted: false,
    details: {},
    error: `Unsupported platform: ${Platform.OS}`,
  };
};
