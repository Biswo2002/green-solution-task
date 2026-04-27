import React from 'react';
import { TextInput, Image, View, TextInputProps, StyleSheet, ImageSourcePropType } from 'react-native';
import { ZORRRO_FONTS } from '~/styles';

interface LabeledInputProps extends TextInputProps {
    placeholder: string;
    icon?: ImageSourcePropType;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ placeholder, icon, placeholderTextColor, style, ...props }) => {
    const placeholderColor = placeholderTextColor || '#9CA3AF';
    return (
        <View style={styles.inputContainer}>
            {icon && (
                <Image
                    source={icon}
                    style={styles.inputIcon}
                    resizeMode="contain"
                />
            )}
            <TextInput
                placeholder={placeholder}
                style={[styles.input, style]}
                placeholderTextColor={placeholderColor}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F3F7',
        borderRadius: 8,
        height: 44,
        paddingHorizontal: 16,
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 14,
    },
    input: {
        flex: 1,
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
        fontSize: 15,
        backgroundColor: 'transparent',
        padding: 0,
    },
});

export default LabeledInput;
