// import React, { useEffect, useState } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   ViewStyle,
//   Animated,
//   Modal,
//   View,
//   Text,
// } from 'react-native';
// import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';

// type ToastComponentProps = {
//   title: string;
//   description: string;
//   variant: 'success' | 'error' | 'info' | 'warning';
//   action?: () => void;
//   visible: boolean;
//   onClose: () => void;
//   position?: 'top' | 'middle' | 'bottom';
// };

// const ToastComponent: React.FC<ToastComponentProps> = ({
//   title,
//   description,
//   action,
//   variant,
//   visible,
//   onClose,
//   position = 'bottom',
// }) => {
//   const [progress] = useState(new Animated.Value(1));

//   useEffect(() => {
//     if (visible) {
//       progress.setValue(1);
//       Animated.timing(progress, {
//         toValue: 0,
//         duration: 3000,
//         useNativeDriver: false,
//       }).start(() => {
//         onClose();
//       });
//     }
//   }, [visible, onClose]);

//   const getToastStyle = (variant: 'success' | 'error' | 'info' | 'warning') => {
//     switch (variant) {
//       case 'success':
//         return { backgroundColor: '#bbf7d0', borderLeftColor: '#14532d' };
//       case 'error':
//         return { backgroundColor: '#FEE2E2', borderLeftColor: '#dc2626' };
//       case 'warning':
//         return { backgroundColor: '#FEF3C7', borderLeftColor: '#F59E0B' };
//       case 'info':
//         return { backgroundColor: '#DBEAFE', borderLeftColor: '#3B82F6' };
//       default:
//         return {};
//     }
//   };
//   const getPositionStyle = (
//     position: 'top' | 'middle' | 'bottom',
//   ): ViewStyle => {
//     switch (position) {
//       case 'top':
//         return { justifyContent: 'flex-start', marginTop: 50 };
//       case 'middle':
//         return { justifyContent: 'center' };
//       case 'bottom':
//         return { justifyContent: 'flex-end', marginBottom: 50 };
//       default:
//         return {};
//     }
//   };
//   return (
//     <Modal
//       transparent
//       animationType="fade"
//       visible={visible}
//       onRequestClose={onClose}>
//       <TouchableOpacity
//         style={[styles.overlay, getPositionStyle(position)]}
//         activeOpacity={1}
//         onPress={onClose}>
//         <View style={[styles.toastContainer, getToastStyle(variant), {
//           borderColor: getToastStyle(variant)?.borderLeftColor,
//           borderRightWidth: 2,

//         }]}>
//           <View style={styles.toastHeader}>
//             <Text
//               style={[
//                 styles.toastTitle,
//                 { color: getToastStyle(variant).borderLeftColor },
//               ]}>
//               {title}
//             </Text>
//           </View>
//           <View style={styles.toastContent}>
//             <Text style={styles.toastDescription}>{description}</Text>
//           </View>
//           {action && (
//             <TouchableOpacity onPress={action} style={styles.actionButton}>
//               <Text style={styles.actionText}>Click Me</Text>
//             </TouchableOpacity>
//           )}
//           <View style={styles.progressBarContainer}>
//             <Animated.View
//               style={[
//                 styles.progressBar,
//                 {
//                   width: progress.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: ['0%', '100%'],
//                   }),
//                   backgroundColor: getToastStyle(variant).borderLeftColor,
//                 },
//               ]}
//             />
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'flex-end',
//     paddingBottom: 50,
//   },
//   toastContainer: {
//     borderRadius: 8,
//     marginHorizontal: 20,
//     paddingHorizontal: 10,
//     borderLeftWidth: 2,
//     // borderBottomWidth: 4,
//     overflow: 'hidden',
//     elevation: 5,
//     paddingVertical: 5
//   },
//   toastHeader: {
//     paddingBottom: 5,
//   },
//   toastTitle: {
//     fontSize: 14,
//     fontFamily: ZORRRO_FONTS?.[600]?.normal,
//   },
//   toastContent: {
//     paddingBottom: 10,
//   },
//   toastDescription: {
//     fontSize: 12,
//     color: ZORRRO_COLORS?.BLACK,
//     fontFamily: ZORRRO_FONTS?.[500]?.normal,
//     lineHeight: 16,
//   },
//   actionButton: {
//     marginTop: 10,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     backgroundColor: 'white',
//     borderRadius: 4,
//   },
//   actionText: {
//     color: 'black',
//     fontFamily: ZORRRO_FONTS?.[600]?.normal,
//   },
//   progressBarContainer: {
//     height: 3,
//     width: '100%',
//     backgroundColor: '#E5E7EB',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: 'green',
//   },
// });

// export default ToastComponent;

import { ZORRRO_ICONS } from '$/assets';
import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  Dimensions,
  Platform,
  AccessibilityInfo,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export type ToastComponentProps = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  visible: boolean;
  onClose: () => void;
  position?: 'top' | 'middle' | 'bottom';
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
};

const ToastComponent: React.FC<ToastComponentProps> = ({
  title,
  description,
  variant = 'info',
  visible,
  onClose,
  position = 'top',
  duration = 3000,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const [countdown, setCountdown] = useState(Math.floor(duration / 1000));

  const toastStyle = useMemo(() => getToastStyle(variant), [variant]);
  const iconSource = useMemo(() => getIconSource(variant), [variant]);

  const handleClose = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  }, [opacity, translateY, onClose]);

  useEffect(() => {
    if (visible) {
      setCountdown(Math.floor(duration / 1000));
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      AccessibilityInfo.announceForAccessibility(title);

      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            // Defer handleClose to avoid updating parent component during render
            setTimeout(() => {
              handleClose();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [visible, duration, handleClose]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 30) handleClose();
      },
    }),
  ).current;

  if (!visible) return null;

  return (
    <View
      style={[styles.wrapper, getPositionStyle(position)]}
      pointerEvents="box-none"
      accessibilityRole="alert"
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.toast,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        {/* Minimal gradient background */}
        <LinearGradient
          colors={toastStyle.gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBackground}
        />

        {/* Left vertical accent bar */}
        <View
          style={[
            styles.accentBar,
            { backgroundColor: toastStyle.accentColor },
          ]}
        />

        {/* Icon image */}
        <Image
          source={iconSource}
          style={styles.iconImage}
          resizeMode="contain"
        />

        {/* Content */}
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>
          {!!description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>

        {/* Close button */}
        <TouchableOpacity
          onPress={handleClose}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const getIconSource = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return ZORRRO_ICONS.Toast.SUCCESS;
    case 'error':
      return ZORRRO_ICONS.Toast.ERROR;
    case 'warning':
      return ZORRRO_ICONS.Toast.WARNING;
    case 'info':
    default:
      return ZORRRO_ICONS.Toast.INFO;
  }
};

const getToastStyle = (variant: ToastVariant) => {
  switch (variant) {
    case 'success':
      return {
        accentColor: '#10B981', // Bright green
        gradientColors: ['#FFFFFF', '#F0FDF4'], // White to very light green
      };
    case 'error':
      return {
        accentColor: '#EF4444', // Red
        gradientColors: ['#FFFFFF', '#FEF2F2'], // White to very light red
      };
    case 'warning':
      return {
        accentColor: '#F59E0B', // Yellow/Amber
        gradientColors: ['#FFFFFF', '#FFFBEB'], // White to very light yellow
      };
    case 'info':
    default:
      return {
        accentColor: '#3B82F6', // Blue
        gradientColors: ['#FFFFFF', '#EFF6FF'], // White to very light blue
      };
  }
};

const getPositionStyle = (position: 'top' | 'middle' | 'bottom'): ViewStyle => {
  switch (position) {
    case 'top':
    default:
      return {
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'ios' ? 80 : 50,
      };
    case 'middle':
      return { justifyContent: 'center' };
    case 'bottom':
      return { justifyContent: 'flex-end', paddingBottom: 60 };
  }
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    maxWidth: SCREEN_WIDTH - 40,
    position: 'relative',
    minHeight: 64,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 5,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  iconImage: {
    width: 36,
    height: 36,
    marginLeft: 16,
    marginRight: 12,
  },
  contentWrapper: {
    flex: 1,
    paddingRight: 40,
    paddingVertical: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: ZORRRO_FONTS?.[700]?.normal,
    color: ZORRRO_COLORS.primary.p2,
    marginBottom: 3,
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    fontFamily: ZORRRO_FONTS?.[400]?.normal,
    color: ZORRRO_COLORS.primary.p3,
    lineHeight: 18,
    marginTop: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 18,
    fontFamily: ZORRRO_FONTS?.[400]?.normal,
    color: ZORRRO_COLORS.primary.p3,
    lineHeight: 18,
  },
});

export default ToastComponent;
