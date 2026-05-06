import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenStatusBar, ZorrroView } from '$/components';
import { ZORRRO_SVG } from '$/assets';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding.style';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '$/styles';

const MESSAGES_DATA = [
    {
        id: '1',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '2',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '3',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '4',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '5',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '3n',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '41',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '5fd',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
    {
        id: '5po',
        sender: 'Admin',
        message: 'Please share the updated figures',
        time: '9:30 AM',
    },
];

const ChannelsListening = () => {
    const navigation = useNavigation();

    const renderMessage = ({ item }: { item: typeof MESSAGES_DATA[0] }) => (
        <ZorrroView style={styles.messageBubble}>
            <ZorrroView style={styles.senderBadge}>
                <Text style={styles.senderText}>{item.sender}</Text>
            </ZorrroView>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </ZorrroView>
    );

    return (
        <ZorrroView safe style={ChatsLandingStyles.safeArea}>
            <ScreenStatusBar backgroundColor={ZORRRO_COLORS.WHITE} barStyle="dark-content" />

            {/* Header */}
            <ZorrroView style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={28} height={28} fill="#1C1B1F" />
                </TouchableOpacity>
                <ZorrroView style={styles.headerIconContainer}>
                    <ZORRRO_SVG.TAB_LAYOUT.CHANNELS_ACTIVE width={22} height={22} />
                </ZorrroView>
                <ZorrroView style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>Revenue District news</Text>
                    <ZorrroView style={styles.headerSubtitleRow}>
                        <ZorrroView style={styles.typeBadge}>
                            <Text style={styles.typeText}>District</Text>
                        </ZorrroView>
                        <Text style={styles.membersText}>48 members</Text>
                    </ZorrroView>
                </ZorrroView>
            </ZorrroView>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Messages List */}
            <FlatList
                data={MESSAGES_DATA}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>This is a broadcast channel. only admins can send messages</Text>
            </View>
        </ZorrroView>
    );
};

export default ChannelsListening;

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 16,
    },
    headerIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 20,
        backgroundColor: '#085F871A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 14,
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
        color: '#171D26',
        marginBottom: 2,
    },
    headerSubtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeBadge: {
        backgroundColor: '#EAEDF0',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    typeText: {
        fontSize: 10,
        color: '#171D26',
        fontFamily: ZORRRO_FONTS?.[700]?.normal,
    },
    membersText: {
        fontSize: 10,
        color: '#6F7D90',
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    divider: {
        height: 1,
        backgroundColor: '#DAE0E7',
    },
    listContainer: {
        padding: 16,
    },
    messageBubble: {
        backgroundColor: '#F0F2F4',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 12,
        width: '100%',
    },
    senderBadge: {
        backgroundColor: ZORRRO_COLORS?.WHITE,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    senderText: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '400',
    },
    messageText: {
        fontSize: 15,
        color: '#1F2937',
        marginBottom: 6,
        lineHeight: 22,
    },
    messageTime: {
        fontSize: 11,
        color: '#9CA3AF',
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: ZORRRO_COLORS?.WHITE,
    },
    footerText: {
        fontSize: 13,
        color: '#9CA3AF',
        textAlign: 'center',
    },
});