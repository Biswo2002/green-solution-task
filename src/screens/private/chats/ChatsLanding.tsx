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
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding.style';
import { ZORRRO_SVG } from '../../../assets';
import { ScreenStatusBar, ZorrroView } from '$/components';
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
        role: 'Assistant Revenue Officer',
        department: 'Land & Land Reforms',
        lastMessage: 'Kindly share the revised land records at the earliest.',
        time: '15 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '2',
        name: 'Neilank Das',
        initials: 'ND',
        role: 'District Magistrate',
        department: 'District Administration',
        lastMessage: 'Please submit the updated report for review.',
        time: '10 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '3',
        name: 'Amit Thakur',
        initials: 'AT',
        role: 'State Nodal Officer',
        department: 'Finance Department',
        lastMessage: 'Ensure compliance with the latest circular.',
        time: '20 min',
        unread: 0,
        isGroup: false,
    },
    {
        id: '4',
        name: 'Revenue Officers - Kolkata Division',
        initials: 'RO',
        lastMessage: 'Meeting scheduled at 4 PM regarding mutation cases.',
        time: '5 min',
        unread: 2,
        isGroup: true,
    },
    {
        id: '5',
        name: 'Block Development Officers - Purba Bardhaman',
        initials: 'BD',
        lastMessage: 'Upload MGNREGA progress data by EOD.',
        time: '12 min',
        unread: 3,
        isGroup: true,
    },
    {
        id: '6',
        name: 'District Treasury Officers - WB',
        initials: 'DT',
        lastMessage: 'Pending bill approvals need immediate attention.',
        time: '18 min',
        unread: 1,
        isGroup: true,
    },
    {
        id: '7',
        name: 'Rahul Thakur',
        initials: 'RT',
        role: 'Sub-Divisional Officer',
        department: 'General Administration',
        lastMessage: 'Please confirm receipt of the official memo.',
        time: '8 min',
        unread: 1,
        isGroup: false,
    },
    {
        id: '8',
        name: 'Panchayat Officers - Burdwan Sadar',
        initials: 'PO',
        lastMessage: 'Gram Sabha reports are pending submission.',
        time: '25 min',
        unread: 4,
        isGroup: true,
    },
    {
        id: '9',
        name: 'Health Department - District Coordination',
        initials: 'HD',
        lastMessage: 'Vaccination data needs to be updated on the portal.',
        time: '30 min',
        unread: 2,
        isGroup: true,
    },
    {
        id: '71001',
        name: 'Sagnick Manna',
        initials: 'SM',
        role: 'Data Entry Operator',
        department: 'e-Governance Cell',
        lastMessage: 'Data upload completed for today.',
        time: '40 min',
        unread: 1,
        isGroup: false,
    },
    {
        id: '2920',
        name: 'Rahul Kumar',
        initials: 'RK',
        role: 'Junior Accounts Officer',
        department: 'Finance Department',
        lastMessage: 'Kindly verify the expenditure statement.',
        time: '50 min',
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
                    chatName: item.name,
                    chatInitials: item.initials,
                    chatRole: item.role,
                    chatDepartment: item.department,
                    chatMembersLabel: item.isGroup ? '48 members' : undefined,
                    chatSubtitle: item.isGroup
                        ? '48 members'
                        : [item.role, item.department].filter(Boolean).join(' • '),
                    isGroup: item.isGroup,
                })
            }
        />
    );

    return (
        <ZorrroView safe edges={['top', 'left', 'right']} style={ChatsLandingStyles.safeArea}>
            <ScreenStatusBar backgroundColor={ZORRRO_COLORS?.WHITE} barStyle="dark-content" />

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


