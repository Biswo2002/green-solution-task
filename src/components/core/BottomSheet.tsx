import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  type StyleProp,
  View,
  type ViewStyle,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
interface BottomSheetProps {
  visible: boolean;
  onDismiss: () => void;
  isClose?: boolean;
  children?: React.ReactNode;
  sheetContainerStyle?: StyleProp<ViewStyle>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  children,
  isClose,
  sheetContainerStyle,
}) => {
  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeAnim = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 500,
    useNativeDriver: true,
  });

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const handleDismiss = () => {
    closeAnim.start(() => {
      onDismiss?.();
    });
  };

  useEffect(() => {
    if (visible) {
      resetPositionAnim.start();
    }
  }, [visible]);
  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        handleDismiss();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    if (visible) {
      resetPositionAnim.start();
    }

    return () => {
      backHandler.remove();
    };
  }, [visible]);

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) panY.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (isClose && (gesture.dy > 100 || gesture.vy > 1.5)) {
          handleDismiss();
        } else {
          resetPositionAnim.start();
        }
      },
    })
  ).current;


  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}
    >
      <View style={styles.overlay}>
        {/* Tap outside to dismiss if isClose is true */}
        {isClose ? (
          <TouchableWithoutFeedback onPress={handleDismiss}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
        ) : null}

        <Animated.View
          style={[styles.container, sheetContainerStyle, { transform: [{ translateY }] }]}
          {...(isClose ? panResponders.panHandlers : {})}
        >
          <TouchableOpacity onPress={isClose ? handleDismiss : () => { }} style={styles.sliderIndicatorRow}>
            <View style={styles.sliderIndicator} />
          </TouchableOpacity>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: '40%',
    maxHeight: '90%',
    paddingTop: 12,
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sliderIndicator: {
    width: 45,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CECECE',
  },
});
