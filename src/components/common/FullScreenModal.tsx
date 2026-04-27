import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
} from 'react-native';
import { ZORRRO_FONTS } from '~/styles';

const { width, height } = Dimensions.get('window');

interface FullScreenModalProps {
    showModal: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
    showModal,
    onClose,
    title,
    children,
}) => {
    const slideAnim = React.useRef(new Animated.Value(height)).current;

    React.useEffect(() => {
        if (showModal) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [showModal, slideAnim]);

    return (
        <Modal
            transparent
            visible={showModal}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View
                    style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/512/93/93634.png', // example arrow-left icon
                                }}
                                style={styles.arrowIcon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={styles.title}>{title || 'Modal Title'}</Text>
                    </View>
                    <View style={styles.content}>{children}</View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'white',
        width: width,
        height: height,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 32,
    },
    arrowIcon: {
        width: 20,
        height: 20,
        tintColor: '#03053D', // optional to match brand color
    },
    title: {
        fontSize: 16,
        color: '#000000',
        fontFamily: ZORRRO_FONTS[400].normal,
        marginLeft: 98,
    },
    content: {
        flex: 1,
    },
});

export default FullScreenModal;
