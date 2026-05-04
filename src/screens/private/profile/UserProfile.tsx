import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';

const UserProfile = () => {
    const navigation = useNavigation<any>();

    return (
        <ZorrroView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>PS</Text>
                        </View>
                        <View style={styles.statusDot} />
                    </View>
                    <Text style={styles.userName}>Rajesh Kumar</Text>
                    <View style={styles.roleBadge}>
                        <ZORRRO_SVG.SOS.WARNING width={14} height={14} color="#6B7280" />
                        <Text style={styles.roleText}>Department Admin</Text>
                    </View>

                    <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatDetails')}>
                        <Text style={styles.chatButtonIcon}>💬</Text>
                        <Text style={styles.chatButtonText}>Chat</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>✉️</Text>
                        <View>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoValue}>rajesh.kumar@gov.in</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>📞</Text>
                        <View>
                            <Text style={styles.infoLabel}>Phone</Text>
                            <Text style={styles.infoValue}>+91 98765 43210</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoIcon}>🏢</Text>
                        <View>
                            <Text style={styles.infoLabel}>Department</Text>
                            <Text style={styles.infoValue}>Revenue</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.mediaSection}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Shared Media</Text>
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

                <View style={styles.groupsSection}>
                    <Text style={styles.sectionTitleSubtitle}>2 Groups in Common</Text>
                    {[1, 2].map((item) => (
                        <TouchableOpacity key={item} style={styles.groupItem}>
                            <View style={styles.groupAvatar}>
                                <Text style={styles.groupAvatarIcon}>👥</Text>
                            </View>
                            <View style={styles.groupInfo}>
                                <Text style={styles.groupName}>Revenue Officers - Kolka...</Text>
                                <View style={styles.groupMetaRow}>
                                    <View style={styles.groupRoleBadge}>
                                        <Text style={styles.groupRoleText}>Revenue</Text>
                                    </View>
                                    <Text style={styles.groupMembersText}>48 members</Text>
                                </View>
                            </View>
                            <ZORRRO_SVG.SCREENS.RIGHT_ARROW width={16} height={16} color="#9CA3AF" style={styles.rightArrow} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </ZorrroView>
    );
};

export default UserProfile;

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
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#0284C7',
        fontSize: 32,
        fontWeight: 'bold',
    },
    statusDot: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10B981',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    roleBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 16,
        marginBottom: 20,
    },
    roleText: {
        fontSize: 12,
        color: '#4B5563',
        fontWeight: '500',
        marginLeft: 4,
    },
    chatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#0084C8',
        borderRadius: 8,
    },
    chatButtonIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    chatButtonText: {
        color: '#0084C8',
        fontSize: 15,
        fontWeight: '600',
    },
    infoSection: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    infoIcon: {
        fontSize: 20,
        marginRight: 16,
        width: 24,
        textAlign: 'center',
    },
    infoLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    infoValue: {
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
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6B7280',
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
    groupsSection: {
        padding: 20,
    },
    sectionTitleSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 16,
    },
    groupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F9FAFB',
    },
    groupAvatar: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    groupAvatarIcon: {
        fontSize: 20,
    },
    groupInfo: {
        flex: 1,
    },
    groupName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    groupMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupRoleBadge: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginRight: 8,
    },
    groupRoleText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#4B5563',
    },
    groupMembersText: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    rightArrow: {
        marginLeft: 12,
    },
});
