import React, { FC, ReactNode } from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import { layout } from '~/styles/themes/layout';


interface ZorrroSafeAreaViewProps {
    children: ReactNode;
    style?: ViewStyle;
    padded?: boolean;
}

const ZorrroSafeAreaView: FC<ZorrroSafeAreaViewProps> = ({ children, style, padded = true }) => {
    return <SafeAreaView style={[styles.container, padded && layout.padded, style]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ZorrroSafeAreaView;