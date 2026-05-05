import React from 'react';
import { Animated, Modal, Text, TouchableOpacity } from 'react-native';
import { ZorrroView } from '$/components';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding';

type SosConfirmAlertProps = {
    visible: boolean;
    animationValue: Animated.Value;
    onCancel: () => void;
    onConfirm: () => void;
};

const SosConfirmAlert = ({
    visible,
    animationValue,
    onCancel,
    onConfirm,
}: SosConfirmAlertProps) => {
    return (
        <Modal visible={visible} transparent animationType="none">
            <ZorrroView style={ChatsLandingStyles.confirmOverlay}>
                <Animated.View
                    style={[
                        ChatsLandingStyles.confirmCard,
                        {
                            opacity: animationValue,
                            transform: [
                                {
                                    scale: animationValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.85, 1],
                                    }),
                                },
                                {
                                    translateY: animationValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={ChatsLandingStyles.confirmTitle}>Send SOS Alert?</Text>
                    <Text style={ChatsLandingStyles.confirmSubtitle}>
                        This will notify emergency responders with your current location.
                    </Text>
                    <ZorrroView style={ChatsLandingStyles.confirmActions}>
                        <TouchableOpacity
                            style={ChatsLandingStyles.confirmCancelButton}
                            onPress={onCancel}
                        >
                            <Text style={ChatsLandingStyles.confirmCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatsLandingStyles.confirmSendButton}
                            onPress={onConfirm}
                        >
                            <Text style={ChatsLandingStyles.confirmSendText}>Send SOS</Text>
                        </TouchableOpacity>
                    </ZorrroView>
                </Animated.View>
            </ZorrroView>
        </Modal>
    );
};

export default SosConfirmAlert;
