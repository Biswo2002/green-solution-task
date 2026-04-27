import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const scale = width / 375;
const verticalScale = height / 812;

export const rf = (size: number) =>
  PixelRatio.roundToNearestPixel(size * scale);
export const vs = (size: number) => Math.round(size * verticalScale);

export const isPad = Platform.OS === 'ios' && Platform.isPad;
