import React from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (c: { dialCode: string; name: string; code: string }) => void;
};

/** Placeholder — replace with a real country picker when localizing auth. */
const CountryPicker: React.FC<Props> = ({ visible, onClose, onSelect }) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onClose}
  >
    <TouchableOpacity
      style={s.back}
      onPress={onClose}
      activeOpacity={1}
    >
      <View style={s.box} accessibilityLabel="country-picker-placeholder">
        <TouchableOpacity
          onPress={() => {
            onSelect({ dialCode: '+91', name: 'India', code: 'IN' });
            onClose();
          }}
        >
          <Text style={s.t}>India +91 (stub)</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const s = StyleSheet.create({
  back: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'flex-end' },
  box: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#fff' },
  t: { fontSize: 16, padding: 12 },
});

export default CountryPicker;
