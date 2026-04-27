import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type ToastComponentProps = {
    title: string;
    description: string;
    variant: 'success' | 'error' | 'info'; // You can add more variants as needed
    action: () => void;
    visible: boolean;
    onClose: () => void;
};

const ToastComponent: React.FC<ToastComponentProps> = ({
    title,
    description,
    action,
    variant,
    visible,
    onClose,
}: ToastComponentProps) => {
    const getToastStyle = (variant: 'success' | 'error' | 'info') => {
        switch (variant) {
            case 'success':
                return { backgroundColor: 'green' };
            case 'error':
                return { backgroundColor: 'red' };
            case 'info':
                return { backgroundColor: 'blue' };
            default:
                return {};
        }
    };

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.toastContainer, getToastStyle(variant)]}>
                    <View style={styles.toastContent}>
                        <Text style={styles.toastTitle}>{title}</Text>
                        <Text style={styles.toastDescription}>{description}</Text>
                    </View>
                    {action && (
                        <TouchableOpacity onPress={action} style={styles.actionButton}>
                            <Text style={styles.actionText}>Action</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    toastContainer: {
        width: '80%',
        padding: 16,
        borderRadius: 8,
        margin: 20,
    },
    toastContent: {
        marginBottom: 10,
    },
    toastTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    toastDescription: {
        fontSize: 14,
        color: 'white',
    },
    actionButton: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 4,
    },
    actionText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default ToastComponent;
