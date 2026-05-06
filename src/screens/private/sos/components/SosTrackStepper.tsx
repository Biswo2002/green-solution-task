import React from 'react';
import { Text } from 'react-native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';
import { SosDetailsStyles } from '$/styles/screenStyle/SosDetails.style';

interface SosTrackStepperProps {
    step: number;
}

const SosTrackStepper = ({ step }: SosTrackStepperProps) => {
    return (
        <ZorrroView style={SosDetailsStyles.stepperContainer}>
            <Text style={SosDetailsStyles.sectionTitle}>SOS Track</Text>

            <ZorrroView style={SosDetailsStyles.stepRow}>
                <ZorrroView style={SosDetailsStyles.stepIndicator}>
                    <ZorrroView style={SosDetailsStyles.dotFilled} />
                    <ZorrroView
                        style={step >= 2 ? SosDetailsStyles.lineFilled : SosDetailsStyles.lineDashed}
                    />
                </ZorrroView>
                <ZorrroView style={SosDetailsStyles.stepContent}>
                    <Text style={SosDetailsStyles.stepTitle}>Sending</Text>
                    <Text style={SosDetailsStyles.stepTime}>13:46</Text>
                </ZorrroView>
            </ZorrroView>

            <ZorrroView style={SosDetailsStyles.stepRow}>
                <ZorrroView style={SosDetailsStyles.stepIndicator}>
                    {step >= 2 ? (
                        <ZorrroView style={SosDetailsStyles.dotFilled} />
                    ) : (
                        <ZORRRO_SVG.SOS.HISTORY width={16} height={16} fill="#E1CC0F" stroke="#E1CC0F" />
                    )}
                    <ZorrroView
                        style={step >= 3 ? SosDetailsStyles.lineFilled : SosDetailsStyles.lineDashed}
                    />
                </ZorrroView>
                <ZorrroView style={SosDetailsStyles.stepContent}>
                    <Text style={[SosDetailsStyles.stepTitle, step < 2 && SosDetailsStyles.stepTitlePending]}>
                        SOS Received
                    </Text>
                    {step >= 2 && <Text style={SosDetailsStyles.stepTime}>13:46</Text>}
                </ZorrroView>
            </ZorrroView>

            <ZorrroView style={SosDetailsStyles.stepRow}>
                <ZorrroView style={SosDetailsStyles.stepIndicator}>
                    {step >= 3 ? (
                        <ZorrroView style={SosDetailsStyles.dotFilled} />
                    ) : (
                        <ZORRRO_SVG.SOS.HISTORY width={16} height={16} fill="#E1CC0F" stroke="#E1CC0F" />
                    )}
                    <ZorrroView
                        style={step >= 4 ? SosDetailsStyles.lineFilled : SosDetailsStyles.lineDashed}
                    />
                </ZorrroView>
                <ZorrroView style={SosDetailsStyles.stepContent}>
                    <Text style={[SosDetailsStyles.stepTitle, step < 3 && SosDetailsStyles.stepTitlePending]}>
                        Help Arriving
                    </Text>
                    {step >= 3 && <Text style={SosDetailsStyles.stepTime}>13:47</Text>}
                </ZorrroView>
            </ZorrroView>

            <ZorrroView style={SosDetailsStyles.stepRow}>
                <ZorrroView style={[SosDetailsStyles.stepIndicator, { height: 24 }]}>
                    {step >= 4 ? (
                        <ZorrroView style={SosDetailsStyles.dotFilled} />
                    ) : (
                        <ZORRRO_SVG.SOS.HISTORY width={16} height={16} fill="#E1CC0F" stroke="#E1CC0F" />
                    )}
                </ZorrroView>
                <ZorrroView style={SosDetailsStyles.stepContent}>
                    <Text style={[SosDetailsStyles.stepTitle, step < 4 && SosDetailsStyles.stepTitlePending]}>
                        Resolved
                    </Text>
                    {step >= 4 && <Text style={SosDetailsStyles.stepTime}>13:47</Text>}
                </ZorrroView>
            </ZorrroView>
        </ZorrroView>
    );
};

export default SosTrackStepper;
