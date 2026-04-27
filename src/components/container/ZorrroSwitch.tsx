import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';

// Define the props for the switch component
interface ZorrroSwitchProps {
  isEnabled: boolean;
  toggleSwitch: () => void;
  trackStyle?: object; // Optional custom style for the track
  thumbStyle?: object; // Optional custom style for the thumb
}

const ZorrroSwitch: FC<ZorrroSwitchProps> = ({
  isEnabled,
  toggleSwitch,
  trackStyle,
  thumbStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.customSwitchContainer, {alignItems: 'center'}]}
      onPress={toggleSwitch}>
      <View
        style={[
          styles.customSwitchTrack,
          isEnabled && styles.customSwitchTrackActive,
          trackStyle,
        ]}>
        <View
          style={[
            styles.customSwitchThumb,
            isEnabled && styles.customSwitchThumbActive,
            thumbStyle,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ZorrroSwitch;

const styles = StyleSheet.create({
  customSwitchContainer: {
    width: 70,
    height: 36,
    borderRadius: 19,
    backgroundColor: '#767577',
    marginRight: 15,
  },
  customSwitchTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
    backgroundColor: '#767577',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  customSwitchTrackActive: {
    backgroundColor: '#07D7A1', // Active color (green)
  },
  customSwitchThumb: {
    width: 28,
    height: 28,
    borderRadius: 15,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
  },
  customSwitchThumbActive: {
    alignSelf: 'flex-end',
    padding: 0,
  },
});
