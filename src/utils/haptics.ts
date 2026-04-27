import { NativeModules, Platform, Vibration } from 'react-native';

const { ZorrroHaptics } = NativeModules;

const PATTERNS = {
  light: [0, 20],
  medium: [0, 40],
  heavy: [0, 60],
  selection: [0, 10],
  success: [0, 20, 80, 40],
  warning: [0, 40, 80, 40],
  error: [0, 40, 80, 40, 80, 40],
};

export type HapticType = keyof typeof PATTERNS;

/**
 * Triggers a custom haptic feedback.
 * Uses native Android module if available, otherwise falls back to RN's Vibration API for iOS.
 */
export const triggerHaptic = (type: HapticType = 'selection') => {
  if (ZorrroHaptics) {
    // Custom native module for Android and iOS
    ZorrroHaptics.trigger(type);
  } else {
    // Fallback using React Native's Vibration API
    Vibration.vibrate(PATTERNS[type]);
  }
};
