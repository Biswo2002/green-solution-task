import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding.style';

type SosFabProps = {
    onPress: () => void;
};

const SosFab = ({ onPress }: SosFabProps) => {
    return (
        <TouchableOpacity
            style={ChatsLandingStyles.fabButton}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <View style={ChatsLandingStyles.fabGlowOuter} />
            <View style={ChatsLandingStyles.fabGlowInner} />
            <LinearGradient
                colors={['#F62800', '#C11F00']}
                useAngle
                angle={180}
                angleCenter={{ x: 0.5, y: 0.5 }}
                style={ChatsLandingStyles.fabGradient}
            >
                <Text style={ChatsLandingStyles.fabText}>SOS</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default SosFab;
