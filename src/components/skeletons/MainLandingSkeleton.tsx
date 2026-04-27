import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ZORRRO_COLORS } from '~/styles';

const MainLandingSkeleton: React.FC = () => (
  <View style={styles.box}>
    <ActivityIndicator
      size="large"
      color={ZORRRO_COLORS?.primary?.DEFAULT}
    />
  </View>
);

const styles = StyleSheet.create({
  box: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default MainLandingSkeleton;
