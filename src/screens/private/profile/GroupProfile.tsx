import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ZORRRO_SVG } from '$/assets';

const GroupProfile = () => {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>👥</Text>
                    </View>
                    <Text style={styles.groupName}>Revenue Officers - Kolkata</Text>
                    <View style={styles.groupBadge}>
                        <Text style={styles.groupBadgeText}>Revenue</Text>
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitleSubtitle}>Description</Text>
                    <Text style={styles.descriptionText}>
                        Official group for all revenue officers in Kolkata district for coordination and updates.
                    </Text>

                    <View style={styles.detailRow}>
                        <View style={styles.detailIconBox}>
                            <ZORRRO_SVG.PROFILE_TAB.END_TO_END width={20} height={20} color="#6B7280" />
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Created by</Text>
                            <Text style={styles.detailValue}>Priya Sharma</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIconBox}>
                            <ZORRRO_SVG.PROFILE_TAB.JOINING width={20} height={20} color="#6B7280" />
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Created on</Text>
                            <Text style={styles.detailValue}>Mar 2026</Text>
                        </View>
                    </View>
                    <View style={styles.detailRow}>
                        <View style={styles.detailIconBox}>
                            <ZORRRO_SVG.TAB_LAYOUT.CHATS width={20} height={20} fill="#6B7280" />
                        </View>
                        <View>
                            <Text style={styles.detailLabel}>Who can Message</Text>
                            <Text style={styles.detailValue}>Everyone</Text>
                        </View>
                    </View>
                </View>

                {/* Shared Media */}
                <View style={styles.mediaSection}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitleSubtitle}>Shared Media</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SharedMedia')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaScroll}>
                        {[1, 2, 3, 4].map((item) => (
                            <View key={item} style={styles.mediaItem}>
                                <Text style={styles.mediaItemText}>Doc {item}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Members Section */}
                <View style={styles.membersSection}>
                    <Text style={styles.sectionTitleSubtitle}>Members (48)</Text>
                    
                    {/* Admin */}
                    <View style={styles.memberRow}>
                        <View style={styles.memberAvatar}>
                            <Text style={styles.memberAvatarText}>PS</Text>
                        </View>
                        <View style={styles.memberInfo}>
                            <Text style={styles.memberName}>Priya Sharma</Text>
                            <View style={styles.adminBadge}>
                                <Text style={styles.adminBadgeText}>Admin</Text>
                            </View>
                        </View>
                        <View style={styles.statusDot} />
                    </View>

                    {/* Members preview */}
                    {[1, 2, 3, 4].map((item) => (
                        <View key={item} style={styles.memberRow}>
                            <View style={[styles.memberAvatar, { backgroundColor: '#E0F2FE' }]}>
                                <Text style={[styles.memberAvatarText, { color: '#0284C7' }]}>AS</Text>
                            </View>
                            <View style={styles.memberInfo}>
                                <Text style={styles.memberName}>Amit Singh</Text>
                            </View>
                            {item === 1 && <View style={styles.statusDot} />}
                        </View>
                    ))}

                    <TouchableOpacity style={styles.moreMembersBtn} onPress={() => navigation.navigate('GroupMembers')}>
                        <Text style={styles.moreMembersText}>+43 Members</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default GroupProfile;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 32,
    },
    groupName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    groupBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    groupBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4B5563',
    },
    detailsSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    sectionTitleSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 12,
    },
    descriptionText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 24,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    detailIconBox: {
        width: 24,
        alignItems: 'center',
        marginRight: 16,
    },
    detailLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '500',
    },
    mediaSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    seeAllText: {
        fontSize: 13,
        color: '#0084C8',
        fontWeight: '500',
    },
    mediaScroll: {
        flexDirection: 'row',
    },
    mediaItem: {
        width: 80,
        height: 80,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    mediaItemText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    membersSection: {
        padding: 20,
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
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    memberAvatarText: {
        color: '#0284C7',
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
    moreMembersBtn: {
        alignItems: 'center',
        paddingVertical: 16,
        marginTop: 8,
    },
    moreMembersText: {
        color: '#0084C8',
        fontSize: 15,
        fontWeight: '600',
    },
});
