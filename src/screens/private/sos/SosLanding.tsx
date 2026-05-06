import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Animated,
    Modal,
    Platform,
} from 'react-native';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding.style';
import { getHeight, getMargin } from '$/components/helper';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '$/styles';
import { ZorrroView } from '$/components';
import { ZORRRO_SVG } from '$/assets';

export interface AlertItem {
    id: string;
    type: string;
    status: 'Active' | 'In progress' | 'Resolved';
    time: string;
}

export type FilterType = 'All' | 'Active' | 'Inprogress' | 'Resolved';

const MOCK_ALERT_HISTORY: AlertItem[] = [
    { id: '1', type: 'Medical', status: 'Active', time: 'Today,13:46' },
    { id: '2', type: 'Accident', status: 'In progress', time: 'Today,13:46' },
    { id: '3', type: 'Fire', status: 'Resolved', time: 'Today,13:46' },
    { id: '4', type: 'Fire', status: 'Resolved', time: 'Today,13:46' },
    { id: '5', type: 'Fire', status: 'Resolved', time: 'Today,13:46' },
];

const FILTER_OPTIONS: FilterType[] = [
    'All',
    'Active',
    'Inprogress',
    'Resolved',
];

const SosLanding = () => {
    const navigation = useNavigation<any>();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');
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

    const renderHeader = () => (
        <ZorrroView style={styles.headerContainer}>
            <Text style={styles.pageTitle}>Emergency SOS</Text>

            <ZorrroView style={styles.sosButtonWrapper}>
                <TouchableOpacity
                    style={styles.sosButtonTouchable}
                    activeOpacity={0.8}
                    onLongPress={handleSosPress}
                >
                    {/* <View style={styles.sosOuterGlow} /> */}
                    <LinearGradient
                        colors={['#F62800', '#C11F00']}
                        start={{ x: 1, y: 0.5 }}
                        end={{ x: 0.5, y: -1 }}
                        style={styles.sosButton}
                    >
                        <Text style={styles.sosText}>SOS</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <Text style={styles.sosHelperText}>
                    Press and hold to send an emergency alert.
                </Text>
            </ZorrroView>

            <ZorrroView style={styles.divider} />

            <Text style={styles.sectionTitle}>Alert History</Text>

            <ZorrroView>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filtersWrapper}
                >
                    {FILTER_OPTIONS.map(filter => (
                        <TouchableOpacity
                            key={filter}
                            style={[
                                styles.filterChip,
                                selectedFilter === filter && styles.filterChipSelected,
                            ]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.filterTextSelected,
                                ]}
                            >
                                {filter}
                            </Text>
                            {filter === 'Active' && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>01</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ZorrroView>
        </ZorrroView>
    );

    const renderItem = ({ item }: { item: AlertItem }) => (
        <TouchableOpacity
            style={styles.alertCard}
            activeOpacity={0.7}
            onPress={() =>
                navigation.navigate('SosDetails', {
                    alertId: item.id,
                    status: item.status,
                })
            }
        >
            <ZorrroView style={styles.alertContent}>
                <ZorrroView style={styles.alertTypeRow}>
                    <ZORRRO_SVG.SOS.WARNING width={20} height={20} />
                    <Text style={styles.alertTypeText}>
                        Emergency Type -: {item.type}
                    </Text>
                </ZorrroView>
                <ZorrroView style={styles.alertTimeRow}>
                    <ZORRRO_SVG.SOS.HISTORY width={14} height={14} />
                    <Text style={styles.alertTimeText}>{item.time}</Text>
                </ZorrroView>
            </ZorrroView>
            <ZorrroView
                style={[
                    styles.statusBadge,
                    item.status === 'Active'
                        ? styles.statusActive
                        : item.status === 'In progress'
                            ? styles.statusInProgress
                            : styles.statusResolved,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        item.status === 'Active'
                            ? styles.statusTextActive
                            : item.status === 'In progress'
                                ? styles.statusTextInProgress
                                : styles.statusTextResolved,
                    ]}
                >
                    {item.status}
                </Text>
            </ZorrroView>
        </TouchableOpacity>
    );

    const filteredData =
        selectedFilter === 'All'
            ? MOCK_ALERT_HISTORY
            : MOCK_ALERT_HISTORY.filter(item => {
                if (selectedFilter === 'Inprogress')
                    return item.status === 'In progress';
                return item.status === selectedFilter;
            });

    return (
        <ZorrroView safe edges={['top', 'left', 'right']} style={ChatsLandingStyles?.safeArea}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={ZORRRO_COLORS.WHITE}
            />
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* SOS Animated Overlay */}
            <Modal visible={isSosOverlayVisible} transparent animationType="fade">
                <ZorrroView style={styles.overlayContainer}>
                    <ZorrroView style={styles.rippleContainer}>
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
                    </ZorrroView>

                    <Text style={styles.overlayTitle}>Sending Emergency Alert...</Text>
                    <Text style={styles.overlaySubtitle}>
                        Your live location and audio will be shared with the control room
                        and nearby officers.
                    </Text>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => {
                            clearTimeout(timeoutRef.current);
                            setIsSosOverlayVisible(false);
                        }}
                    >
                        <Text style={styles.cancelButtonText}>Cancel (3s)</Text>
                    </TouchableOpacity>
                </ZorrroView>
            </Modal>
        </ZorrroView>
    );
};

export default SosLanding;

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerContainer: {
        marginTop: 16,
    },
    pageTitle: {
        fontSize: 20,
        fontFamily: ZORRRO_FONTS?.[700]?.normal,
        color: '#262626',
        marginBottom: getMargin(55),
    },
    sosButtonWrapper: {
        alignItems: 'center',
        marginBottom: getMargin(24),
    },
    sosButtonTouchable: {
        width: 120,
        height: 120,
        borderRadius: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getMargin(16),
        backgroundColor: 'transparent',
        ...(Platform?.OS === 'ios'
            ? {
                shadowColor: 'rgba(255, 0, 0, 1)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.24,
                shadowRadius: 100,
            }
            : {
                elevation: 60,
                shadowColor: 'rgba(255, 0, 0, 1)',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.24,
                shadowRadius: 100,
            }),
    },
    sosButton: {
        width: 120,
        height: 120,
        borderRadius: 64,
        borderWidth: 3,
        borderColor: '#E71511',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sosText: {
        fontSize: 24,
        fontFamily: ZORRRO_FONTS?.[800]?.normal,
        color: ZORRRO_COLORS?.WHITE,
    },
    sosHelperText: {
        fontSize: 14,
        color: '#687282',
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(218, 224, 231, 1)',
        marginHorizontal: getMargin(-20),
        marginBottom: getMargin(24),
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: ZORRRO_FONTS?.[600]?.normal,
        color: '#262626',
        marginBottom: getMargin(12),
    },
    filtersWrapper: {
        paddingRight: 20,
        marginBottom: 20,
    },
    filterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: getHeight(34),
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
    },
    filterChipSelected: {
        borderColor: '#085F87',
        backgroundColor: '#E2F6FF',
    },
    filterText: {
        fontSize: 14,
        color: '#6B7280',
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    filterTextSelected: {
        color: '#0084C8',
    },
    badge: {
        backgroundColor: '#DC2626',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: ZORRRO_COLORS?.WHITE,
        fontSize: 10,
        fontFamily: ZORRRO_FONTS?.[500]?.normal,
    },
    alertCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: ZORRRO_COLORS?.WHITE,
        borderRadius: 12,
        padding: getMargin(10),
        marginBottom: getMargin(12),
        borderWidth: 1,
        borderColor: '#E1E5EB',
    },
    alertContent: {
        flex: 1,
    },
    alertTypeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    alertTypeText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
        marginLeft: 8,
    },
    alertTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 26,
    },
    alertTimeText: {
        fontSize: 13,
        color: '#9CA3AF',
        marginLeft: 4,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    statusActive: {
        backgroundColor: '#DC2626',
    },
    statusInProgress: {
        backgroundColor: '#EAB308',
    },
    statusResolved: {
        backgroundColor: '#10B981',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: ZORRRO_COLORS?.WHITE,
    },
    statusTextActive: {
        color: ZORRRO_COLORS?.WHITE,
    },
    statusTextInProgress: {
        color: ZORRRO_COLORS?.WHITE,
    },
    statusTextResolved: {
        color: ZORRRO_COLORS?.WHITE,
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
        color: ZORRRO_COLORS?.WHITE,
    },
    overlayTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: ZORRRO_COLORS?.WHITE,
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
        borderColor: ZORRRO_COLORS?.WHITE,
        backgroundColor: 'transparent',
    },
    cancelButtonText: {
        color: ZORRRO_COLORS?.WHITE,
        fontSize: 16,
    },
});
