import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';

type Gender = 'Male' | 'Female' | 'Others';

interface GenderSelectorProps {
    selectedGender: Gender;
    onSelectGender: (gender: Gender) => void;
}

const GenderSelector: FC<GenderSelectorProps> = ({ selectedGender, onSelectGender }) => {
    const genders: Gender[] = ['Male', 'Female', 'Others'];

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Choose Gender</Text>
            <View style={styles.radioGroup}>
                {genders.map((gender) => (
                    <TouchableOpacity
                        key={gender}
                        style={styles.radioButton}
                        onPress={() => onSelectGender(gender)}
                    >
                        <View style={styles.outerCircle}>
                            {selectedGender === gender && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.genderText}>{gender}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    label: {
        fontSize: 15,
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
        color: ZORRRO_COLORS?.primary?.p2,
        marginBottom: 15,

    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#2e2e3a',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#1a1a3c',
    },
    genderText: {
        fontSize: 16,
        color: '#2e2e3a',
    },
});

export default GenderSelector;
