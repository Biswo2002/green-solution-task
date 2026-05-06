import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';

interface ChatDetailsHeaderProps {
    isGroup?: boolean;
    onBackPress: () => void;
    onProfilePress: () => void;
    onMenuPress: () => void;
    styles: any;
}

const ChatDetailsHeader = ({
    isGroup,
    onBackPress,
    onProfilePress,
    onMenuPress,
    styles,
}: ChatDetailsHeaderProps) => {
    return (
        <ZorrroView style={styles.header}>
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerProfile} onPress={onProfilePress}>
                <ZorrroView style={styles.avatar}>
                    <Text style={styles.avatarText}>{isGroup ? '👥' : 'PS'}</Text>
                </ZorrroView>
                <ZorrroView style={styles.headerInfo}>
                    <Text style={styles.headerName}>
                        {isGroup ? 'Revenue Officers - Kolkata' : 'Priya Sharma'}
                    </Text>
                    <Text style={styles.headerSubtitle}>
                        {isGroup ? '48 members' : 'Department Admin'}
                    </Text>
                </ZorrroView>
            </TouchableOpacity>
            <TouchableOpacity onPress={onMenuPress} style={styles.moreButton}>
                <Text style={styles.moreIcon}>⋮</Text>
            </TouchableOpacity>
        </ZorrroView>
    );
};

export default ChatDetailsHeader;
