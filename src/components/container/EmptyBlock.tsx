import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageSourcePropType,
    ViewStyle,
    TextStyle,
    ImageStyle,
} from 'react-native';

interface EmptyBlockProps {
    message: string;
    imageUrl?: ImageSourcePropType | { uri: string };
    style?: ViewStyle;        // for container
    textStyle?: TextStyle;    // for message text
    imageStyle?: ImageStyle;  // ✅ new prop for image customization
}

const EmptyBlock: React.FC<EmptyBlockProps> = ({ message, imageUrl, style, textStyle, imageStyle }) => {
    return (
        <View style={[styles.container, style]}>
            {imageUrl && (
                <Image
                    source={imageUrl}
                    resizeMode="contain"
                    style={[styles.image, imageStyle]}
                />
            )}
            <Text style={[styles.text, textStyle]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    text: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
        maxWidth: 220,
        lineHeight: 20,
    },
});

export default EmptyBlock;
