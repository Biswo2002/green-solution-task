import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';

const MOCK_MEMBERS = [
    { id: '1', name: 'Priya Sharma', initials: 'PS', isAdmin: true, isOnline: true },
    { id: '2', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: true },
    { id: '3', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '4', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '5', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '6', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: true },
    { id: '7', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '8', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '9', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '10', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: true },
    { id: '11', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '12', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '13', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: true },
    { id: '14', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
    { id: '15', name: 'Amit Singh', initials: 'AS', isAdmin: false, isOnline: false },
];

const GroupMembers = () => {
    const navigation = useNavigation<any>();

    const renderMember = ({ item }: { item: typeof MOCK_MEMBERS[0] }) => (
        <View style={styles.memberRow}>
            <View style={[styles.memberAvatar, { backgroundColor: '#E0F2FE' }]}>
                <Text style={[styles.memberAvatarText, { color: '#0284C7' }]}>{item.initials}</Text>
            </View>
            <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{item.name}</Text>
                {item.isAdmin && (
                    <View style={styles.adminBadge}>
                        <Text style={styles.adminBadgeText}>Admin</Text>
                    </View>
                )}
            </View>
            {item.isOnline && <View style={styles.statusDot} />}
        </View>
    );

    return (
        <ZorrroView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Members (48)</Text>
            </View>

            <View style={styles.searchContainer}>
                <ZORRRO_SVG.SCREENS.SEARCH width={20} height={20} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search members..."
                    placeholderTextColor="#9CA3AF"
                />
            </View>

            <FlatList
                data={MOCK_MEMBERS}
                keyExtractor={(item) => item.id}
                renderItem={renderMember}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </ZorrroView>
    );
};

export default GroupMembers;

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
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F5F7',
        marginHorizontal: 20,
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 48,
        marginVertical: 16,
    },
    searchIcon: {
        marginRight: 10,
        opacity: 0.5,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#1F2937',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    memberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    memberAvatarText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    memberInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
    },
    adminBadge: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
    },
    adminBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111827',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10B981',
    },
});
