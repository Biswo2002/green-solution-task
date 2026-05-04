import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  Animated,
  Dimensions,
  NativeModules,
  Vibration,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ZorrroText } from '$/components';
import ZORRRO_SVG from '$/assets/svg/svg';
import { Private } from '$/screens';

const { width } = Dimensions.get('window');
const { ZorrroHaptics } = NativeModules;

/* ================= HAPTIC ================= */

const PATTERNS = {
  light: [0, 20],
  medium: [0, 40],
  heavy: [0, 60],
  selection: [0, 10],
  success: [0, 20, 80, 40],
  warning: [0, 40, 80, 40],
  error: [0, 40, 80, 40, 80, 40],
};

type HapticType = keyof typeof PATTERNS;

const triggerHaptic = (type: HapticType = 'selection') => {
  if (ZorrroHaptics) {
    ZorrroHaptics.trigger(type);
  } else {
    Vibration.vibrate(PATTERNS[type]);
  }
};

/* ================= TYPES ================= */

export type BottomTabsTypes = {
  Chats: undefined;
  Channels: undefined;
  SOS: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsTypes>();

/* ================= MAIN ================= */

const TabLayout = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Chats" component={Private.ChatsScreen} />
      <Tab.Screen name="Channels" component={Private.ChannelsScreen} />
      <Tab.Screen name="SOS" component={Private.SosLanding} />
      <Tab.Screen name="Profile" component={Private.ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabLayout;

/* ================= ICON ================= */

const getIcon = (routeName: keyof BottomTabsTypes) => {
  switch (routeName) {
    case 'Chats':
      return ZORRRO_SVG.TAB_LAYOUT.CHATS;
    case 'Channels':
      return ZORRRO_SVG.TAB_LAYOUT.CHANNELS;
    case 'SOS':
      return ZORRRO_SVG.TAB_LAYOUT.SOS;
    case 'Profile':
      return ZORRRO_SVG.TAB_LAYOUT.PROFILE;
  }
};

/* ================= TAB BAR ================= */

const CustomTabBar = ({ state, navigation }: any) => {
  const tabWidth = width / state.routes.length;
  const translateX = useRef(new Animated.Value(0)).current;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* 🔵 Sliding Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            width: tabWidth,
            transform: [{ translateX }],
          },
        ]}
      />

      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        return (
          <AnimatedTabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={() => {
              triggerHaptic('selection'); // 🔥 YOUR HAPTIC
              navigation.navigate(route.name);
            }}
          />
        );
      })}
    </View>
  );
};

/* ================= TAB ITEM ================= */

const AnimatedTabItem = ({ route, isFocused, onPress }: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  const Icon = getIcon(route.name);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: isFocused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      style={({ pressed }) => [
        styles.tab,
        Platform.OS === 'ios' && pressed && { opacity: 0.6 },
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon
          width={24}
          height={24}
          color={isFocused ? '#0070C0' : '#8A94A6'}
        />
      </Animated.View>

      <ZorrroText
        style={[
          styles.label,
          { color: isFocused ? '#0070C0' : '#8A94A6' },
        ]}
      >
        {route.name}
      </ZorrroText>
    </Pressable>
  );
};

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF0',
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },

  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },

  indicator: {
    position: 'absolute',
    top: 0,
    height: 1.5,
    backgroundColor: '#0070C0',
  },
});