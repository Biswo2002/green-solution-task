import React from 'react';
import { Text } from 'react-native';
import { ZorrroView } from '$/components';
import { SosDetailsStyles } from '$/styles/screenStyle/SosDetails.style';
import { SubmittedInfo } from './types';

interface SubmittedInfoCardProps {
    submittedInfo: SubmittedInfo;
    renderEvidenceIcon: (type: string) => React.ReactNode;
}

const SubmittedInfoCard = ({ submittedInfo, renderEvidenceIcon }: SubmittedInfoCardProps) => {
    return (
        <ZorrroView style={SosDetailsStyles.submittedInfoContainer}>
            <Text style={SosDetailsStyles.sectionTitle}>Additional info</Text>
            <ZorrroView style={SosDetailsStyles.infoCard}>
                <Text style={SosDetailsStyles.infoRowText}>Emergency Type -: {submittedInfo.type}</Text>
                <Text style={SosDetailsStyles.infoRowText}>
                    Quick info-: {submittedInfo.quickInfos.join(', ')}
                </Text>
                <Text style={SosDetailsStyles.infoRowText}>Evidence-:</Text>

                {submittedInfo.evidence.map(item => (
                    <ZorrroView key={item.id} style={SosDetailsStyles.evidenceItemCard}>
                        {renderEvidenceIcon(item.type)}
                        <Text style={SosDetailsStyles.evidenceItemName}>{item.name}</Text>
                    </ZorrroView>
                ))}
            </ZorrroView>
        </ZorrroView>
    );
};

export default SubmittedInfoCard;
