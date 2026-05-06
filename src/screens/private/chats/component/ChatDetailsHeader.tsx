import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';

interface ChatDetailsHeaderProps {
    isGroup?: boolean;
    chatName?: string;
    chatInitials?: string;
    chatSubtitle?: string;
    onBackPress: () => void;
    onProfilePress: () => void;
    onMenuPress: () => void;
    styles: any;
}

const ChatDetailsHeader = ({
    isGroup,
    chatName,
    chatInitials,
    chatSubtitle,
    onBackPress,
    onProfilePress,
    onMenuPress,
    styles,
}: ChatDetailsHeaderProps) => {
    const resolvedName = chatName || (isGroup ? 'Revenue Officers - Kolkata' : 'Priya Sharma');
    const resolvedInitials = chatInitials || (isGroup ? '👥' : 'PS');
    const resolvedSubtitle = chatSubtitle || (isGroup ? '48 members' : 'Department Admin');

    return (
        <ZorrroView style={styles.header}>
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerProfile} onPress={onProfilePress}>
                <ZorrroView style={styles.avatar}>
                    <Text style={styles.avatarText}>{resolvedInitials}</Text>
                </ZorrroView>
                <ZorrroView style={styles.headerInfo}>
                    <Text style={styles.headerName} numberOfLines={2} ellipsizeMode="tail">
                        {resolvedName}
                    </Text>
                    <Text style={styles.headerSubtitle} numberOfLines={1} ellipsizeMode="tail">
                        {resolvedSubtitle}
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
