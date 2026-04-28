import { ZORRRO_SVG } from '$/assets';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export interface AlertItem {
    id: string;
    type: string;
    status: 'Active' | 'In progress' | 'Resolved';
    time: string;
}

export type FilterType = 'All' | 'Active' | 'Inprogress' | 'Resolved';

const MOCK_ALERT_HISTORY: AlertItem[] = [
    { id: '1', type: 'Medical', status: 'Active', time: 'Today, 13:46' },
    { id: '2', type: 'Accident', status: 'In progress', time: 'Today, 13:46' },
    { id: '3', type: 'Fire', status: 'Resolved', time: 'Today, 13:46' },
    { id: '4', type: 'Fire', status: 'Resolved', time: 'Today, 13:46' },
    { id: '5', type: 'Fire', status: 'Resolved', time: 'Today, 13:46' },
];

const FILTER_OPTIONS: FilterType[] = ['All', 'Active', 'Inprogress', 'Resolved'];

const SosLanding = () => {
    const navigation = useNavigation<any>();
    const [selectedFilter, setSelectedFilter] = useState<FilterType>('All');

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.pageTitle}>Emergency SOS</Text>

            <View style={styles.sosButtonWrapper}>
                <View style={styles.sosOuterGlow}>
                    <TouchableOpacity style={styles.sosButton} activeOpacity={0.8} onPress={() => navigation.navigate('SosDetails')}>
                        <Text style={styles.sosText}>SOS</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sosHelperText}>Press and hold to send an emergency alert.</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Alert History</Text>

            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersWrapper}>
                    {FILTER_OPTIONS.map((filter) => (
                        <TouchableOpacity
                            key={filter}
                            style={[styles.filterChip, selectedFilter === filter && styles.filterChipSelected]}
                            onPress={() => setSelectedFilter(filter)}
                        >
                            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextSelected]}>{filter}</Text>
                            {filter === 'Active' && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>01</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );

    const renderItem = ({ item }: { item: AlertItem }) => (
        <TouchableOpacity 
            style={styles.alertCard} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SosDetails', { alertId: item.id, status: item.status })}
        >
            <View style={styles.alertContent}>
                <View style={styles.alertTypeRow}>
                    <ZORRRO_SVG.SOS.WARNING width={18} height={18} />
                    <Text style={styles.alertTypeText}>Emergency Type -: {item.type}</Text>
                </View>
                <View style={styles.alertTimeRow}>
                    <ZORRRO_SVG.SOS.HISTORY width={14} height={14} />
                    <Text style={styles.alertTimeText}>{item.time}</Text>
                </View>
            </View>
            <View style={[
                styles.statusBadge,
                item.status === 'Active' ? styles.statusActive :
                    item.status === 'In progress' ? styles.statusInProgress :
                        styles.statusResolved
            ]}>
                <Text style={[
                    styles.statusText,
                    item.status === 'Active' ? styles.statusTextActive :
                        item.status === 'In progress' ? styles.statusTextInProgress :
                            styles.statusTextResolved
                ]}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const filteredData = selectedFilter === 'All'
        ? MOCK_ALERT_HISTORY
        : MOCK_ALERT_HISTORY.filter(item => {
            if (selectedFilter === 'Inprogress') return item.status === 'In progress';
            return item.status === selectedFilter;
        });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default SosLanding;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerContainer: {
        paddingTop: 20,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 30,
    },
    sosButtonWrapper: {
        alignItems: 'center',
        marginBottom: 40,
    },
    sosOuterGlow: {
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 30,
        elevation: 15,
        borderRadius: 75,
        backgroundColor: '#FFFFFF',
        marginBottom: 20,
    },
    sosButton: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#DC2626',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sosText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    sosHelperText: {
        fontSize: 14,
        color: '#6B7280',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: -20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 16,
    },
    filtersWrapper: {
        paddingRight: 20,
        marginBottom: 20,
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
    filterChipSelected: {
        borderColor: '#0084C8',
        backgroundColor: '#F0F9FF',
    },
    filterText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
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
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    alertCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
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
        color: '#FFFFFF',
    },
    statusTextActive: {
        color: '#FFFFFF',
    },
    statusTextInProgress: {
        color: '#FFFFFF',
    },
    statusTextResolved: {
        color: '#FFFFFF',
    },
});