import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import BottomSheet from '$/components/core/BottomSheet';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';
import { getMargin } from '$/components/helper';
import { SosDetailsStyles } from '$/styles/screenStyle/SosDetails.style';
import { EvidenceItem, SosTypeOption } from './types';

interface SosAdditionalInfoSheetProps {
    visible: boolean;
    onDismiss: () => void;
    selectedType: string | null;
    selectedInfos: string[];
    evidenceItems: EvidenceItem[];
    sosTypes: SosTypeOption[];
    quickInfos: string[];
    onSelectType: (typeId: string) => void;
    onToggleQuickInfo: (info: string) => void;
    onRemoveEvidence: (id: string) => void;
    onSend: () => void;
    renderEvidenceIcon: (type: string) => React.ReactNode;
}

const SosAdditionalInfoSheet = ({
    visible,
    onDismiss,
    selectedType,
    selectedInfos,
    evidenceItems,
    sosTypes,
    quickInfos,
    onSelectType,
    onToggleQuickInfo,
    onRemoveEvidence,
    onSend,
    renderEvidenceIcon,
}: SosAdditionalInfoSheetProps) => {
    return (
        <BottomSheet
            visible={visible}
            onDismiss={onDismiss}
            isClose={true}
            sheetContainerStyle={SosDetailsStyles.bottomSheet}
        >
            <ZorrroView style={SosDetailsStyles.sheetHeader}>
                <Text style={SosDetailsStyles.sheetTitle}>Add Additional info (Optional)</Text>
                <TouchableOpacity style={SosDetailsStyles.closeBtn} onPress={onDismiss}>
                    <Text style={SosDetailsStyles.closeBtnText}>✕</Text>
                </TouchableOpacity>
            </ZorrroView>

            <ZorrroView>
                <Text style={SosDetailsStyles.sheetSectionTitle}>Emergency Type</Text>
                <ZorrroView style={SosDetailsStyles.gridContainer}>
                    {sosTypes.map(type => {
                        const isSelected = selectedType === type.id;
                        const Icon = type.Icon;
                        return (
                            <TouchableOpacity
                                key={type.id}
                                style={[
                                    SosDetailsStyles.gridItem,
                                    isSelected && SosDetailsStyles.gridItemSelected,
                                ]}
                                onPress={() => onSelectType(type.id)}
                            >
                                <Icon
                                    width={
                                        type.id === 'Violence' || type.id === 'Accident' ? 67 : 58
                                    }
                                    height={51}
                                    fill={isSelected ? '#0084C8' : '#6B7280'}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ZorrroView>
            </ZorrroView>

            <ZorrroView style={[SosDetailsStyles.sheetSection, { marginTop: getMargin(-40) }]}>
                <Text style={SosDetailsStyles.sheetSectionTitle}>Quick Info</Text>
                <ZorrroView style={SosDetailsStyles.pillContainer}>
                    {quickInfos.map(info => {
                        const isSelected = selectedInfos.includes(info);
                        return (
                            <TouchableOpacity
                                key={info}
                                style={[SosDetailsStyles.pill, isSelected && SosDetailsStyles.pillSelected]}
                                onPress={() => onToggleQuickInfo(info)}
                            >
                                <Text
                                    style={[
                                        SosDetailsStyles.pillText,
                                        isSelected && SosDetailsStyles.pillTextSelected,
                                    ]}
                                >
                                    {info}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ZorrroView>
            </ZorrroView>

            <ZorrroView style={SosDetailsStyles.sheetSection}>
                <Text style={SosDetailsStyles.sheetSectionTitle}>Add Evidence</Text>
                <ZorrroView style={SosDetailsStyles.evidenceBtnRow}>
                    <TouchableOpacity style={SosDetailsStyles.evidenceBtn}>
                        <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={16} height={16} color="#6B7280" />
                        <Text style={SosDetailsStyles.evidenceBtnText}>Audio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SosDetailsStyles.evidenceBtn}>
                        <ZORRRO_SVG.CHAT_SCREENS.CAMERA width={16} height={16} color="#6B7280" />
                        <Text style={SosDetailsStyles.evidenceBtnText}>Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SosDetailsStyles.evidenceBtn}>
                        <ZORRRO_SVG.SCREENS.VIDEO_ICON width={16} height={16} color="#6B7280" />
                        <Text style={SosDetailsStyles.evidenceBtnText}>Video</Text>
                    </TouchableOpacity>
                </ZorrroView>
            </ZorrroView>

            {evidenceItems.length > 0 && (
                <ZorrroView style={SosDetailsStyles.sheetSection}>
                    {evidenceItems.map(item => (
                        <ZorrroView key={item.id} style={SosDetailsStyles.evidenceListItem}>
                            <ZorrroView style={SosDetailsStyles.evidenceListLeft}>
                                {renderEvidenceIcon(item.type)}
                                <Text style={SosDetailsStyles.evidenceListName}>{item.name}</Text>
                            </ZorrroView>
                            <TouchableOpacity onPress={() => onRemoveEvidence(item.id)}>
                                <Text style={SosDetailsStyles.evidenceListClose}>✕</Text>
                            </TouchableOpacity>
                        </ZorrroView>
                    ))}
                </ZorrroView>
            )}

            <TouchableOpacity style={SosDetailsStyles.sendButton} onPress={onSend}>
                <Text style={SosDetailsStyles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </BottomSheet>
    );
};

export default SosAdditionalInfoSheet;
