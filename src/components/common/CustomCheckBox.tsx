import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ZORRRO_COLORS } from '~/styles';
import ZorrroView from '../zorrro/ZorrroView';
import { PLAYMATE_ICONS } from '~/assets';

type CustomCheckBoxProps = {
    checked: boolean;
    onPress: () => void;
};

const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ checked, onPress }) => {
    return (
        <ZorrroView style={[styles.checkbox, {
            borderColor: checked ? ZORRRO_COLORS?.WHITE : '#8F8F8F',
        }]}>
            {checked && (
                <TouchableOpacity onPress={onPress} style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: ZORRRO_COLORS?.primary?.DEFAULT,
                    borderRadius: 4,
                }}>

                    <Image
                        source={PLAYMATE_ICONS?.screen?.CHECK}
                        style={styles.checkmark}
                    />
                </TouchableOpacity>
            )}

        </ZorrroView>
    );
};

export default CustomCheckBox;

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ZORRRO_COLORS?.WHITE,
        overflow: 'hidden',
    },
    checkmark: {
        width: 16,
        height: 13,
        // tintColor: '#000', // Set to white if needed, or leave as default
    },
});
