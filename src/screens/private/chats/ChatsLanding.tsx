import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
    TouchableOpacity,
    StatusBar,
    TextInput,
    Animated,
    FlatList,
    Text,
    View,
} from 'react-native';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding';
import { ZORRRO_SVG } from '../../../assets';
import { ZorrroView } from '$/components';
import { ZORRRO_COLORS } from '$/styles';
import {
    ChatListItem,
    SosAlertOverlay,
    SosConfirmAlert,
    SosFab,
    type ChatListItemData,
} from './component';

const CHATS_DATA: ChatListItemData[] = [
    {
        id: '1',
        name: 'Biswopaban Nayak',
        initials: 'BN',
        role: 'Department Admin',
        department: 'Revenue',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '2',
        name: 'Neilank Das',
        initials: 'ND',
        role: 'District Admin',
        department: 'Revenue',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '3',
        name: 'Amit Thakur',
        initials: 'AT',
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
        name: 'Rahul Thakur',
        initials: 'RT',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: false,
    },
    {
        id: '8',
        name: 'Revenue Officers - Kolka...',
        initials: 'RO',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: true,
    },
    {
        id: '9',
        name: 'Revenue Officers - Kolka...',
        initials: 'RO',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: true,
    },
    {
        id: '71001',
        name: 'Sagnick Manna',
        initials: 'SM',
        lastMessage: 'Please share the updated figures',
        time: '15 min',
        unread: 1,
        isGroup: false,
    },
    {
        id: '2920',
        name: 'Rahul Kumar',
        initials: 'RK',
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
    const [isSosConfirmVisible, setIsSosConfirmVisible] = useState(false);
    const rippleAnim = useRef(new Animated.Value(0)).current;
    const confirmAnim = useRef(new Animated.Value(0)).current;
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

    const triggerSosAlert = () => {
        setIsSosOverlayVisible(true);
        startRipple();
        timeoutRef.current = setTimeout(() => {
            setIsSosOverlayVisible(false);
            navigation.navigate('SosDetails', { status: 'Active' });
        }, 2000);
    };

    const showSosConfirm = () => {
        setIsSosConfirmVisible(true);
        confirmAnim.setValue(0);
        Animated.spring(confirmAnim, {
            toValue: 1,
            useNativeDriver: true,
            speed: 15,
            bounciness: 8,
        }).start();
    };

    const hideSosConfirm = (onComplete?: () => void) => {
        Animated.timing(confirmAnim, {
            toValue: 0,
            duration: 180,
            useNativeDriver: true,
        }).start(() => {
            setIsSosConfirmVisible(false);
            onComplete?.();
        });
    };

    const handleSosPress = () => {
        showSosConfirm();
    };

    const handleConfirmSos = () => {
        hideSosConfirm(() => {
            triggerSosAlert();
        });
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

    const renderChatItem = ({ item }: { item: ChatListItemData }) => (
        <ChatListItem
            item={item}
            onPress={() =>
                navigation.navigate('ChatDetails', {
                    chatId: item.id,
                    isGroup: item.isGroup,
                })
            }
        />
    );

    return (
        <ZorrroView safe style={ChatsLandingStyles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={ZORRRO_COLORS.WHITE} />
            <ZorrroView style={ChatsLandingStyles.container}>
                {/* Header */}
                <ZorrroView style={ChatsLandingStyles.header}>
                    <ZORRRO_SVG.WB_LOGO width={40} height={40} />
                    <Text style={ChatsLandingStyles.headerTitle}>Chat App</Text>
                </ZorrroView>

                {/* Search Bar */}
                <ZorrroView style={ChatsLandingStyles.searchContainer}>
                    <ZORRRO_SVG.SCREENS.SEARCH
                        width={20}
                        height={20}
                        color="#6F7D90"
                        style={ChatsLandingStyles.searchIcon}
                    />
                    <TextInput
                        style={ChatsLandingStyles.searchInput}
                        placeholder="Search chats..."
                        placeholderTextColor="#9CA3AF"
                    />
                </ZorrroView>

                {/* Filters */}
                <ZorrroView style={ChatsLandingStyles.filtersContainer}>
                    <TouchableOpacity
                        style={[
                            ChatsLandingStyles.filterChip,
                            selectedFilter === 'All' && ChatsLandingStyles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter('All')}
                    >
                        <Text
                            style={[
                                ChatsLandingStyles.filterText,
                                selectedFilter === 'All' && ChatsLandingStyles.filterTextActive,
                            ]}
                        >
                            All
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            ChatsLandingStyles.filterChip,
                            selectedFilter === 'Unread' && ChatsLandingStyles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter('Unread')}
                    >
                        <Text
                            style={[
                                ChatsLandingStyles.filterText,
                                selectedFilter === 'Unread' && ChatsLandingStyles.filterTextActive,
                            ]}
                        >
                            Unread
                        </Text>
                        <View style={ChatsLandingStyles.filterBadge}>
                            <Text style={ChatsLandingStyles.filterBadgeText}>4</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            ChatsLandingStyles.filterChip,
                            selectedFilter === 'Groups' && ChatsLandingStyles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter('Groups')}
                    >
                        <Text
                            style={[
                                ChatsLandingStyles.filterText,
                                selectedFilter === 'Groups' && ChatsLandingStyles.filterTextActive,
                            ]}
                        >
                            Groups
                        </Text>
                    </TouchableOpacity>
                </ZorrroView>

                {/* Chat List */}
                <FlatList
                    data={filteredChats}
                    keyExtractor={item => item.id}
                    renderItem={renderChatItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={ChatsLandingStyles.listContainer}
                />

                <SosFab onPress={handleSosPress} />
            </ZorrroView>

            <SosAlertOverlay
                visible={isSosOverlayVisible}
                rippleAnim={rippleAnim}
                onCancel={handleCancelSos}
            />
            <SosConfirmAlert
                visible={isSosConfirmVisible}
                animationValue={confirmAnim}
                onCancel={() => hideSosConfirm()}
                onConfirm={handleConfirmSos}
            />
        </ZorrroView>
    );
};

export default ChatsLanding;


