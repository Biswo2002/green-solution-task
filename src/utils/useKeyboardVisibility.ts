import {useEffect, useState, useRef} from 'react';
import {Keyboard, Animated} from 'react-native';

/**
 * Custom hook to manage keyboard visibility and animate UI changes.
 * @returns {object} - Returns `keyboardVisible` state and `fadeAnim` animation value.
 */
const useKeyboardVisibility = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 0, // Hide the button
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(fadeAnim, {
          toValue: 1, // Show the button
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {keyboardVisible, fadeAnim};
};

export default useKeyboardVisibility;
