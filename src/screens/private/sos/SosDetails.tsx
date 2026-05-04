import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '$/components/core/BottomSheet';
import { ZORRRO_SVG } from '$/assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ZorrroView } from '$/components';

const SOS_TYPES = [
    { id: 'Medical', label: 'Medical', Icon: ZORRRO_SVG.SOS.MEDICAL },
    { id: 'Violence', label: 'Violence', Icon: ZORRRO_SVG.SOS.VIOLENCE },
    { id: 'Accident', label: 'Accident', Icon: ZORRRO_SVG.SOS.ACCIDENT },
    { id: 'Maternal', label: 'Maternal', Icon: ZORRRO_SVG.SOS.MATERNAL },
    { id: 'Child', label: 'Child', Icon: ZORRRO_SVG.SOS.CHILD },
    { id: 'Other', label: 'Other', Icon: ZORRRO_SVG.SOS.OTHER },
];

const QUICK_INFOS = ['Need ambulance', 'In danger', 'Come fast'];

const SosDetails = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();

    const initialStatus = route.params?.status;
    const [step, setStep] = useState(initialStatus === 'Resolved' ? 4 : 1);
    const isResolved = step === 4;

    useEffect(() => {
        if (step < 4) {
            const timer = setTimeout(() => {
                setStep(prev => prev + 1);
            }, 1666);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const [isSheetVisible, setIsSheetVisible] = useState(false);

    // Form state
    const [selectedType, setSelectedType] = useState<string | null>('Medical');
    const [selectedInfos, setSelectedInfos] = useState<string[]>(['Need ambulance']);
    const [evidenceItems, setEvidenceItems] = useState([
        { id: '1', type: 'audio', name: 'Voice note (11s)' },
        { id: '2', type: 'photo', name: 'Desktop - 83.png' },
        { id: '3', type: 'video', name: 'Desktop - 83.mp4' },
    ]);

    // Submitted state (to show in main view)
    const [submittedInfo, setSubmittedInfo] = useState<any>({
        type: 'Medical',
        quickInfos: ['Need ambulance'],
        evidence: [
            { id: '1', type: 'audio', name: 'Voice note (11s)' },
            { id: '2', type: 'photo', name: 'Desktop - 83.png' },
            { id: '3', type: 'video', name: 'Desktop - 83.mp4' },
        ],
    });

    const handleSendInfo = () => {
        setSubmittedInfo({
            type: selectedType,
            quickInfos: selectedInfos,
            evidence: evidenceItems,
        });
        setIsSheetVisible(false);
    };

    const toggleQuickInfo = (info: string) => {
        setSelectedInfos(prev =>
            prev.includes(info) ? prev.filter(i => i !== info) : [...prev, info]
        );
    };

    const removeEvidence = (id: string) => {
        setEvidenceItems(prev => prev.filter(item => item.id !== id));
    };

    const renderStepper = () => {
        return (
            <View style={styles.stepperContainer}>
                <Text style={styles.sectionTitle}>SOS Track</Text>

                {/* Step 1 */}
                <View style={styles.stepRow}>
                    <View style={styles.stepIndicator}>
                        <View style={styles.dotFilled} />
                        <View style={step >= 2 ? styles.lineFilled : styles.lineDashed} />
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Sending</Text>
                        <Text style={styles.stepTime}>13:46</Text>
                    </View>
                </View>

                {/* Step 2 */}
                <View style={styles.stepRow}>
                    <View style={styles.stepIndicator}>
                        {step >= 2 ? <View style={styles.dotFilled} /> : <ZORRRO_SVG.SOS.HISTORY width={16} height={16} fill="#EAB308" />}
                        <View style={step >= 3 ? styles.lineFilled : styles.lineDashed} />
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={[styles.stepTitle, step < 2 && styles.stepTitlePending]}>SOS Received</Text>
                        {step >= 2 && <Text style={styles.stepTime}>13:46</Text>}
                    </View>
                </View>

                {/* Step 3 */}
                <View style={styles.stepRow}>
                    <View style={styles.stepIndicator}>
                        {step >= 3 ? <View style={styles.dotFilled} /> : <ZORRRO_SVG.SOS.HISTORY width={16} height={16} fill="#EAB308" />}
                        <View style={step >= 4 ? styles.lineFilled : styles.lineDashed} />
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={[styles.stepTitle, step < 3 && styles.stepTitlePending]}>Help Arriving</Text>
                        {step >= 3 && <Text style={styles.stepTime}>13:47</Text>}
                    </View>
                </View>

                {/* Step 4 */}
                <View style={styles.stepRow}>
                    <View style={[styles.stepIndicator, { height: 24 }]}>
                        {step >= 4 ? <View style={styles.dotFilled} /> : <ZORRRO_SVG.SOS.HISTORY width={16} height={16} fill="#EAB308" />}
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={[styles.stepTitle, step < 4 && styles.stepTitlePending]}>Resolved</Text>
                        {step >= 4 && <Text style={styles.stepTime}>13:47</Text>}
                    </View>
                </View>
            </View>
        );
    };

    const getEvidenceIcon = (type: string) => {
        switch (type) {
            case 'audio': return <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={16} height={16} color="#0084C8" />;
            case 'photo': return <ZORRRO_SVG.CHAT_SCREENS.CAMERA width={16} height={16} color="#0084C8" />;
            case 'video': return <ZORRRO_SVG.SCREENS.VIDEO_ICON width={16} height={16} color="#0084C8" />;
            default: return null;
        }
    };

    return (
        <ZorrroView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <LinearGradient
                colors={isResolved ? ['#059669', '#10B981'] : ['#EF4444', '#F97316']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.headerGradient}
            >
                <ZorrroView>
                    <View style={styles.headerNav}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.headerNavTitle}>SOS Details</Text>
                    </View>
                    <View style={styles.headerContent}>
                        <Text style={styles.mainHeading}>
                            {isResolved ? 'Emergency\nAlert Resolved' : 'Emergency\nAlert Sent'}
                        </Text>
                        <Text style={styles.subHeading}>Help is coming, stay calm</Text>
                    </View>
                </ZorrroView>
            </LinearGradient>

            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                {renderStepper()}

                <View style={styles.divider} />

                {!isResolved && (
                    <TouchableOpacity
                        style={styles.addInfoButton}
                        onPress={() => setIsSheetVisible(true)}
                    >
                        <Text style={styles.addInfoText}>Add Additional info(optional)</Text>
                        <ZORRRO_SVG.SCREENS.RIGHT_ARROW width={20} height={20} color="#111827" />
                    </TouchableOpacity>
                )}

                {submittedInfo && (
                    <View style={styles.submittedInfoContainer}>
                        <Text style={styles.sectionTitle}>Additional info</Text>
                        <View style={styles.infoCard}>
                            <Text style={styles.infoRowText}>Emergency Type -: {submittedInfo.type}</Text>
                            <Text style={styles.infoRowText}>Quick info-: {submittedInfo.quickInfos.join(', ')}</Text>
                            <Text style={styles.infoRowText}>Evidence-:</Text>

                            {submittedInfo.evidence.map((item: any) => (
                                <View key={item.id} style={styles.evidenceItemCard}>
                                    {getEvidenceIcon(item.type)}
                                    <Text style={styles.evidenceItemName}>{item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            <BottomSheet
                visible={isSheetVisible}
                onDismiss={() => setIsSheetVisible(false)}
                isClose={true}
                sheetContainerStyle={styles.bottomSheet}
            >
                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Add Additional info (Optional)</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setIsSheetVisible(false)}>
                        <Text style={styles.closeBtnText}>✕</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sheetSection}>
                    <Text style={styles.sheetSectionTitle}>Emergency Type</Text>
                    <View style={styles.gridContainer}>
                        {SOS_TYPES.map((type) => {
                            const isSelected = selectedType === type.id;
                            const Icon = type.Icon;
                            return (
                                <TouchableOpacity
                                    key={type.id}
                                    style={[styles.gridItem, isSelected && styles.gridItemSelected]}
                                    onPress={() => setSelectedType(type.id)}
                                >
                                    <Icon width={24} height={24} fill={isSelected ? "#0084C8" : "#6B7280"} />
                                    <Text style={[styles.gridItemText, isSelected && styles.gridItemTextSelected]}>
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.sheetSection}>
                    <Text style={styles.sheetSectionTitle}>Quick Info</Text>
                    <View style={styles.pillContainer}>
                        {QUICK_INFOS.map((info) => {
                            const isSelected = selectedInfos.includes(info);
                            return (
                                <TouchableOpacity
                                    key={info}
                                    style={[styles.pill, isSelected && styles.pillSelected]}
                                    onPress={() => toggleQuickInfo(info)}
                                >
                                    <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>{info}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.sheetSection}>
                    <Text style={styles.sheetSectionTitle}>Add Evidence</Text>
                    <View style={styles.evidenceBtnRow}>
                        <TouchableOpacity style={styles.evidenceBtn}>
                            <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={16} height={16} color="#6B7280" />
                            <Text style={styles.evidenceBtnText}>Audio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.evidenceBtn}>
                            <ZORRRO_SVG.CHAT_SCREENS.CAMERA width={16} height={16} color="#6B7280" />
                            <Text style={styles.evidenceBtnText}>Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.evidenceBtn}>
                            <ZORRRO_SVG.SCREENS.VIDEO_ICON width={16} height={16} color="#6B7280" />
                            <Text style={styles.evidenceBtnText}>Video</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {evidenceItems.length > 0 && (
                    <View style={styles.sheetSection}>
                        {evidenceItems.map(item => (
                            <View key={item.id} style={styles.evidenceListItem}>
                                <View style={styles.evidenceListLeft}>
                                    {getEvidenceIcon(item.type)}
                                    <Text style={styles.evidenceListName}>{item.name}</Text>
                                </View>
                                <TouchableOpacity onPress={() => removeEvidence(item.id)}>
                                    <Text style={styles.evidenceListClose}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity style={styles.sendButton} onPress={handleSendInfo}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>

            </BottomSheet>
        </ZorrroView>
    );
};

export default SosDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerGradient: {
        paddingTop: Platform.OS === 'android' ? 40 : 0,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    headerNav: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    backButton: {
        marginRight: 12,
    },
    headerNavTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    headerContent: {
        marginTop: 10,
    },
    mainHeading: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 38,
        marginBottom: 8,
    },
    subHeading: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.9,
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 20,
    },
    stepperContainer: {
        marginBottom: 10,
    },
    stepRow: {
        flexDirection: 'row',
    },
    stepIndicator: {
        alignItems: 'center',
        width: 30,
    },
    dotFilled: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#10B981',
        zIndex: 1,
    },
    lineFilled: {
        width: 2,
        height: 40,
        backgroundColor: '#10B981',
        marginVertical: 4,
    },
    lineDashed: {
        width: 2,
        height: 40,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
        marginVertical: 4,
    },
    stepContent: {
        flex: 1,
        paddingLeft: 10,
        paddingBottom: 30,
        justifyContent: 'flex-start',
        marginTop: -2,
    },
    stepTitle: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },
    stepTitlePending: {
        color: '#6B7280',
    },
    stepTime: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: -20,
        marginBottom: 20,
    },
    addInfoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    addInfoText: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '500',
    },
    submittedInfoContainer: {
        marginTop: 10,
        paddingBottom: 40,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        padding: 20,
    },
    infoRowText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    evidenceItemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    evidenceItemName: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 12,
    },
    bottomSheet: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sheetTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    closeBtn: {
        backgroundColor: '#F3F4F6',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        fontSize: 12,
        color: '#4B5563',
    },
    sheetSection: {
        marginBottom: 20,
    },
    sheetSectionTitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '31%',
        aspectRatio: 1.2,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    gridItemSelected: {
        borderColor: '#0084C8',
    },
    gridItemText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 8,
    },
    gridItemTextSelected: {
        color: '#0084C8',
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
        marginBottom: 10,
    },
    pillSelected: {
        borderColor: '#0084C8',
    },
    pillText: {
        fontSize: 14,
        color: '#6B7280',
    },
    pillTextSelected: {
        color: '#0084C8',
    },
    evidenceBtnRow: {
        flexDirection: 'row',
    },
    evidenceBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginRight: 10,
    },
    evidenceBtnText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 6,
    },
    evidenceListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    evidenceListLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    evidenceListName: {
        fontSize: 14,
        color: '#4B5563',
        marginLeft: 12,
    },
    evidenceListClose: {
        fontSize: 16,
        color: '#4B5563',
    },
    sendButton: {
        backgroundColor: '#0084C8',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
