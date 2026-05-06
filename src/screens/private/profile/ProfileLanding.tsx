import { StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { ZORRRO_SVG } from '../../../assets';
import { ScreenStatusBar, ZorrroView } from '$/components';
import { ZORRRO_COLORS, ZORRRO_FONTS } from '$/styles';
import { getMargin } from '$/components/helper';

const PROFILE_DETAILS = [
    {
        id: 'email',
        label: 'Email',
        value: 'rajesh.kumar@gov.in',
        Icon: ZORRRO_SVG.PROFILE_TAB.EMAIL,
    },
    {
        id: 'phone',
        label: 'Phone',
        value: '+91 98765 43210',
        Icon: ZORRRO_SVG.PROFILE_TAB.PHONE,
    },
    {
        id: 'department',
        label: 'Department',
        value: 'Revenue',
        Icon: ZORRRO_SVG.PROFILE_TAB.REVENUE,
    },
    {
        id: 'district',
        label: 'District',
        value: 'kolkata',
        Icon: ZORRRO_SVG.PROFILE_TAB.LOCATION,
    },
    {
        id: 'joinedOn',
        label: 'Joined on',
        value: 'Jan 2024',
        Icon: ZORRRO_SVG.PROFILE_TAB.JOINING,
    },
];

const SECURITY_ITEMS = [
    {
        id: 'encryption',
        title: 'End-to-end encrypted',
        description: 'All messages are secured',
        Icon: ZORRRO_SVG.PROFILE_TAB.END_TO_END,
    },
    {
        id: 'device',
        title: 'Device Verified',
        description: 'IMEI bound . MDM enrolled',
        Icon: ZORRRO_SVG.PROFILE_TAB.DEVICE,
    },
];

const ProfileLanding = () => {
    return (
        <ZorrroView safe edges={['top', 'left', 'right']} style={styles.safeArea}>
            <ScreenStatusBar backgroundColor={ZORRRO_COLORS?.WHITE} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ZorrroView style={styles.headerContainer}>
                    <ZorrroView style={styles.avatarWrapper}>
                        <ZorrroView style={styles.avatar}>
                            <Text style={styles.avatarText}>RK</Text>
                        </ZorrroView>
                        <ZorrroView style={styles.statusDot} />
                    </ZorrroView>
                    <Text style={styles.profileName}>Rajesh Kumar</Text>
                </ZorrroView>
                <ZorrroView style={styles.divider} />

                <ZorrroView style={styles.sectionContainer}>
                    {PROFILE_DETAILS.map(item => (
                        <ZorrroView key={item.id} style={styles.listItem}>
                            <ZorrroView style={styles.iconContainer}>
                                <item.Icon width={20} height={20} fill="#6B7280" />
                            </ZorrroView>
                            <ZorrroView style={styles.itemContent}>
                                <Text style={styles.itemLabel}>{item.label}</Text>
                                <Text style={styles.itemValue}>{item.value}</Text>
                            </ZorrroView>
                        </ZorrroView>
                    ))}
                </ZorrroView>

                <ZorrroView style={styles.divider} />

                <ZorrroView style={styles.securityContainer}>
                    <Text style={styles.sectionTitle}>Security</Text>
                    {SECURITY_ITEMS.map(item => (
                        <ZorrroView key={item.id} style={styles.securityItem}>
                            <ZorrroView style={styles.securityIconWrapper}>
                                <item.Icon width={24} height={24} fill="#0084C8" />
                            </ZorrroView>
                            <ZorrroView style={styles.itemContent}>
                                <Text style={styles.securityValue}>{item.title}</Text>
                                <Text style={styles.securityDesc}>{item.description}</Text>
                            </ZorrroView>
                        </ZorrroView>
                    ))}
                </ZorrroView>
            </ScrollView>
        </ZorrroView>
    );
};

export default ProfileLanding;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: ZORRRO_COLORS?.WHITE,
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        marginTop: getMargin(34),
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
        backgroundColor: '#10B981',
        borderWidth: 2,
        borderColor: ZORRRO_COLORS?.WHITE,
    },
    profileName: {
        fontSize: 20,
        fontFamily: ZORRRO_FONTS?.[700]?.normal,
        color: '#171D26',
    },
    sectionContainer: {
        paddingHorizontal: getMargin(16),
        marginBottom: getMargin(10),
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
        backgroundColor: '#DAE0E7',
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