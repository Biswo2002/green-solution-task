import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ViewStyle,
  requireNativeComponent,
} from 'react-native';

type BackdropBlurProps = {
  blurAmount?: number;
  blurType?: 'light' | 'dark';
  style?: ViewStyle;
  /**
   * When true (default), the blur layer fills its parent using absolute positioning.
   * Set false for glass panels: pass `style={StyleSheet.absoluteFillObject}` (or explicit size)
   * inside a parent with fixed dimensions and `overflow: 'hidden'`.
   */
  absoluteFill?: boolean;
};

// Native view manager name (registered on each platform)
let NativeBackdropBlur: any = null;
try {
  NativeBackdropBlur = requireNativeComponent<any>('BackdropBlurView');
} catch {
  NativeBackdropBlur = null;
}

const BackdropBlur: React.FC<BackdropBlurProps> = ({
  blurAmount = 20,
  blurType = 'light',
  style,
  absoluteFill = true,
}) => {
  if (!NativeBackdropBlur) {
    // iOS native manager not available; fallback to dim overlay.
    const alpha =
      blurType === 'light'
        ? Math.min(0.55, Math.max(0.18, blurAmount / 55))
        : Math.min(0.65, Math.max(0.22, blurAmount / 50));

    return (
      <View
        pointerEvents="none"
        style={[
          absoluteFill ? StyleSheet.absoluteFill : null,
          { backgroundColor: `rgba(0,0,0,${alpha})` },
          style,
        ]}
      />
    );
  }

  return (
    <NativeBackdropBlur
      pointerEvents="none"
      // eslint-disable-next-line react-native/no-inline-styles
      style={absoluteFill ? [StyleSheet.absoluteFill, style] : style}
      blurAmount={blurAmount}
      blurType={blurType}
    />
  );
};

export default BackdropBlur;

