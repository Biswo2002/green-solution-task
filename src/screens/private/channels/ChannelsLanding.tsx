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
    {
        id: '50',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '420',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '544d',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '3fjf',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '4bub',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '5slsl',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '3smkd',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '4posn',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
    {
        id: '5dd',
        name: 'Revenue District news',
        type: 'District',
        members: '48 members',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
    },
];
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    TextInput,
    FlatList,
    Text,
    View,
} from 'react-native';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding.style';
import { PrivateScreenProps } from '$/routes/private/types';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '$/styles';
import { ScreenStatusBar, ZorrroView } from '$/components';
import { ZORRRO_SVG } from '$/assets';

const ChannelsLanding = () => {
    const { navigate } = useNavigation<PrivateScreenProps>();
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = CHANNELS_DATA.filter(item => {
        const matchesFilter =
            selectedFilter === 'All' || item.type === selectedFilter;
        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const renderChannelItem = ({ item }: { item: (typeof CHANNELS_DATA)[0] }) => (
        <TouchableOpacity
            style={ChatsLandingStyles.chatItem}
            onPress={() => navigate('ChannelsListening')}
        >
            <ZorrroView style={ChatsLandingStyles.avatarContainer}>
                <ZORRRO_SVG.TAB_LAYOUT.CHANNELS_ACTIVE width={24} height={24} />
            </ZorrroView>
            <ZorrroView style={ChatsLandingStyles.chatDetails}>
                <ZorrroView style={ChatsLandingStyles.chatHeader}>
                    <Text style={ChatsLandingStyles.chatName}>{item.name}</Text>
                    <Text style={[ChatsLandingStyles.chatTime]}>{item.time}</Text>
                </ZorrroView>
                <ZorrroView style={ChatsLandingStyles.roleContainer}>
                    <ZorrroView
                        style={[
                            ChatsLandingStyles.roleBadge,
                            {
                                backgroundColor: '#EAEDF0',
                            },
                        ]}
                    >
                        <Text style={ChatsLandingStyles.roleText}>{item.type}</Text>
                    </ZorrroView>
                    <Text
                        style={[
                            ChatsLandingStyles.departmentText,
                            {
                                marginLeft: 6,
                            },
                        ]}
                    >
                        {item.members}
                    </Text>
                </ZorrroView>
                <ZorrroView style={ChatsLandingStyles.messageRow}>
                    <ZORRRO_SVG.SCREENS.DONE_ALL
                        width={16}
                        height={16}
                        color="#DAE0E7"
                        style={ChatsLandingStyles.checkmarks}
                        fill="#DAE0E7"
                    />
                    <Text style={ChatsLandingStyles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <ZorrroView style={ChatsLandingStyles.unreadBadgeContainer}>
                            <ZorrroView style={ChatsLandingStyles.unreadBadge}>
                                <Text style={ChatsLandingStyles.unreadBadgeText}>
                                    {item.unread}
                                </Text>
                            </ZorrroView>
                        </ZorrroView>
                    )}
                </ZorrroView>
            </ZorrroView>
        </TouchableOpacity>
    );

    return (
        <ZorrroView safe edges={['top', 'left', 'right']} style={ChatsLandingStyles.safeArea}>
            <ScreenStatusBar backgroundColor={ZORRRO_COLORS?.WHITE} barStyle="dark-content" />

            <ZorrroView style={ChatsLandingStyles.container}>
                {/* Header */}
                <ZorrroView style={styles.header}>
                    <ZorrroView>
                        <Text style={styles.headerTitle}>Channels</Text>
                        <Text style={styles.headerSubtitle}>Broadcast Messages</Text>
                    </ZorrroView>
                    <TouchableOpacity
                        onPress={() => setIsSearchVisible(!isSearchVisible)}
                    >
                        <ZORRRO_SVG.SCREENS.SEARCH
                            width={24}
                            height={24}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </ZorrroView>

                {/* Search Bar */}
                {isSearchVisible && (
                    <View style={styles.searchContainer}>
                        <ZORRRO_SVG.SCREENS.SEARCH
                            width={20}
                            height={20}
                            style={styles.searchIconInside}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search channels..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setIsSearchVisible(false);
                                setSearchQuery('');
                            }}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeIconText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Filters */}
                <ZorrroView style={ChatsLandingStyles.filtersContainer}>
                    {['All', 'Global', 'Department', 'District'].map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                ChatsLandingStyles.filterChip,
                                selectedFilter === filter &&
                                ChatsLandingStyles.filterChipActive,
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text
                                style={[
                                    ChatsLandingStyles.filterText,
                                    selectedFilter === filter &&
                                    ChatsLandingStyles.filterTextActive,
                                ]}
                            >
                                {filter}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ZorrroView>

                {/* Channel List */}
                <FlatList
                    data={filteredData}
                    keyExtractor={item => item.id}
                    renderItem={renderChannelItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </ZorrroView>
        </ZorrroView>
    );
};

export default ChannelsLanding;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 6,
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: ZORRRO_FONTS?.[700]?.normal,
        color: '#171D26',
    },
    headerSubtitle: {
        fontSize: 12,
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
        color: '#6F7D90',
        // marginTop: 4,
    },
    searchIcon: {
        opacity: 0.7,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F5F7',
        marginHorizontal: 20,
        borderRadius: 24,
        paddingHorizontal: 15,
        height: 48,
        marginBottom: 15,
    },
    searchIconInside: {
        marginRight: 10,
        opacity: 0.5,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    closeButton: {
        padding: 5,
    },
    closeIconText: {
        fontSize: 18,
        color: '#9CA3AF',
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
});
