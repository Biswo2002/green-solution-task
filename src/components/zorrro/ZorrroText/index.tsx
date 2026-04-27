import React, { FC } from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { ZORRRO_FONTS } from '~/styles';
import { colors } from '~/styles/themes/colors';
import { rf } from '~/utils/responsive';


interface ZorrroTextProps extends TextProps {
    variant?: 'heading' | 'body' | 'caption';
    color?: keyof typeof colors;
}

const ZorrroText: FC<ZorrroTextProps> = ({ variant = 'body', color = 'black', style, ...props }) => {
    return <Text style={[styles[variant], { color: colors[color] }, style]} {...props} />;
};

const styles = StyleSheet.create<Record<'heading' | 'body' | 'caption', TextStyle>>({
    heading: {
        fontSize: rf(3),
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
    },
    body: {
        fontSize: rf(2),
    },
    caption: {
        fontSize: rf(1.5),
        color: '#666',
    },
});

export default ZorrroText;