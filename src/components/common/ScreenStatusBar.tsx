import React from 'react';
import { Platform, StatusBar, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ZorrroView from '../zorrro/ZorrroView';

type ScreenStatusBarProps = {
  backgroundColor: string;
  barStyle?: StatusBarStyle;
  /** When true, no iOS top overlay (content draws under status bar). Default false. */
  translucent?: boolean;
};

const ScreenStatusBar: React.FC<ScreenStatusBarProps> = ({
  backgroundColor,
  barStyle = 'dark-content',
  translucent = false,
}) => {
  const insets = useSafeAreaInsets();
  const showIosOverlay =
    Platform.OS === 'ios' && !translucent && backgroundColor !== 'transparent';

  return (
    <>
      {showIosOverlay && (
        <ZorrroView
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor,
            zIndex: 999,
          }}
        />
      )}
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={barStyle}
        translucent={translucent}
      />
    </>
  );
};

export default ScreenStatusBar;
