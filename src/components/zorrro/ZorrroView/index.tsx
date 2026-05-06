import React, { FC } from 'react';
import {
    View,
    ViewProps,
    StyleProp,
    ViewStyle,
    Dimensions,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context'; // ✅ SafeAreaView import

type PaddingSize = 'none' | 'small' | 'medium' | 'large';

interface ZorrroViewProps extends ViewProps {
    padded?: boolean | PaddingSize | number;
    safe?: boolean; // ✅ NEW prop to enable SafeAreaView
    edges?: Edge[]; // ✅ Control which edges get safe area padding
}

const { width, height } = Dimensions.get('window');

const getResponsivePadding = (size: PaddingSize): StyleProp<ViewStyle> => {
    switch (size) {
        case 'small':
            return {
                paddingHorizontal: width * 0.03,
                paddingVertical: height * 0.015,
            };
        case 'medium':
            return {
                paddingHorizontal: width * 0.05,
                paddingVertical: height * 0.025,
            };
        case 'large':
            return {
                paddingHorizontal: width * 0.07,
                paddingVertical: height * 0.04,
            };
        case 'none':
        default:
            return {};
    }
};

const ZorrroView: FC<ZorrroViewProps> = ({ style, padded = 'none', safe = false, edges, ...props }) => {
    let paddingStyle: StyleProp<ViewStyle> = {};

    if (typeof padded === 'number') {
        paddingStyle = { padding: padded };
    } else if (typeof padded === 'boolean') {
        paddingStyle = padded ? getResponsivePadding('none') : {};
    } else {
        paddingStyle = getResponsivePadding(padded);
    }

    if (safe) {
        return <SafeAreaView edges={edges} style={[paddingStyle, style]} {...props} />;
    }

    return <View style={[paddingStyle, style]} {...props} />;
};

export default ZorrroView;
