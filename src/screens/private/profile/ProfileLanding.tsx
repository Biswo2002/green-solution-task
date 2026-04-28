import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import { ZORRRO_SVG } from '../../../assets';

const ProfileLanding = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>RK</Text>
                        </View>
                        <View style={styles.statusDot} />
                    </View>
                    <Text style={styles.profileName}>Rajesh Kumar</Text>
                </View>

                {/* Profile Details List */}
                <View style={styles.sectionContainer}>
                    {/* Email */}
                    <View style={styles.listItem}>
                        <View style={styles.iconContainer}>
                            <ZORRRO_SVG.PROFILE_TAB.EMAIL width={20} height={20} fill="#6B7280" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Email</Text>
                            <Text style={styles.itemValue}>rajesh.kumar@gov.in</Text>
                        </View>
                    </View>

                    {/* Phone */}
                    <View style={styles.listItem}>
                        <View style={styles.iconContainer}>
                            <ZORRRO_SVG.PROFILE_TAB.PHONE width={20} height={20} fill="#6B7280" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Phone</Text>
                            <Text style={styles.itemValue}>+91 98765 43210</Text>
                        </View>
                    </View>

                    {/* Department */}
                    <View style={styles.listItem}>
                        <View style={styles.iconContainer}>
                            <ZORRRO_SVG.PROFILE_TAB.REVENUE width={20} height={20} fill="#6B7280" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Department</Text>
                            <Text style={styles.itemValue}>Revenue</Text>
                        </View>
                    </View>

                    {/* District */}
                    <View style={styles.listItem}>
                        <View style={styles.iconContainer}>
                            <ZORRRO_SVG.PROFILE_TAB.LOCATION width={20} height={20} fill="#6B7280" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>District</Text>
                            <Text style={styles.itemValue}>kolkata</Text>
                        </View>
                    </View>

                    {/* Joined on */}
                    <View style={styles.listItem}>
                        <View style={styles.iconContainer}>
                            <ZORRRO_SVG.PROFILE_TAB.JOINING width={20} height={20} fill="#6B7280" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemLabel}>Joined on</Text>
                            <Text style={styles.itemValue}>Jan 2024</Text>
                        </View>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Security Section */}
                <View style={styles.securityContainer}>
                    <Text style={styles.sectionTitle}>Security</Text>

                    {/* End-to-end encrypted */}
                    <View style={styles.securityItem}>
                        <View style={styles.securityIconWrapper}>
                            <ZORRRO_SVG.PROFILE_TAB.END_TO_END width={24} height={24} fill="#0084C8" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.securityValue}>End-to-end encrypted</Text>
                            <Text style={styles.securityDesc}>All messages are secured</Text>
                        </View>
                    </View>

                    {/* Device Verified */}
                    <View style={styles.securityItem}>
                        <View style={styles.securityIconWrapper}>
                            <ZORRRO_SVG.PROFILE_TAB.DEVICE width={24} height={24} fill="#0084C8" />
                        </View>
                        <View style={styles.itemContent}>
                            <Text style={styles.securityValue}>Device Verified</Text>
                            <Text style={styles.securityDesc}>IMEI bound . MDM enrolled</Text>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileLanding;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E5F1FA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#005988',
    },
    statusDot: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10B981', // Green status color
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
    },
    iconContainer: {
        width: 24,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContent: {
        flex: 1,
        justifyContent: 'center',
    },
    itemLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    itemValue: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    securityContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
        marginBottom: 16,
    },
    securityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    securityIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E5F1FA',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    securityValue: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '600',
        marginBottom: 2,
    },
    securityDesc: {
        fontSize: 13,
        color: '#9CA3AF',
    },
});