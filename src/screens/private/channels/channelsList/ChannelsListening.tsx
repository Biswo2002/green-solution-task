import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ZORRRO_SVG } from '../../../../assets';
import { ZorrroView } from '$/components';

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
];

const ChannelsListening = () => {
    const navigation = useNavigation();

    const renderMessage = ({ item }: { item: typeof MESSAGES_DATA[0] }) => (
        <View style={styles.messageBubble}>
            <View style={styles.senderBadge}>
                <Text style={styles.senderText}>{item.sender}</Text>
            </View>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
        </View>
    );

    return (
        <ZorrroView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} fill="#111827" />
                </TouchableOpacity>
                <View style={styles.headerIconContainer}>
                    <ZORRRO_SVG.TAB_LAYOUT.CHANNELS width={20} height={20} fill="#0084C8" />
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>Revenue District news</Text>
                    <View style={styles.headerSubtitleRow}>
                        <View style={styles.typeBadge}>
                            <Text style={styles.typeText}>District</Text>
                        </View>
                        <Text style={styles.membersText}>48 members</Text>
                    </View>
                </View>
            </View>

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
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    headerIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E5F1FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 2,
    },
    headerSubtitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    typeBadge: {
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    typeText: {
        fontSize: 10,
        color: '#111827',
        fontWeight: '600',
    },
    membersText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    listContainer: {
        padding: 16,
    },
    messageBubble: {
        backgroundColor: '#F4F5F7',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        width: '100%',
    },
    senderBadge: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    senderText: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '400',
    },
    messageText: {
        fontSize: 15,
        color: '#111827',
        marginBottom: 4,
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
        backgroundColor: '#FFFFFF',
    },
    footerText: {
        fontSize: 13,
        color: '#9CA3AF',
        textAlign: 'center',
    },
});