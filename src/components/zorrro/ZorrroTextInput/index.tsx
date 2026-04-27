import React, { FC, ReactNode } from 'react';
import {
    TextInput,
    TextInputProps,
    StyleSheet,
    View,
    Text,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors } from '~/styles/themes/colors';
import { rf } from '~/utils/responsive';

interface ZorrroTextInputProps extends TextInputProps {
    label?: string;
    left?: ReactNode;
    right?: ReactNode;
    error?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    labelStyle?: TextStyle; // ✅ NEW
}

const ZorrroTextInput: FC<ZorrroTextInputProps> = ({
    label,
    left,
    right,
    error,
    style,
    containerStyle,
    inputStyle,
    labelStyle,
    ...props
}) => {
    return (
        <View style={[styles.wrapper, containerStyle]}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}


            <View style={[styles.inputContainer, error && { borderColor: colors.danger }]}>
                {left && <View style={styles.icon}>{left}</View>}

                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholderTextColor={colors.secondary}
                    {...props}
                />
                {right && <View style={styles.icon}>{right}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginVertical: 8,
    },
    label: {
        fontSize: rf(1.8),
        color: colors.black,
        marginBottom: 6,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        // borderColor: colors.secondary,
        borderRadius: 8,
        backgroundColor: colors.white,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        fontSize: rf(2),
        paddingVertical: 10,
        color: colors.black,
    },
    icon: {
        marginHorizontal: 4,
    },
    errorText: {
        color: colors.danger,
        fontSize: rf(1.5),
        marginTop: 4,
    },
});

export default ZorrroTextInput;
