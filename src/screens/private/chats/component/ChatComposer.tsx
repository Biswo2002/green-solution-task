import React from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { ZORRRO_SVG } from '$/assets';
import { ZorrroView } from '$/components';

interface ChatComposerProps {
    isRecording: boolean;
    isRecordPaused: boolean;
    inputText: string;
    setInputText: (value: string) => void;
    recordDuration: number;
    onAttachmentPress: () => void;
    onSendPress: () => void;
    onRecordStart: () => void;
    onRecordPauseToggle: () => void;
    onRecordCancel: () => void;
    onRecordSend: () => void;
    onInputFocus?: () => void;
    styles: any;
}

const ChatComposer = ({
    isRecording,
    isRecordPaused,
    inputText,
    setInputText,
    recordDuration,
    onAttachmentPress,
    onSendPress,
    onRecordStart,
    onRecordPauseToggle,
    onRecordCancel,
    onRecordSend,
    onInputFocus,
    styles,
}: ChatComposerProps) => {
    const durationLabel = `${Math.floor(recordDuration / 60)}:${(recordDuration % 60)
        .toString()
        .padStart(2, '0')}`;

    if (isRecording) {
        return (
            <ZorrroView style={styles.recordingPanel}>
                <ZorrroView style={styles.recordingTopRow}>
                    <Text style={styles.recordingLiveDot}>●</Text>
                    <ZorrroView style={styles.recordingWaveformRow}>
                        {Array.from({ length: 30 }).map((_, index) => (
                            <ZorrroView
                                key={`wave-${index}`}
                                style={[
                                    styles.recordingWaveBar,
                                    { height: index % 3 === 0 ? 16 : index % 2 === 0 ? 12 : 8 },
                                ]}
                            />
                        ))}
                    </ZorrroView>
                    <Text style={styles.recordingDurationText}>{durationLabel}</Text>
                </ZorrroView>

                <ZorrroView style={styles.recordingBottomRow}>
                    <TouchableOpacity onPress={onRecordCancel}>
                        <ZORRRO_SVG.CHAT_SCREENS.DELETE width={24} height={24} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRecordPauseToggle}>
                        {isRecordPaused ? (
                            <ZORRRO_SVG.CHAT_SCREENS.RESUME width={32} height={32} />
                        ) : (
                            <ZORRRO_SVG.CHAT_SCREENS.PAUSE width={32} height={32} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.recordingSendButton} onPress={onRecordSend}>
                        <ZORRRO_SVG.CHAT_SCREENS.SEND width={18} height={18} color="#FFFFFF" />
                    </TouchableOpacity>
                </ZorrroView>
            </ZorrroView>
        );
    }

    return (
        <ZorrroView style={styles.inputContainer}>
            <ZorrroView style={styles.leftActionRow}>
                <TouchableOpacity onPress={onAttachmentPress}>
                    <ZORRRO_SVG.CHAT_SCREENS.DOC_SHEET width={22} height={22} color="#111827" />
                </TouchableOpacity>
            </ZorrroView>
            <ZorrroView style={styles.textInputWrapper}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message..."
                    placeholderTextColor="#9CA3AF"
                    value={inputText}
                    onChangeText={setInputText}
                    onFocus={onInputFocus}
                    multiline
                />
            </ZorrroView>
            {inputText.trim().length > 0 ? (
                <TouchableOpacity style={styles.sendButton} onPress={onSendPress}>
                    <ZORRRO_SVG.CHAT_SCREENS.SEND width={20} height={20} color="#FFFFFF" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.sendButton} onPress={onRecordStart}>
                    <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={20} height={20} color="#FFFFFF" />
                </TouchableOpacity>
            )}
        </ZorrroView>
    );
};

export default ChatComposer;
