import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
} from 'react-native';
import BottomSheet from './BottomSheet';
import { WIDTH } from '~/utils';
import { ZORRRO_COLORS } from '~/styles';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setSelectGender: (selectGender: string) => void;
  selectGender: string;
};

export default function GenderPicker({
  isOpen,
  onClose,
  selectGender,
  setSelectGender,
}: Props) {
  const GENDER_DATA = [
    {
      id: 'MALE',
      title: 'Male',
      iconUri: 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png', // example male icon
    },
    {
      id: 'FEMALE',
      title: 'Female',
      iconUri: 'https://cdn-icons-png.flaticon.com/512/1077/1077113.png', // example female icon
    },
    {
      id: 'OTHER',
      title: 'Other',
      iconUri: 'https://cdn-icons-png.flaticon.com/512/947/947618.png', // example other icon
    },
  ];

  return (
    <BottomSheet
      visible={isOpen}
      onDismiss={() => {
        onClose();
      }}
    >
      <View style={{ backgroundColor: '#fff' }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Gender:</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828778.png', // example close icon
              }}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Gender Options */}
        <View style={styles.optionsContainer}>
          {GENDER_DATA.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectGender(item?.id);
                onClose();
              }}
              style={[
                styles.optionRow,
                selectGender === item?.id && styles.selectedOption,
              ]}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: item?.iconUri }}
                  style={styles.genderIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.optionText}>{item?.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: ZORRRO_COLORS.primary?.p1,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    width: 16,
    height: 16,
    tintColor: '#e11d48',
  },
  optionsContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: WIDTH / 1.1,
    padding: 12,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#c3e6cb',
  },
  iconContainer: {
    width: '20%',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  genderIcon: {
    width: 24,
    height: 24,
  },
  textContainer: {
    width: '80%',
    alignItems: 'flex-start',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
