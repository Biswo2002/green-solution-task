import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Modal,
    Animated,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ZORRRO_SVG } from '../../../assets';
import { ZorrroView } from '$/components';

const CHATS_DATA = [
    {
        id: '1',
        name: 'Priya Sharma',
        initials: 'PS',
        role: 'Department Admin',
        department: 'Revenue',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '2',
        name: 'Priya Sharma',
        initials: 'PS',
        role: 'District Admin',
        department: 'Revenue',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '3',
        name: 'Rahul Kumar',
        initials: 'RK',
        role: 'Super Admin',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '4',
        name: 'Revenue Officers - Kolka...',
        initials: 'RO',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: true,
    },
    {
        id: '5',
        name: 'Revenue Officers - Kolka...',
        initials: 'RO',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: true,
    },
    {
        id: '6',
        name: 'Revenue Officers - Kolka...',
        initials: 'RO',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: true,
    },
    {
        id: '7',
        name: 'Amit Thakur',
        initials: 'AT',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: false,
    },
];

const ChatsLanding = () => {
    const navigation = useNavigation<any>();
    const [selectedFilter, setSelectedFilter] = useState('All');

    // SOS Overlay State
    const [isSosOverlayVisible, setIsSosOverlayVisible] = useState(false);
    const rippleAnim = useRef(new Animated.Value(0)).current;
    const timeoutRef = useRef<any>(null);

    const startRipple = () => {
        rippleAnim.setValue(0);
        Animated.loop(
            Animated.timing(rippleAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
        ).start();
    };

    const handleSosPress = () => {
        setIsSosOverlayVisible(true);
        startRipple();
        timeoutRef.current = setTimeout(() => {
            setIsSosOverlayVisible(false);
            navigation.navigate('SosDetails', { status: 'Active' });
        }, 2000);
    };

    const handleCancelSos = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsSosOverlayVisible(false);
        rippleAnim.stopAnimation();
    };

    const filteredChats = CHATS_DATA.filter(chat => {
        if (selectedFilter === 'All') return true;
        if (selectedFilter === 'Unread') return chat.unread > 0;
        if (selectedFilter === 'Groups') return chat.isGroup;
        return true;
    });

    const renderChatItem = ({ item }: { item: (typeof CHATS_DATA)[0] }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
                navigation.navigate('ChatDetails', {
                    chatId: item.id,
                    isGroup: item.isGroup,
                })
            }
        >
            <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{item.initials}</Text>
            </View>
            <View style={styles.chatDetails}>
                <View style={styles.chatHeader}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <Text style={styles.chatTime}>{item.time}</Text>
                </View>
                {item.role && (
                    <View style={styles.roleContainer}>
                        <View style={styles.roleBadge}>
                            <Text style={styles.roleText}>{item.role}</Text>
                        </View>
                        {item.department && (
                            <Text style={styles.departmentText}> • {item.department}</Text>
                        )}
                    </View>
                )}
                <View style={styles.messageRow}>
                    <ZORRRO_SVG.SCREENS.DONE_ALL
                        width={16}
                        height={16}
                        color="#9CA3AF"
                        style={styles.checkmarks}
                    />
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
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
        <ZorrroView safe style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <ZORRRO_SVG.WB_LOGO width={40} height={40} />
                    <Text style={styles.headerTitle}>Chat App</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <ZORRRO_SVG.SCREENS.SEARCH
                        width={20}
                        height={20}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search chats..."
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                {/* Filters */}
                <View style={styles.filtersContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filterChip,
                            selectedFilter === 'All' && styles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter('All')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === 'All' && styles.filterTextActive,
                            ]}
                        >
                            All
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterChip,
                            selectedFilter === 'Unread' && styles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter('Unread')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === 'Unread' && styles.filterTextActive,
                            ]}
                        >
                            Unread
                        </Text>
                        <View style={styles.filterBadge}>
                            <Text style={styles.filterBadgeText}>4</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.filterChip,
                            selectedFilter === 'Groups' && styles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter('Groups')}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                selectedFilter === 'Groups' && styles.filterTextActive,
                            ]}
                        >
                            Groups
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Chat List */}
                <FlatList
                    data={filteredChats}
                    keyExtractor={item => item.id}
                    renderItem={renderChatItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />

                {/* Floating SOS Button */}
                <TouchableOpacity
                    style={styles.fabButton}
                    activeOpacity={0.8}
                    onPress={handleSosPress}
                >
                    <Text style={styles.fabText}>SOS</Text>
                </TouchableOpacity>
            </View>

            {/* SOS Animated Overlay */}
            <Modal visible={isSosOverlayVisible} transparent animationType="fade">
                <View style={styles.overlayContainer}>
                    <View style={styles.rippleContainer}>
                        <Animated.View
                            style={[
                                styles.ripple,
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
                                styles.ripple,
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
                        <View style={styles.overlaySosButton}>
                            <Text style={styles.overlaySosText}>SOS</Text>
                        </View>
                    </View>

                    <Text style={styles.overlayTitle}>Sending Emergency Alert...</Text>
                    <Text style={styles.overlaySubtitle}>
                        Your location and Details are being Shared{'\n'}with the nearest
                        control room.
                    </Text>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancelSos}
                    >
                        <Text style={styles.cancelButtonText}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ZorrroView>
    );
};

export default ChatsLanding;

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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0084C8', // Match logo color closely
        marginLeft: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F5F7',
        marginHorizontal: 20,
        borderRadius: 24,
        paddingHorizontal: 15,
        height: 48,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
        opacity: 0.5,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    filtersContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
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
    filterBadge: {
        backgroundColor: '#0084C8',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    filterBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 20,
    },
    chatItem: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'flex-start',
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E5F1FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        color: '#005988',
        fontSize: 16,
        fontWeight: '600',
    },
    chatDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    chatTime: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    roleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    roleBadge: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    roleText: {
        fontSize: 10,
        color: '#111827',
        fontWeight: '700',
    },
    departmentText: {
        fontSize: 12,
        color: '#6B7280',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        paddingRight: 30,
    },
    checkmarks: {
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
    fabButton: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 24,
        elevation: 20,
    },
    fabText: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    overlayContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    rippleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        height: 160,
    },
    ripple: {
        position: 'absolute',
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#DC2626',
    },
    overlaySosButton: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        shadowColor: '#DC2626',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 10,
    },
    overlaySosText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    overlayTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    overlaySubtitle: {
        fontSize: 14,
        color: '#D1D5DB',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'transparent',
    },
    cancelButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
