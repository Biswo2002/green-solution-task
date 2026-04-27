import { StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ZORRRO_COLORS } from '../../styles';

const LinearComponent = ({ children, color1, color2 }: any) => {
  return (
    <LinearGradient
      colors={[ZORRRO_COLORS.GRADIENT_LOW, ZORRRO_COLORS.GRADIENT_LOW]}
      // start={{x: 0, y: 0}}
      // end={{x: 0, y: 10}}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

export default LinearComponent;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
