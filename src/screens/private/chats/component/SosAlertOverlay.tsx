import React from 'react';
import { Animated, Modal, Text, TouchableOpacity } from 'react-native';
import { ZorrroView } from '$/components';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding';

type SosAlertOverlayProps = {
    visible: boolean;
    rippleAnim: Animated.Value;
    onCancel: () => void;
};

const SosAlertOverlay = ({ visible, rippleAnim, onCancel }: SosAlertOverlayProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <ZorrroView style={ChatsLandingStyles.overlayContainer}>
                <ZorrroView style={ChatsLandingStyles.rippleContainer}>
                    <Animated.View
                        style={[
                            ChatsLandingStyles.ripple,
                            {
                                transform: [
                                    {
                                        scale: rippleAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 2.5],
                                        }),
                                    },
                                ],
                                opacity: rippleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.6, 0],
                                }),
                            },
                        ]}
                    />
                    <Animated.View
                        style={[
                            ChatsLandingStyles.ripple,
                            {
                                transform: [
                                    {
                                        scale: rippleAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [1, 1.8],
                                        }),
                                    },
                                ],
                                opacity: rippleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 0],
                                }),
                            },
                        ]}
                    />
                    <ZorrroView style={ChatsLandingStyles.overlaySosButton}>
                        <Text style={ChatsLandingStyles.overlaySosText}>SOS</Text>
                    </ZorrroView>
                </ZorrroView>

                <Text style={ChatsLandingStyles.overlayTitle}>Sending Emergency Alert...</Text>
                <Text style={ChatsLandingStyles.overlaySubtitle}>
                    Your location and Details are being Shared{'\n'}with the nearest control room.
                </Text>

                <TouchableOpacity style={ChatsLandingStyles.cancelButton} onPress={onCancel}>
                    <Text style={ChatsLandingStyles.cancelButtonText}>cancel</Text>
                </TouchableOpacity>
            </ZorrroView>
        </Modal>
    );
};

export default SosAlertOverlay;
