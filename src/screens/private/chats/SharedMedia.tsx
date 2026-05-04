import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = (width - 40 - (SPACING * 3)) / 4;

type TabType = 'Media' | 'Doc' | 'Link';

const MOCK_SECTIONS = [
    { title: 'This Week', count: 7 },
    { title: 'March 20 -19 ,2026', count: 8 },
    { title: 'March 20 -19 ,2026', count: 8 },
];

const SharedMedia = () => {
    const navigation = useNavigation<any>();
    const [activeTab, setActiveTab] = useState<TabType>('Media');

    const renderTabs = () => (
        <View style={styles.tabsContainer}>
            {(['Media', 'Doc', 'Link'] as TabType[]).map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tabPill, activeTab === tab && styles.tabPillActive]}
                    onPress={() => setActiveTab(tab)}
                >
                    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderMediaContent = () => (
        <View style={styles.contentContainer}>
            {MOCK_SECTIONS.map((section, sIndex) => (
                <View key={sIndex} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <View style={styles.gridContainer}>
                        {Array.from({ length: section.count }).map((_, i) => (
                            <View key={i} style={styles.mediaItem}>
                                <Image
                                    source={{ uri: 'https://picsum.photos/200/200?random=' + (sIndex * 10 + i) }}
                                    style={styles.mediaImage}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );

    const renderDocContent = () => (
        <View style={styles.contentContainer}>
            {MOCK_SECTIONS.map((section, sIndex) => (
                <View key={sIndex} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <View style={styles.gridContainer}>
                        {Array.from({ length: section.count }).map((_, i) => (
                            <View key={i} style={styles.docItemWrapper}>
                                <View style={styles.docItemBox}>
                                    <View style={styles.docIconCircle}>
                                        <ZORRRO_SVG.SCREENS.DOWNLOAD width={18} height={18} color="#4B5563" />
                                    </View>
                                </View>
                                <Text style={styles.docName} numberOfLines={1}>Doc name</Text>
                                <Text style={styles.docMeta}>1 MB . PNG</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );

    const renderLinkContent = () => (
        <View style={styles.contentContainer}>
            {MOCK_SECTIONS.map((section, sIndex) => (
                <View key={sIndex} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <View key={i} style={styles.linkRow}>
                            <View style={styles.linkIconBox}>
                                <ZORRRO_SVG.SCREENS.LINK width={20} height={20} color="#6B7280" />
                            </View>
                            <View style={styles.linkInfo}>
                                <Text style={styles.linkTitle} numberOfLines={1}>Hellosafaritravels.com</Text>
                                <Text style={styles.linkSubtitle} numberOfLines={1}>hellosafaritravels.com</Text>
                            </View>
                            <View style={styles.linkArrow}>
                                <Text style={styles.arrowIcon}>↗</Text>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );

    return (
        <ZorrroView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
                </TouchableOpacity>
            </View>

            {renderTabs()}

            <ScrollView showsVerticalScrollIndicator={false}>
                {activeTab === 'Media' && renderMediaContent()}
                {activeTab === 'Doc' && renderDocContent()}
                {activeTab === 'Link' && renderLinkContent()}
            </ScrollView>
        </ZorrroView>
    );
};

export default SharedMedia;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 20,
    },
    backButton: {
        padding: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    tabPill: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 12,
        backgroundColor: '#FFFFFF',
    },
    tabPillActive: {
        borderColor: '#0084C8',
        backgroundColor: '#F0F9FF',
    },
    tabText: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#0084C8',
    },
    contentContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
        marginBottom: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -SPACING / 2,
    },
    // Media Styles
    mediaItem: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        marginHorizontal: SPACING / 2,
        marginBottom: SPACING,
        borderRadius: 8,
        overflow: 'hidden',
    },
    mediaImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F3F4F6',
    },
    // Doc Styles
    docItemWrapper: {
        width: ITEM_SIZE,
        marginHorizontal: SPACING / 2,
        marginBottom: SPACING + 10,
        alignItems: 'center',
    },
    docItemBox: {
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    docIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#6B7280',
        justifyContent: 'center',
        alignItems: 'center',
    },
    docName: {
        fontSize: 12,
        color: '#1F2937',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 2,
    },
    docMeta: {
        fontSize: 10,
        color: '#9CA3AF',
        textAlign: 'center',
    },
    // Link Styles
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    linkIconBox: {
        width: 48,
        height: 48,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    linkInfo: {
        flex: 1,
    },
    linkTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    linkSubtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    linkArrow: {
        marginLeft: 16,
    },
    arrowIcon: {
        fontSize: 20,
        color: '#6B7280',
    },
});
