import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { ZORRRO_SVG } from '../../../assets';

const CHANNELS_DATA = [
    {
        id: '1',
        name: 'All Department Broadcast',
        type: 'Global',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '2',
        name: 'Revenue Department news',
        type: 'Department',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '3',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '4',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '5',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
];
import { useNavigation } from '@react-navigation/native';
import { PrivateNavigationProp, PrivateScreenProps } from '$/routes/private/types';

const ChannelsLanding = () => {
    const { navigate } = useNavigation<PrivateScreenProps>();
    const [selectedFilter, setSelectedFilter] = useState('All');

    const filteredData = selectedFilter === 'All'
        ? CHANNELS_DATA
        : CHANNELS_DATA.filter(item => item.type === selectedFilter);

    const renderChannelItem = ({ item }: { item: typeof CHANNELS_DATA[0] }) => (
        <TouchableOpacity
            style={styles.channelItem}
            onPress={() => navigate('ChannelsListening')}
        >
            <View style={styles.iconContainer}>
                <ZORRRO_SVG.TAB_LAYOUT.CHANNELS width={24} height={24} fill="#0084C8" />
            </View>
            <View style={styles.channelDetails}>
                <View style={styles.channelHeader}>
                    <Text style={styles.channelName}>{item.name}</Text>
                    <Text style={styles.channelTime}>{item.time}</Text>
                </View>
                <View style={styles.typeContainer}>
                    <View style={styles.typeBadge}>
                        <Text style={styles.typeText}>{item.type}</Text>
                    </View>
                    <Text style={styles.membersText}>{item.members}</Text>
                </View>
                <View style={styles.messageRow}>
                    <Text style={styles.checkmarks}>✓ </Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
                    {item.unread > 0 && (
                        <View style={styles.unreadBadgeContainer}>
                            <View style={styles.unreadBadge}>
                                <Text style={styles.unreadBadgeText}>{item.unread}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Channels</Text>
                        <Text style={styles.headerSubtitle}>Broadcast Messages</Text>
                    </View>
                    <TouchableOpacity>
                        <ZORRRO_SVG.SCREENS.SEARCH width={24} height={24} style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>

                {/* Filters */}
                <View style={styles.filtersContainer}>
                    {['All', 'Global', 'Department', 'District'].map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Channel List */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderChannelItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </SafeAreaView>
    );
};

export default ChannelsLanding;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    searchIcon: {
        opacity: 0.7,
    },
    filtersContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
    },
    filterChipActive: {
        borderColor: '#0084C8',
        backgroundColor: '#FFFFFF',
    },
    filterText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    filterTextActive: {
        color: '#0084C8',
    },
    listContainer: {
        paddingBottom: 20,
    },
    channelItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'flex-start',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E5F1FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    channelDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    channelHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    channelName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    channelTime: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    typeBadge: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    typeText: {
        fontSize: 10,
        color: '#111827',
        fontWeight: '700',
    },
    membersText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingRight: 30,
    },
    checkmarks: {
        fontSize: 12,
        color: '#D1D5DB',
        marginRight: 4,
    },
    lastMessage: {
        fontSize: 14,
        color: '#6B7280',
        flex: 1,
    },
    unreadBadgeContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    unreadBadge: {
        backgroundColor: '#0084C8',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
});