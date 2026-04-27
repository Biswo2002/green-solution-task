// import React, { useRef, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   Pressable,
//   Platform,
//   Animated,
// } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ZorrroText } from '$/components';
// import ZORRRO_SVG from '$/assets/svg/svg';
// import { Private } from '$/screens';


// /* ================= TYPES ================= */

// export type BottomTabsTypes = {
//   Chats: undefined;
//   Channels: undefined;
//   SOS: undefined;
//   Profile: undefined;
// };

// /* ================= NAVIGATOR ================= */

// const Tab = createBottomTabNavigator<BottomTabsTypes>();

// const TabLayout = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{ headerShown: false }}
//       tabBar={(props) => <CustomTabBar {...props} />}
//     >
//       <Tab.Screen name="Chats" component={Private.ChatsScreen} />
//       <Tab.Screen name="Channels" component={Private.ChannelsScreen} />
//       <Tab.Screen name="SOS" component={Private.SosScreen} />
//       <Tab.Screen name="Profile" component={Private.ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// export default TabLayout;

// /* ================= ICON MAPPER ================= */

// const getIcon = (routeName: keyof BottomTabsTypes) => {
//   switch (routeName) {
//     case 'Chats':
//       return ZORRRO_SVG.TAB_LAYOUT.CHATS;
//     case 'Channels':
//       return ZORRRO_SVG.TAB_LAYOUT.CHANNELS;
//     case 'SOS':
//       return ZORRRO_SVG.TAB_LAYOUT.SOS;
//     case 'Profile':
//       return ZORRRO_SVG.TAB_LAYOUT.PROFILE;
//   }
// };

// /* ================= CUSTOM TAB BAR ================= */

// const CustomTabBar = ({ state, navigation }: any) => {
//   return (
//     <View style={styles.container}>
//       {state.routes.map((route: any, index: number) => {
//         const isFocused = state.index === index;

//         return (
//           <AnimatedTabItem
//             key={route.key}
//             route={route}
//             isFocused={isFocused}
//             onPress={() => navigation.navigate(route.name)}
//           />
//         );
//       })}
//     </View>
//   );
// };

// /* ================= ANIMATED TAB ITEM ================= */

// const AnimatedTabItem = ({ route, isFocused, onPress }: any) => {
//   const scale = useRef(new Animated.Value(1)).current;
//   const opacity = useRef(new Animated.Value(isFocused ? 1 : 0.7)).current;

//   const Icon = getIcon(route.name);

//   useEffect(() => {
//     Animated.parallel([
//       Animated.spring(scale, {
//         toValue: isFocused ? 1.2 : 1,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacity, {
//         toValue: isFocused ? 1 : 0.7,
//         duration: 200,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, [isFocused]);

//   return (
//     <Pressable
//       onPress={onPress}
//       android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
//       style={({ pressed }) => [
//         styles.tab,
//         Platform.OS === 'ios' && pressed && { opacity: 0.6 },
//       ]}
//     >
//       {/* ICON */}
//       <Animated.View style={{ transform: [{ scale }] }}>
//         <Icon
//           width={24}
//           height={24}
//           color={isFocused ? '#0070C0' : '#8A94A6'}
//         />
//       </Animated.View>

//       {/* LABEL */}
//       <Animated.View style={{ opacity }}>
//         <ZorrroText
//           style={[
//             styles.label,
//             { color: isFocused ? '#0070C0' : '#8A94A6' },
//           ]}
//         >
//           {route.name}
//         </ZorrroText>
//       </Animated.View>

//       {/* ACTIVE DOT */}
//       <Animated.View
//         style={[
//           styles.activeDot,
//           {
//             opacity: isFocused ? 1 : 0,
//             transform: [{ scale: isFocused ? 1 : 0.5 }],
//           },
//         ]}
//       />
//     </Pressable>
//   );
// };

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     height: 70,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#E5EAF0',
//   },

//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },

//   label: {
//     fontSize: 12,
//     marginTop: 4,
//     fontWeight: '500',
//   },

//   activeDot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#0070C0',
//     marginTop: 4,
//   },
// });


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
} from 'react-native';
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
      <Tab.Screen name="SOS" component={Private.SosScreen} />
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

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

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
    height: 3,
    backgroundColor: '#0070C0',
  },
});