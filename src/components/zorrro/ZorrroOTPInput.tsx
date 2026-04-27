import React, { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '~/styles';

interface ZorrroOTPInputProps {
    value: string;
    onChange: (val: string) => void;
    length?: number;
    InputStyle?: object;
}

const ZorrroOTPInput: React.FC<ZorrroOTPInputProps> = ({
    value,
    onChange,
    length = 6,
    InputStyle = {},
}) => {
    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        if (!/^\d*$/.test(text)) return;

        const valueArray = value.split('');
        valueArray[index] = text;
        const updatedValue = valueArray.join('').slice(0, length);
        onChange(updatedValue);

        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && value[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {Array.from({ length }).map((_, i) => (
                <TextInput
                    key={i}
                    ref={ref => { inputRefs.current[i] = ref; }}
                    value={value[i] || ''}
                    onChangeText={text => handleChange(text, i)}
                    onKeyPress={e => handleKeyPress(e, i)}
                    keyboardType="numeric"
                    maxLength={1}
                    style={[
                        styles.inputBox,
                        value[i] ? styles.active : styles.inactive,
                        InputStyle
                    ]}
                />
            ))}
        </View>
    );
};

export default ZorrroOTPInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    inputBox: {
        width: 50,
        height: 55,
        borderWidth: 1.5,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
        color: ZORRRO_COLORS?.primary?.p2,
    },
    active: {
        borderColor: '#0050FF',
    },
    inactive: {
        borderColor: '#D1D5DB',
    },
});
