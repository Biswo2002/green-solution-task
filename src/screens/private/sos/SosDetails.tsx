import { Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import { EvidenceItem, SubmittedInfo, SosTypeOption } from './components/types';
import SosAdditionalInfoSheet from './components/SosAdditionalInfoSheet';
import { SosDetailsStyles } from '$/styles/screenStyle/SosDetails.style';
import SubmittedInfoCard from './components/SubmittedInfoCard';
import SosTrackStepper from './components/SosTrackStepper';
import { ZorrroView } from '$/components';
import { ZORRRO_SVG } from '$/assets';

const SOS_TYPES: SosTypeOption[] = [
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
            }, 4000);
            // }, 900000);

            return () => clearTimeout(timer);
        }
    }, [step]);

    const [isSheetVisible, setIsSheetVisible] = useState(false);

    // Form state
    const [selectedType, setSelectedType] = useState<string | null>('Medical');
    const [selectedInfos, setSelectedInfos] = useState<string[]>([
        'Need ambulance',
    ]);
    const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([
        { id: '1', type: 'audio', name: 'Voice note (11s)' },
        { id: '2', type: 'photo', name: 'Desktop - 83.png' },
        { id: '3', type: 'video', name: 'Desktop - 83.mp4' },
    ]);

    const [submittedInfo, setSubmittedInfo] = useState<SubmittedInfo>({
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
            prev.includes(info) ? prev.filter(i => i !== info) : [...prev, info],
        );
    };

    const removeEvidence = (id: string) => {
        setEvidenceItems(prev => prev.filter(item => item.id !== id));
    };

    const getEvidenceIcon = (type: string) => {
        switch (type) {
            case 'audio':
                return (
                    <ZORRRO_SVG.CHAT_SCREENS.AUDIO
                        width={16}
                        height={16}
                        color="#0084C8"
                    />
                );
            case 'photo':
                return (
                    <ZORRRO_SVG.CHAT_SCREENS.CAMERA
                        width={16}
                        height={16}
                        color="#0084C8"
                    />
                );
            case 'video':
                return (
                    <ZORRRO_SVG.SCREENS.VIDEO_ICON
                        width={16}
                        height={16}
                        color="#0084C8"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <ZorrroView style={SosDetailsStyles.safeArea}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={isResolved ? ['#29A393', '#0EC489'] : ['#F24E32', '#F8917D']}
                    useAngle
                    angle={108.39}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    style={SosDetailsStyles.headerGradient}
                >
                    <ZorrroView style={SosDetailsStyles.headerNav}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={SosDetailsStyles.backButton}
                        >
                            <ZORRRO_SVG.SCREENS.BACK_ARROW width={30} height={30} />
                        </TouchableOpacity>
                        <Text style={SosDetailsStyles.headerNavTitle}>SOS Details</Text>
                    </ZorrroView>
                    <ZorrroView style={SosDetailsStyles.headerContent}>
                        <Text style={SosDetailsStyles.mainHeading}>
                            {isResolved
                                ? 'Emergency\nAlert Resolved'
                                : 'Emergency\nAlert Sent'}
                        </Text>
                        <Text style={SosDetailsStyles.subHeading}>Help is coming, stay calm</Text>
                    </ZorrroView>
                </LinearGradient>

                <ZorrroView style={SosDetailsStyles.body}>
                    <SosTrackStepper step={step} />

                    <ZorrroView style={SosDetailsStyles.divider} />
                    {!isResolved && (
                        <TouchableOpacity
                            style={SosDetailsStyles.addInfoButton}
                            onPress={() => setIsSheetVisible(true)}
                        >
                            <Text style={SosDetailsStyles.addInfoText}>
                                Add Additional info(optional)
                            </Text>
                            <ZORRRO_SVG.SCREENS.RIGHT_ARROW
                                width={20}
                                height={20}
                                color="#111827"
                            />
                        </TouchableOpacity>
                    )}

                    {submittedInfo && (
                        <SubmittedInfoCard
                            submittedInfo={submittedInfo}
                            renderEvidenceIcon={getEvidenceIcon}
                        />
                    )}
                </ZorrroView>
            </ScrollView>

            <SosAdditionalInfoSheet
                visible={isSheetVisible}
                onDismiss={() => setIsSheetVisible(false)}
                selectedType={selectedType}
                selectedInfos={selectedInfos}
                evidenceItems={evidenceItems}
                sosTypes={SOS_TYPES}
                quickInfos={QUICK_INFOS}
                onSelectType={setSelectedType}
                onToggleQuickInfo={toggleQuickInfo}
                onRemoveEvidence={removeEvidence}
                onSend={handleSendInfo}
                renderEvidenceIcon={getEvidenceIcon}
            />
        </ZorrroView>
    );
};

export default SosDetails;

