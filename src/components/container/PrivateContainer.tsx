
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { PLAYMATE_ICONS } from '~/assets';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';
import ScreenStatusBar from '../common/ScreenStatusBar';

type IconProps = {
  icon?: ImageSourcePropType;
  iconColor?: string;
  onPress?: () => void;
  side: 'LEFT' | 'RIGHT';
};

type Props = {
  title?: string;
  color?: string;
  image?: ImageSourcePropType;
  hasBackIcon?: boolean;
  icons?: IconProps[];
  notificationDot?: boolean;
  showBars?: boolean;
  _titleProps?: any;
  font?: number;
  bg?: string;
  topPadding?: number;
  softShadow?: boolean;
  containerPadding?: number;
  STATUSBAR_COLOR?: string;
  isDarkMode?: boolean;
  BAR_STYLE?: 'light-content' | 'dark-content';
} & ViewProps;

const PrivateContainer: React.FC<Props> = ({
  children,
  color,
  hasBackIcon,
  title,
  icons = [],
  showBars,
  bg,
  font,
  softShadow,
  notificationDot,
  topPadding,
  containerPadding,
  STATUSBAR_COLOR,
  isDarkMode,
  BAR_STYLE = 'dark-content',
  style,
  ...viewProps
}) => {
  const navigation = useNavigation();
  const leftIcon = icons.find(icon => icon.side === 'LEFT');
  const rightIcons = icons.filter(icon => icon.side === 'RIGHT');

  const handleBack = () => {
    if (leftIcon?.onPress) {
      leftIcon.onPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: bg || ZORRRO_COLORS.WHITE, paddingHorizontal: containerPadding ?? 16 },
      ]}
    >
      {STATUSBAR_COLOR && (
        <ScreenStatusBar backgroundColor={STATUSBAR_COLOR} barStyle={BAR_STYLE} />
      )}

      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: color || bg || ZORRRO_COLORS.WHITE,
            paddingHorizontal: topPadding ?? 6,
          },
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.leftStack}>
            {hasBackIcon && (
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Image
                  source={PLAYMATE_ICONS?.icons?.LEFT_ARROW}
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 16,
                    tintColor: isDarkMode ? '#ccc' : '#03053D',
                  }}
                />
              </TouchableOpacity>
            )}

            {showBars && (
              <TouchableOpacity style={styles.menuButton} onPress={leftIcon?.onPress}>
                <Image
                  source={PLAYMATE_ICONS?.tabLayout?.QUick_ACCESS}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}

            {title && (
              <Text
                style={[
                  styles.title,
                  {
                    color: isDarkMode ? '#ccc' : ZORRRO_COLORS.BLACK,
                    fontSize: font || 17,
                  },
                ]}
              >
                {title}
              </Text>
            )}
          </View>

          <View style={styles.rightStack}>
            {rightIcons.map((iconProps, index) => (
              <TouchableOpacity
                key={`${iconProps.side}-${index}`}
                onPress={iconProps.onPress}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: isDarkMode ? '#444' : '#fff',
                    ...(softShadow ? styles.shadow : null),
                  },
                ]}
              >
                {notificationDot ? (
                  <Image
                    source={PLAYMATE_ICONS?.screen?.BELL}
                    resizeMode="contain"
                    style={styles.notificationIcon}
                  />
                ) : (
                  iconProps.icon && (
                    <Image
                      source={iconProps.icon}
                      resizeMode="contain"
                      style={[
                        styles.actionIcon,
                        { tintColor: iconProps.iconColor || '#6b7280' },
                      ]}
                    />
                  )
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={[styles.body, style]} {...viewProps}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default PrivateContainer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 6,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 36,
    width: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  menuButton: {
    height: 36,
    width: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  menuIcon: {
    width: 22,
    height: 22,
  },
  title: {
    fontFamily: ZORRRO_FONTS?.[500]?.normal,
    textAlign: 'center',
  },
  actionButton: {
    height: 38,
    width: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 24,
  },
  actionIcon: {
    width: 22,
    height: 22,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  body: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});