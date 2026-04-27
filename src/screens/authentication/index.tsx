import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
const Box: React.FC<{ title: string }> = ({ title }) => (
  <View style={s.box}>
    <Text style={s.t}>{title}</Text>
  </View>
);

export const RegistrationScreen: React.FC = () => (
  <Box title="Registration" />
);
export const JoinPlaymateScreen: React.FC = () => <Box title="Join playmate" />;

const s = StyleSheet.create({
  box: { flex: 1, justifyContent: 'center', padding: 16 },
  t: { textAlign: 'center', fontSize: 18 },
});
