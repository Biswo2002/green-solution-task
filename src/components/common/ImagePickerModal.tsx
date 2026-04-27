import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';
import pickImage from '~/utils/imagePicker';

interface ImagePickerModalProps {
    visible: boolean;
    onClose: () => void;
    onImageSelected: (uri: string) => void;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
    visible,
    onClose,
    onImageSelected,
}) => {
    const handlePick = async (type: 'camera' | 'gallery') => {
        try {
            const imageUri = await pickImage(type); // Get the selected image URI
            onImageSelected(imageUri); // Pass URI back to the parent component
            onClose(); // Close the modal
        } catch (error: any) {
            console.error('Error picking image:', error.message);
        }
    };

    return (
        <Modal
            transparent
            animationType="slide"
            visible={visible}
            onRequestClose={onClose} // Handles Android back button
        >
            {/* Close modal when tapping outside */}
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                onPress={onClose}
                                style={{
                                    width: 81,
                                    height: 6,
                                    backgroundColor: '#D5D7DE',
                                    borderRadius: 12,
                                }}
                            />
                            <Text style={styles.title}>Image Upload</Text>

                            {/* Open Camera button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePick('camera')}>
                                <View
                                    style={{
                                        backgroundColor: '#2D3864',
                                        width: 42,
                                        height: 42,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 8,
                                    }}>
                                    <Image
                                        source={{
                                            uri: 'https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Camera-512.png'
                                        }} // Use a camera icon
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </View>
                                <Text style={styles.buttonText}>Open Camera</Text>
                            </TouchableOpacity>

                            {/* Open Gallery button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handlePick('gallery')}>
                                <View
                                    style={{
                                        backgroundColor: '#2D3864',
                                        width: 42,
                                        height: 42,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 8,
                                    }}>
                                    <Image
                                        source={{ uri: 'https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Photos-512.png' }}
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </View>
                                <Text style={styles.buttonText}>Open Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: 24,
    },
    button: {
        width: '100%',
        paddingHorizontal: 9,
        paddingVertical: 7,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: 5,
        borderColor: '#D5D7DE',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#21252C',
        fontSize: 16,
        marginLeft: 20,
    },
});
