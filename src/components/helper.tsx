import {
  Alert,
  AlertButton,
  Animated,
  Dimensions,
  ImageStyle,
  Linking,
  PermissionsAndroid,
  PixelRatio,
  Platform,
  TextStyle,
  ViewStyle,
} from 'react-native';
// import moment from 'moment';
// import * as AppConstants from './constant';
// import {ResponseError} from '../types/resonseError';
// import {AppColors, AppString} from '@constants';
// import View from '@components/view';
// import Toast from 'react-native-toast-message';
// import {
//   launchCamera,
//   launchImageLibrary,
//   CameraOptions,
//   PhotoQuality,
// } from 'react-native-image-picker';

/***  Screen and design sizes ***/
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

export const REST_TIME = 20; // 1 second

export const getScreenSize = () => {
  const { Dimensions } = require('react-native');
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};
export const nameRegex = /^[a-zA-Z\s\-']+$/;

export const getWidth = (value: number) => {
  return PixelRatio.roundToNearestPixel(
    value * (getScreenSize().width / DESIGN_WIDTH),
  );
};

export const getHeight = (value: number) => {
  return PixelRatio.roundToNearestPixel(
    value * (getScreenSize().height / DESIGN_HEIGHT),
  );
};

export const getMargin = (value: number, isHorizontal: boolean = false) => {
  return isHorizontal ? getWidth(value) : getHeight(value);
};
/***  Screen and design sizes ***/

export const isNotEmpty = (value: string | null | undefined) => {
  if (value === undefined || value === null) return false;
  else if (typeof value === 'string') {
    return value && value.trim().length > 1;
  } else {
    return true;
  }
};

export const isEmpty = (value: string | Array<unknown>): boolean => {
  if (typeof value === 'string') {
    return !value && value.trim().length === 0;
  }
  if (Array.isArray(value)) {
    return value && value.length === 0;
  } else {
    return true;
  }
};

type Style = ViewStyle | TextStyle | ImageStyle;
export const composeStyle = (style1: Style, style2: Style) => {
  const { StyleSheet } = require('react-native');
  return StyleSheet.compose(style1, style2);
};

export const flattenStyle = (style1: Style, style2: Style) => {
  const { StyleSheet } = require('react-native');
  return StyleSheet.flatten([style1, style2]);
};

export const WITHOUT_BOTTOM_SAFE_AREA_EDGES = ['top', 'left', 'right'] as const;
export const SAFE_AREA_EDGES = ['top', 'left', 'right', 'bottom'] as const;

export const getShadowStyle = (shadowColor: string = '#909090', elevation: number = 2) => {
  return {
    // elevation: elevation,
    // shadowColor: shadowColor,
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // shadowOffset: {height: 2, width: 2},

    shadowColor: shadowColor,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 2,
  };
};

export const hideKeyboard = () => {
  const { Keyboard } = require('react-native');
  Keyboard.dismiss();
};

export const stringify = (value: any) => JSON.stringify(value);

export const parse = (value: string) => JSON.parse(value);

export const isUrl = (value: any) => {
  if (typeof value === 'string') {
    return value && (value.includes('http') || value.includes('https'));
  } else return false;
};

// /***  AsyncStorage ***/
// type Key =
//   | 'user'
//   | 'authorization'
//   | 'onboarding'
//   | 'statusProfile'
//   | 'isOnline'
//   | 'callToken'
//   | 'fcmToken'
//   | 'language'
//   | 'userId';
// const save = async (key: string, value: string) => {
//   const AsyncStorage =
//     require('@react-native-async-storage/async-storage').default;
//   try {
//     log('save Item => ', key + ' =>' + value);
//     await AsyncStorage.setItem(key, value);
//   } catch (e) {
//     log('save Item Error');
//     log(e);
//   }
// };

// export const saveItem = (key: Key, value: any) => {
//   if (typeof value === 'string') save(key.toString(), value);
//   else if (typeof value === 'object') save(key.toString(), stringify(value));
//   else if (Array.isArray(value)) save(key.toString(), stringify(value));
//   else if (typeof value === 'boolean') save(key.toString(), stringify(value));
//   else throw 'Invalid type';
// };

// export const getItem = async (key: Key) => {
//   return new Promise<string>(async (resolve, reject) => {
//     const AsyncStorage =
//       require('@react-native-async-storage/async-storage').default;
//     const value = await AsyncStorage.getItem(key.toString());
//     AppConstants.DEBUG &&
//       console.log('Retirve Item => ', key.toString() + ' =>' + value);
//     if (value != null) resolve(value);
//     else reject('Value Not found');
//   });
// };

// export const removeItem = async (params: Key) => {
//   const AsyncStorage =
//     require('@react-native-async-storage/async-storage').default;
//   return AsyncStorage.removeItem(params);
// };
// export const REGEX_PASSWORD =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[^\s]{8,16}$/;

// interface ToastMsgParams {
//   type: 'error' | 'success' | 'info' | 'warning';
//   title?: string;
//   message?: string;
// }

// export const ToastMsg = ({type, title, message}: ToastMsgParams) => {
//   Toast.show({
//     type: type === type ? type : 'success',
//     text1: title,
//     text2: message,
//   });
// };

// export const logout = async () => {
//   await removeItem('authorization');
//   await removeItem('user');
//   // await removeItem('fcmToken');
// };

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const UPPERCASE_REGEX = /[A-Z]/;
export const LOWER_REGEX = /[a-z]/;
export const NUMBER_REGEX = /\d/;
export const SPECIALCHAR_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
export const PHONE_REGEX = /^\d+$/;
export const cleanPhone = (phone: string) => {
  phone.replace(/[\s\-]/g, '');
};

// /***  AsyncStorage ***/

// export const configure = async () => {};

// export const isUnauthorized = (error: any) =>
//   error && error.response.status === 401;

// export const success = (response: any) =>
//   (response?.status === 200 || response?.status === 201) ?? false;

// export const isRejected = (response: string) => response === 'rejected';

// export const getError = (response: any) => {
//   if (response.response.data.data && response.response.data.data.meta)
//     return response.response.data;
//   return (
//     response?.response?.data?.meta.message ??
//     response?.response?.data?.meta.message ??
//     'No data found'
//   );
// };
// export const getErrorFromResponse = (response: ResponseError | any) => {
//   if (typeof response === 'string') return response;
//   else if (response.data && response.data.errors) {
//     return response.data.errors[0].msg;
//   } else if (response.message) {
//     return response.message;
//   } else {
//     return response.payload;
//   }
// };

// export const showAlert = (
//   title: string = '',
//   message: string = '',
//   buttons: AlertButton[],
// ) => {
//   const {Alert} = require('react-native');
//   Alert.alert(title, message, buttons);
// };

// type DateFormate =
//   | 'DD/MM/yyyy'
//   | 'DD.MM.yyyy'
//   | 'yyyy-MM-DD HH:mm:ss'
//   | 'DD MMM'
//   | 'YYYY-MM-DD'
//   | 'DD MMMM YYYY'
//   | 'hh:mm A'
//   | 'MMM D, YYYY'
//   | 'dd MMM, hh:mm A';
// export const dateInString = (date: Date, formate: DateFormate) =>
//   moment(date).format(formate);

// export const days = (date1: Date) => {
//   var date2 = new Date();
//   var diffInTime = date2.getTime() - date1.getTime();
//   var diffInDays = diffInTime / (1000 * 3600 * 24);
//   return parseInt(diffInDays.toString());
// };

// export const borderStyle = (isActive: boolean, width: number = 1) => ({
//   borderWidth: getMargin(width),
//   // borderColor: isActive ? AppColors.C0000000 : AppColors.CFFFFFF
// });

// type Regex = 'email' | '1number' | '1uppercase' | '1symbol';
// export const checkRegex = (regex: Regex, string: string): boolean => {
//   let pattern;
//   switch (regex) {
//     case 'email':
//       pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       return pattern.test(string);
//     case '1number':
//       pattern = /.*\d.*/;
//       return pattern.test(string);
//     case '1uppercase':
//       pattern = /.*[A-Z].*/;
//       return pattern.test(string);
//     case '1symbol':
//       pattern = /.*[^a-zA-Z0-9].*/;
//       return pattern.test(string);
//     default:
//       return false;
//   }
// };

// export const isRejectedWithValue = (res: any) => res.meta.rejectedWithValue;

// export const convertAmount = (amount: number | string, digit: number = 2) =>
//   typeof amount === 'string' ? amount : amount.toFixed(digit);

// export const getNameFromUri = (url: string) => {
//   const name = url.split('/').pop();
//   return name || '';
// };

// export const openEmailAppWithEmailAndSubject = (
//   email: string,
//   subject: string,
// ) => {
//   const {Linking} = require('react-native');
//   try {
//     Linking.openURL(
//       `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
//         subject,
//       )}`,
//     );
//   } catch (e) {
//     showAlert('App Not Found', 'No email app found', []);
//   }
// };

// //create a method will return Title case string
// export const toTitleCase = (str: string) => {
//   return str.replace(/\w\S*/g, (txt: string) => {
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//   });
// };

// // export const getEmptyView = (value: number, isVertical: boolean = true) => (
// //   <View
// //     style={{
// //       height: getMargin(isVertical ? value : 0),
// //       width: getMargin(isVertical ? 0 : value),
// //     }}
// //   />
// // );

// // export const getHorizontalDivider = () => (
// //   <View
// //     style={{width: '100%', height: 1, backgroundColor: AppColors.nutural[50]}}
// //   />
// // );

// // export const navigateTo = (navigation: any, step: number, mobile?: string) => {
// //   if (step === 1) {
// //     navigation.reset({
// //       index: 0,
// //       routes: [
// //         {
// //           name: AppConstants.Screen.Auth.UserProfileSetup,
// //           params: {mobile: mobile},
// //         },
// //       ],
// //     });
// //   } else if (step === 2) {
// //     navigation.reset({
// //       index: 0,
// //       routes: [{name: AppConstants.Screen.Auth.FitnessLevelAndGoals}],
// //     });
// //   } else if (step === 3) {
// //     navigation.reset({
// //       index: 0,
// //       routes: [{name: AppConstants.Screen.Auth.HealthAndLifeStyle}],
// //     });
// //   } else if (step === 4) {
// //     navigation.reset({
// //       index: 0,
// //       routes: [{name: AppConstants.Screen.Auth.WorkoutPreferences}],
// //     });
// //   }
// // };

// export const hideSplashScreen = () => {
//   const SplashScreen = require('react-native-splash-screen').default;
//   SplashScreen.hide();
// };

// export const withPrefix = (value: number, length: number, prefix: string) => {
//   return (prefix + value).slice(-length);
// };

// export const log = (message?: any, ...optionalParams: any[]) => {
//   if (AppConstants.DEBUG) {
//     console.log(`----- PlatForm ${Platform.OS}------`);
//     console.log(message, optionalParams);
//   }
// };

// export const exitApp = () => {
//   // showAlert(AppString.exit, AppString.are_you_sure_you_want_to_exit, [
//   //   {
//   //     text: AppString.yes,
//   //     onPress: () => {
//   //       RNExitApp.exitApp();
//   //     },
//   //   },
//   //   {text: AppString.no, onPress: () => {}},
//   // ]);
// };

// export const openDialer = (phoneNumber: string) => {
//   const url = `tel:${phoneNumber}`;
//   Linking.openURL(url).catch(err => {
//     console.error('Failed to open dialer:', err);
//   });
// };

// export const screenHeight = Dimensions.get('window').height;
// export const screenWidth = Dimensions.get('window').width;

// // Styled Logs

// type logColor =
//   | 'black'
//   | 'red'
//   | 'green'
//   | 'yellow'
//   | 'blue'
//   | 'magenta'
//   | 'cyan'
//   | 'white'
//   | 'gray';

// function logMessage(level: logColor, ...args: unknown[]) {
//   const colors = {
//     black:
//       'color: #4a4a4a; font-weight: bold; background: #f8f9fa; padding: 2px 4px; border-radius: 3px;',
//     red: 'color: #e74c3c; font-weight: bold;',
//     green: 'color: #51cf66; font-weight: bold;',
//     yellow: 'color: #ddbe50; font-weight: bold;',
//     blue: 'color: #339af0; font-weight: bold;',
//     magenta: 'color: #c832e3; font-weight: bold;',
//     cyan: 'color: #22d3ee; font-weight: bold;',
//     white:
//       'color: #f8f9fa; font-weight: bold; background: #4a4a4a; padding: 2px 4px; border-radius: 3px;',
//     gray: 'color: #adb5bd; font-weight: bold;',
//   };

//   // Create a styled message with %c placeholder for each argument
//   const styledMessage = args.map(() => '%c%s').join(' ');

//   // Create style and value pairs for console.log
//   const styleValuePairs = args.flatMap(arg => [colors[level], arg]);

//   console.log(styledMessage, ...styleValuePairs);
// }

// export function yellowLog(...args: unknown[]) {
//   logMessage('yellow', ...args);
// }

// export function greenLog(...args: unknown[]) {
//   logMessage('green', ...args);
// }

// export function redLog(...args: unknown[]) {
//   logMessage('red', ...args);
// }

// export function blueLog(...args: unknown[]) {
//   logMessage('blue', ...args);
// }

// export function magentaLog(...args: unknown[]) {
//   logMessage('magenta', ...args);
// }

// export function cyanLog(...args: unknown[]) {
//   logMessage('cyan', ...args);
// }

// export function blackLog(...args: unknown[]) {
//   logMessage('black', ...args);
// }

// export function whiteLog(...args: unknown[]) {
//   logMessage('white', ...args);
// }

// export function grayLog(...args: unknown[]) {
//   logMessage('gray', ...args);
// }

// // const requestCameraPermission = async () => {
// //   try {
// //     // console.log('Requesting camera permission...');
// //     const granted = await PermissionsAndroid.request(
// //       PermissionsAndroid.PERMISSIONS.CAMERA,
// //       {
// //         title: t(AppString.camera_permission),
// //         message: t(AppString.camera_message),
// //         buttonNeutral: t(AppString.askLater),
// //         buttonNegative: t(AppString.cancel),
// //         buttonPositive: t(AppString.ok),
// //       },
// //     );
// //     const result = granted === PermissionsAndroid.RESULTS.GRANTED;
// //     // console.log('Permission result:', result, 'Raw granted value:', granted);
// //     return result;
// //   } catch (err) {
// //     // console.error('Permission error:', err);
// //     return false;
// //   }
// // };
// // export const handleImagePicker = (setCustomImage: any) => {
// //   openImagePicker((response: {uri: any; assets: {uri: any}[]; path: any}) => {
// //     let imageUri = null;
// //     if (typeof response === 'string') {
// //       imageUri = response;
// //     } else if (response && response.uri) {
// //       imageUri = response.uri;
// //     } else if (response && response.assets && response.assets[0]) {
// //       imageUri = response.assets[0].uri;
// //     } else if (response && response.path) {
// //       imageUri = response.path;
// //     }
// //     if (imageUri) {
// //       setCustomImage(imageUri);
// //     } else {
// //       console.warn('Could not extract image URI from response');
// //     }
// //   });
// // };
// // type MediaType = 'photo' | 'video' | 'mixed';
// // const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
// // export const handleCamera = async (setCustomImage: any) => {
// //   // console.log('Starting camera permission request...');
// //   const hasPermission = await requestCameraPermission();
// //   // console.log('Camera permission result:', hasPermission);

// //   if (!hasPermission) {
// //     // console.log('Camera permission denied');
// //     Alert.alert(t(AppString.denied), t(AppString.camera_required));
// //     return;
// //   }

// //   const qualityValue = parseFloat('0.8');
// //   const options: CameraOptions = {
// //     mediaType: 'photo',
// //     includeBase64: true,
// //     saveToPhotos: false,
// //     quality: qualityValue as PhotoQuality,
// //     maxWidth: 1920,
// //     maxHeight: 1080,
// //   };
// //   launchCamera(options)
// //     .then(response => {
// //       if (response.didCancel) {
// //       } else if (response.errorCode) {
// //         Alert.alert(
// //           t(AppString.error),
// //           `Camera Error: ${response.errorMessage || t(AppString.unKnownError)}`,
// //         );
// //       } else if (response.assets && response.assets.length > 0) {
// //         const asset = response.assets[0];
// //         console.log({asset});
// //         console.log('Captured image size:', {
// //           width: asset.width,
// //           height: asset.height,
// //           fileSize: asset.fileSize,
// //           uri: asset.uri,
// //         });

// //         // Check file size
// //         if ((asset.fileSize ?? 0) > MAX_FILE_SIZE) {
// //           Alert.alert(
// //             'Image Too Large',
// //             `The image size is ${(
// //               (asset.fileSize ?? 0) /
// //               (1024 * 1024)
// //             ).toFixed(2)}MB. Maximum allowed size is 5MB.`,
// //             [{text: 'OK'}],
// //           );
// //           return;
// //         }

// //         setCustomImage(asset);
// //       }
// //     })
// //     .catch(err => {
// //       Alert.alert(t(AppString.error));
// //     });
// // };

// // interface ImagePickerOptions {
// //   mediaType: MediaType;
// //   includeBase64?: boolean;
// //   includeExtra?: boolean;
// //   maxHeight?: number;
// //   maxWidth?: number;
// //   quality?: any;
// //   selectionLimit?: number;
// //   saveToPhotos?: boolean;
// // }

// // Handle gallery selection
// // export const handleGallery = (setCustomImage: any) => {
// //   const options: ImagePickerOptions = {
// //     mediaType: 'photo',
// //     includeBase64: false,
// //     maxHeight: 1200,
// //     maxWidth: 1200,
// //     quality: 0.8,
// //     selectionLimit: 1,
// //   };

// //   launchImageLibrary(options)
// //     .then(response => {
// //       console.log('Gallery response:', response);
// //       if (response.didCancel) {
// //         console.log('User cancelled image picker');
// //       } else if (response.errorCode) {
// //         console.log(
// //           'ImagePicker Error:',
// //           response.errorCode,
// //           response.errorMessage,
// //         );
// //         Alert.alert(
// //           t(AppString.error),
// //           `Gallery Error: ${
// //             response.errorMessage || t(AppString.unKnownError)
// //           }`,
// //         );
// //       } else if (response.assets && response.assets.length > 0) {
// //         const asset = response.assets[0];
// //         console.log('Image selected:', asset);

// //         // Check file size
// //         if ((asset.fileSize ?? 0) > MAX_FILE_SIZE) {
// //           Alert.alert(
// //             'Image Too Large',
// //             `The image size is ${(
// //               (asset.fileSize ?? 0) /
// //               (1024 * 1024)
// //             ).toFixed(2)}MB. Maximum allowed size is 5MB.`,
// //             [{text: 'OK'}],
// //           );
// //           return;
// //         }

// //         setCustomImage(asset);
// //       } else {
// //         console.log('No image selected or unexpected response structure');
// //         console.log('Full response:', JSON.stringify(response));
// //       }
// //     })
// //     .catch(err => {
// //       console.log('Unexpected gallery error:', err);
// //       Alert.alert(t(AppString.error), t(AppString.unExpextedGalleryError));
// //     });
// // };

// // export const openImagePicker = (setCustomImage: any) => {
// //   Alert.alert(
// //     t(AppString.selectImage),
// //     t(AppString.chooseOption),
// //     [
// //       {
// //         text: t(AppString.takePhoto),
// //         onPress: () => {
// //           handleCamera(setCustomImage);
// //         },
// //         style: 'default',
// //       },
// //       {
// //         text: t(AppString.chooseGallery),
// //         onPress: () => {
// //           // Pass the setter functions to the helper methods
// //           handleGallery(setCustomImage);
// //         },
// //         style: 'default',
// //       },
// //       {
// //         text: t(AppString.cancel),
// //         style: 'cancel',
// //       },
// //     ],
// //     {cancelable: true},
// //   );
// // };
