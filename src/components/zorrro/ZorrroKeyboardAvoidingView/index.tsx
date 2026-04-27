import React, { FC, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ViewStyle } from 'react-native';

interface ZorrroKeyboardAvoidingViewProps {
    children: ReactNode;
    style?: ViewStyle;
    behavior?: 'height' | 'position' | 'padding';
}

const ZorrroKeyboardAvoidingView: FC<ZorrroKeyboardAvoidingViewProps> = ({
    children,
    style,
    behavior = Platform.OS === 'ios' ? 'padding' : undefined,
}) => {
    return (
        <KeyboardAvoidingView style={[styles.container, style]} behavior={behavior}>
            {children}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ZorrroKeyboardAvoidingView;