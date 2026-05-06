import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Platform,
    UIManager,
    Image,
    Animated,
    Alert,
    PermissionsAndroid,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ZORRRO_SVG } from '$/assets';
import {
    pickImageNative,
    pickDocumentNative,
    startRecordingNative,
    stopRecordingNative,
    playAudioNative,
    stopAudioNative,
    getRecentImagesNative,
} from '$/utils/nativeModules';
import type {
    PickedDocument,
    PickedImage,
    RecentImage,
} from '$/utils/nativeModules';
import { triggerHaptic } from '$/utils/haptics';
import { ScreenStatusBar, ZorrroView } from '$/components';
import { ZORRRO_COLORS } from '$/styles';
import ChatDetailsHeader from './component/ChatDetailsHeader';
import ChatComposer from './component/ChatComposer';
import { ChatDetailsStyles } from '$/styles/screenStyle/ChatDetails.style';

const MOCK_MESSAGES: any[] = [
    {
        id: '1',
        type: 'text',
        text: 'Good morning sir. The vaccination drive report for Varanasi district is ready.',
        time: '9:30 AM',
        isSent: false,
    },
    {
        id: '2',
        type: 'text',
        text: 'Good morning Rajesh. Please share the document.',
        time: '9:32 AM',
        isSent: true,
    },
    {
        id: '3',
        type: 'document',
        text: '',
        fileName: 'Varanasi_Report.pdf',
        fileSize: '2.4 MB',
        time: '9:34 AM',
        isSent: false,
    },
    {
        id: '4',
        type: 'text',
        text: "Thanks, I'll review it.",
        time: '9:36 AM',
        isSent: true,
    },
];

const ChatDetails = () => {
    type PendingAttachment =
        | { type: 'image'; data: PickedImage }
        | { type: 'document'; data: PickedDocument }
        | { type: 'audio'; data: { uri: string; durationLabel: string } };

    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const isGroup = route.params?.isGroup;
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMuteVisible, setIsMuteVisible] = useState(false);
    const [selectedMuteOption, setSelectedMuteOption] = useState('8 hours');
    const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
    const [recentImages, setRecentImages] = useState<RecentImage[]>([]);
    const [isLoadingRecentImages, setIsLoadingRecentImages] = useState(false);
    const [selectedRecentImages, setSelectedRecentImages] = useState<
        RecentImage[]
    >([]);
    const [pendingAttachment, setPendingAttachment] =
        useState<PendingAttachment | null>(null);
    const [isPreviewAudioPlaying, setIsPreviewAudioPlaying] = useState(false);

    // Premium Features States
    const [isTyping, setIsTyping] = useState(false);
    const [selectedMessageAction, setSelectedMessageAction] = useState<
        string | null
    >(null);

    // Custom Recording UI States
    const [isRecording, setIsRecording] = useState(false);
    const [isRecordPaused, setIsRecordPaused] = useState(false);
    const [recordDuration, setRecordDuration] = useState(0);
    const recordingInterval = useRef<any>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const previewAudioProgressAnim = useRef(new Animated.Value(0)).current;
    const recordStartX = useRef(0);
    const [isRecordCancelled, setIsRecordCancelled] = useState(false);
    const startRecordingTicker = () => {
        if (recordingInterval.current) {
            clearInterval(recordingInterval.current);
        }
        recordingInterval.current = setInterval(() => {
            setRecordDuration(prev => prev + 1);
        }, 1000);
    };

    const stopRecordingTicker = () => {
        if (recordingInterval.current) {
            clearInterval(recordingInterval.current);
            recordingInterval.current = null;
        }
    };


    // Audio Playback State
    const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
    const getReadableNativeError = (error: any, fallbackMessage: string) => {
        if (!error?.code) return fallbackMessage;
        const code = String(error.code);
        if (code === 'cancelled') return '';
        if (code === 'permission_denied')
            return 'Required permission is denied. Please allow access in settings.';
        if (code.includes('no_activity') || code.includes('no_controller'))
            return 'Unable to open picker right now. Please try again.';
        if (code.includes('busy'))
            return 'Another picker or recorder request is already running.';
        if (code.includes('not_recording')) return 'No active recording found.';
        if (code.includes('playback_error')) return 'Unable to preview this audio.';
        return error?.message || fallbackMessage;
    };

    const formatBytes = (bytes?: number) => {
        if (!bytes || bytes <= 0) return 'Unknown size';
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
            size /= 1024;
            index += 1;
        }
        return `${size.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
    };

    const requestAudioPermissionIfNeeded = async () => {
        if (Platform.OS !== 'android') return true;
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
    };

    const requestGalleryPermissionIfNeeded = async () => {
        if (Platform.OS !== 'android') return true;
        const sdkVersion = Number(Platform.Version);
        if (sdkVersion >= 33) {
            const status = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            );
            return status === PermissionsAndroid.RESULTS.GRANTED;
        }
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return status === PermissionsAndroid.RESULTS.GRANTED;
    };

    useEffect(() => {
        if (
            Platform.OS === 'android' &&
            UIManager.setLayoutAnimationEnabledExperimental
        ) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    useEffect(() => {
        const loadRecentImages = async () => {
            if (!isAttachmentVisible) return;
            setIsLoadingRecentImages(true);

            const hasPermission = await requestGalleryPermissionIfNeeded();
            if (!hasPermission) {
                setRecentImages([]);
                setIsLoadingRecentImages(false);
                return;
            }

            try {
                const mediaItems = await getRecentImagesNative(40);
                setRecentImages(mediaItems || []);
            } catch (error) {
                setRecentImages([]);
            } finally {
                setIsLoadingRecentImages(false);
            }
        };
        loadRecentImages();
    }, [isAttachmentVisible]);

    const sendMessage = (payload: any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                time: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                isSent: true,
                ...payload,
            },
        ]);

        if (!isGroup) {
            setIsTyping(true);
            setTimeout(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setIsTyping(false);
                setMessages(prev => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        type: 'text',
                        text: 'Got it! Thanks.',
                        time: new Date().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                        isSent: false,
                    },
                ]);
            }, 2000);
        }
    };

    const handleSend = () => {
        if (inputText.trim()) {
            sendMessage({ type: 'text', text: inputText });
            setInputText('');
        }
    };

    const handleRecordStart = async (pageX: number) => {
        const hasPermission = await requestAudioPermissionIfNeeded();
        if (!hasPermission) {
            Alert.alert(
                'Permission Required',
                'Microphone permission is required to record audio.',
            );
            return;
        }

        recordStartX.current = pageX;
        setIsRecordCancelled(false);
        setIsRecordPaused(false);
        setIsRecording(true);
        setRecordDuration(0);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        triggerHaptic('selection');
        startRecordingTicker();

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();

        try {
            await startRecordingNative();
        } catch (e: any) {
            setIsRecording(false);
            const message = getReadableNativeError(e, 'Unable to start recording.');
            if (message) Alert.alert('Recorder Error', message);
        }
    };

    const stopAndFinalizeRecording = async (didCancel: boolean) => {
        setIsRecordCancelled(didCancel);
        setIsRecording(false);
        pulseAnim.stopAnimation();
        stopRecordingTicker();

        const currentDuration = recordDuration;
        let audioUri = '';
        try {
            audioUri = await stopRecordingNative();
        } catch (e: any) {
            const message = getReadableNativeError(e, 'Unable to stop recording.');
            if (message) Alert.alert('Recorder Error', message);
        }

        if (!didCancel && currentDuration > 0 && audioUri) {
            const mins = Math.floor(currentDuration / 60);
            const secs = currentDuration % 60;
            const durationStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            setPendingAttachment({
                type: 'audio',
                data: { uri: audioUri, durationLabel: durationStr },
            });
            triggerHaptic('medium');
        } else if (didCancel) {
            triggerHaptic('warning');
        }
        setRecordDuration(0);
        setIsRecordPaused(false);
    };

    const handleRecordStop = async (releasePageX: number) => {
        const didCancel = recordStartX.current - releasePageX > 80;
        await stopAndFinalizeRecording(didCancel);
    };

    const handleRecordCancel = async () => {
        await stopAndFinalizeRecording(true);
    };

    const handleRecordSend = async () => {
        await stopAndFinalizeRecording(false);
    };

    const handleRecordPauseToggle = () => {
        if (!isRecording) return;
        if (isRecordPaused) {
            startRecordingTicker();
            setIsRecordPaused(false);
        } else {
            stopRecordingTicker();
            setIsRecordPaused(true);
        }
    };

    const handlePickImage = async () => {
        setIsAttachmentVisible(false);
        setSelectedRecentImages([]);
        triggerHaptic('selection');
        try {
            const image = await pickImageNative('gallery');
            if (image?.uri) {
                setPendingAttachment({ type: 'image', data: image });
                triggerHaptic('medium');
            }
        } catch (e: any) {
            const message = getReadableNativeError(e, 'Unable to pick image.');
            if (message) Alert.alert('Media Error', message);
        }
    };

    const handleCamera = async () => {
        setIsAttachmentVisible(false);
        setSelectedRecentImages([]);
        triggerHaptic('selection');
        try {
            const image = await pickImageNative('camera');
            if (image?.uri) {
                setPendingAttachment({ type: 'image', data: image });
                triggerHaptic('medium');
            }
        } catch (e: any) {
            const message = getReadableNativeError(e, 'Unable to capture image.');
            if (message) Alert.alert('Camera Error', message);
        }
    };

    const handleMockDocument = async () => {
        setIsAttachmentVisible(false);
        setSelectedRecentImages([]);
        triggerHaptic('selection');
        try {
            const doc = await pickDocumentNative();
            if (doc?.uri) {
                setPendingAttachment({ type: 'document', data: doc });
                triggerHaptic('medium');
            }
        } catch (e: any) {
            const message = getReadableNativeError(e, 'Unable to pick document.');
            if (message) Alert.alert('Document Error', message);
        }
    };

    const handleMockAudio = async () => {
        setIsAttachmentVisible(false);
        setSelectedRecentImages([]);
        triggerHaptic('selection');
        await handleRecordStart(0);
    };

    const handleSelectRecentImage = (image: RecentImage) => {
        if (!image?.uri) return;
        setSelectedRecentImages(prev => {
            const isAlreadySelected = prev.some(item => item.uri === image.uri);
            if (isAlreadySelected) {
                triggerHaptic('selection');
                return prev.filter(item => item.uri !== image.uri);
            }
            triggerHaptic('selection');
            return [...prev, image];
        });
    };

    const handleSendSelectedRecentImages = () => {
        if (selectedRecentImages.length === 0) return;
        selectedRecentImages.forEach(image => {
            sendMessage({ type: 'image', mediaUri: image.uri });
        });
        triggerHaptic('success');
        setSelectedRecentImages([]);
        setIsAttachmentVisible(false);
    };

    const handleConfirmAttachmentSend = () => {
        if (!pendingAttachment) return;
        if (pendingAttachment.type === 'image') {
            sendMessage({ type: 'image', mediaUri: pendingAttachment.data.uri });
        } else if (pendingAttachment.type === 'document') {
            sendMessage({
                type: 'document',
                fileName: pendingAttachment.data.name,
                fileSize: formatBytes(pendingAttachment.data.size),
            });
        } else {
            sendMessage({
                type: 'audio',
                duration: pendingAttachment.data.durationLabel,
                uri: pendingAttachment.data.uri,
            });
        }
        setPendingAttachment(null);
        setIsPreviewAudioPlaying(false);
        triggerHaptic('success');
    };

    const handleCancelAttachment = async () => {
        if (isPreviewAudioPlaying) {
            try {
                await stopAudioNative();
            } catch (e) { }
        }
        setIsPreviewAudioPlaying(false);
        setPendingAttachment(null);
    };

    const handlePreviewAudioPlayback = async () => {
        if (!pendingAttachment || pendingAttachment.type !== 'audio') return;
        if (isPreviewAudioPlaying) {
            setIsPreviewAudioPlaying(false);
            try {
                await stopAudioNative();
            } catch (e) { }
            previewAudioProgressAnim.stopAnimation();
            previewAudioProgressAnim.setValue(0);
            return;
        }
        try {
            await playAudioNative(pendingAttachment.data.uri);
            setIsPreviewAudioPlaying(true);
            previewAudioProgressAnim.setValue(0);
            Animated.timing(previewAudioProgressAnim, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: false,
            }).start();
            setTimeout(() => {
                setIsPreviewAudioPlaying(false);
                previewAudioProgressAnim.setValue(0);
            }, 4000);
        } catch (e) {
            setIsPreviewAudioPlaying(false);
            const message = getReadableNativeError(e, 'Unable to preview audio.');
            if (message) Alert.alert('Audio Error', message);
        }
    };

    const handleLongPress = (id: string) => {
        setSelectedMessageAction(id);
    };

    const handleAudioPlayback = async (item: any) => {
        if (playingAudioId === item.id) {
            setPlayingAudioId(null);
            try {
                await stopAudioNative();
            } catch (e) {
                console.log('Stop Audio Native Not Linked');
            }
        } else {
            if (playingAudioId) {
                try {
                    await stopAudioNative();
                } catch (e) { }
            }
            setPlayingAudioId(item.id);
            try {
                await playAudioNative(item.uri || 'mock-uri');
            } catch (e) {
                console.log('Play Audio Native Not Linked');
            }

            // Mock auto-stop after some time
            setTimeout(() => {
                setPlayingAudioId(prev => (prev === item.id ? null : prev));
            }, 3000);
        }
    };

    const renderMessageContent = (item: any) => {
        switch (item.type) {
            case 'image':
                return (
                    <Image source={{ uri: item.mediaUri }} style={ChatDetailsStyles.messageImage} />
                );
            case 'document':
                return (
                    <ZorrroView style={ChatDetailsStyles.docMessageContainer}>
                        <ZorrroView
                            style={[
                                ChatDetailsStyles.docIconBox,
                                item.isSent
                                    ? { backgroundColor: 'rgba(255,255,255,0.2)' }
                                    : { backgroundColor: '#E5E7EB' },
                            ]}
                        >
                            <ZORRRO_SVG.CHAT_SCREENS.DOCUMENT
                                width={24}
                                height={24}
                                color={item.isSent ? '#FFFFFF' : '#3B82F6'}
                            />
                        </ZorrroView>
                        <ZorrroView style={ChatDetailsStyles.docInfo}>
                            <Text
                                style={[
                                    ChatDetailsStyles.docName,
                                    item.isSent ? ChatDetailsStyles.sentText : ChatDetailsStyles.receivedText,
                                ]}
                                numberOfLines={1}
                            >
                                {item.fileName}
                            </Text>
                            <Text
                                style={[
                                    ChatDetailsStyles.docSize,
                                    item.isSent ? ChatDetailsStyles.sentTimeText : ChatDetailsStyles.receivedTimeText,
                                ]}
                            >
                                {item.fileSize}
                            </Text>
                        </ZorrroView>
                    </ZorrroView>
                );
            case 'audio':
                const isPlaying = playingAudioId === item.id;
                return (
                    <TouchableOpacity
                        style={ChatDetailsStyles.audioContainer}
                        activeOpacity={0.7}
                        onPress={() => handleAudioPlayback(item)}
                    >
                        <ZORRRO_SVG.CHAT_SCREENS.AUDIO
                            width={24}
                            height={24}
                            color={item.isSent ? '#FFFFFF' : '#4B5563'}
                        />
                        <ZorrroView
                            style={[
                                ChatDetailsStyles.audioWaveMock,
                                item.isSent
                                    ? { backgroundColor: 'rgba(255,255,255,0.5)' }
                                    : { backgroundColor: '#D1D5DB' },
                            ]}
                        >
                            {isPlaying && (
                                <Animated.View
                                    style={[ChatDetailsStyles.audioWaveProgress, { width: '50%' }]}
                                />
                            )}
                        </ZorrroView>
                        <Text
                            style={[
                                ChatDetailsStyles.audioTime,
                                item.isSent ? ChatDetailsStyles.sentTimeText : ChatDetailsStyles.receivedTimeText,
                            ]}
                        >
                            {item.duration}
                        </Text>
                    </TouchableOpacity>
                );
            case 'text':
            default:
                return (
                    <Text
                        style={[
                            ChatDetailsStyles.messageText,
                            item.isSent ? ChatDetailsStyles.sentText : ChatDetailsStyles.receivedText,
                        ]}
                    >
                        {item.text}
                    </Text>
                );
        }
    };

    const renderMessage = ({ item }: { item: (typeof MOCK_MESSAGES)[0] }) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onLongPress={() => handleLongPress(item.id)}
            style={[
                ChatDetailsStyles.messageBubble,
                item.isSent ? ChatDetailsStyles.sentBubble : ChatDetailsStyles.receivedBubble,
                selectedMessageAction === item.id && ChatDetailsStyles.messageSelected,
            ]}
        >
            {renderMessageContent(item)}
            <ZorrroView style={ChatDetailsStyles.timeContainer}>
                <Text
                    style={[
                        ChatDetailsStyles.timeText,
                        item.isSent ? ChatDetailsStyles.sentTimeText : ChatDetailsStyles.receivedTimeText,
                    ]}
                >
                    {item.time}
                </Text>
                {item.isSent && (
                    <ZORRRO_SVG.SCREENS.DONE_ALL
                        width={14}
                        height={14}
                        color="rgba(255,255,255,0.9)"
                        style={ChatDetailsStyles.checkmark}
                        fill={ZORRRO_COLORS?.WHITE}

                    />
                )}
            </ZorrroView>
        </TouchableOpacity>
    );

    const renderHeaderMenu = () => (
        <Modal visible={isMenuVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
                <ZorrroView style={ChatDetailsStyles.modalOverlay}>
                    <ZorrroView style={ChatDetailsStyles.menuContainer}>
                        <TouchableOpacity
                            style={ChatDetailsStyles.menuItem}
                            onPress={() => {
                                setIsMenuVisible(false);
                                navigation.navigate(isGroup ? 'GroupProfile' : 'UserProfile');
                            }}
                        >
                            <Text style={ChatDetailsStyles.menuText}>
                                {isGroup ? 'View Group' : 'View User'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatDetailsStyles.menuItem}
                            onPress={() => {
                                setIsMenuVisible(false);
                                navigation.navigate('SharedMedia');
                            }}
                        >
                            <Text style={ChatDetailsStyles.menuText}>Shared Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatDetailsStyles.menuItem}
                            onPress={() => {
                                setIsMenuVisible(false);
                                setIsMuteVisible(true);
                            }}
                        >
                            <Text style={ChatDetailsStyles.menuText}>Mute Notifications</Text>
                        </TouchableOpacity>
                    </ZorrroView>
                </ZorrroView>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderMuteModal = () => (
        <Modal visible={isMuteVisible} transparent animationType="fade">
            <ZorrroView style={ChatDetailsStyles.centerModalOverlay}>
                <ZorrroView style={ChatDetailsStyles.muteModalContainer}>
                    <Text style={ChatDetailsStyles.muteModalTitle}>Mute Message Notifications</Text>
                    <Text style={ChatDetailsStyles.muteModalSubtitle}>
                        You will not be notified for the messages received in the chat.
                    </Text>

                    {['8 hours', '1 Week', 'Always'].map(option => (
                        <TouchableOpacity
                            key={option}
                            style={ChatDetailsStyles.radioRow}
                            onPress={() => setSelectedMuteOption(option)}
                        >
                            <ZorrroView
                                style={[
                                    ChatDetailsStyles.radioCircle,
                                    selectedMuteOption === option && ChatDetailsStyles.radioCircleSelected,
                                ]}
                            >
                                {selectedMuteOption === option && (
                                    <ZorrroView style={ChatDetailsStyles.radioDot} />
                                )}
                            </ZorrroView>
                            <Text style={ChatDetailsStyles.radioText}>{option}</Text>
                        </TouchableOpacity>
                    ))}

                    <ZorrroView style={ChatDetailsStyles.muteActionRow}>
                        <TouchableOpacity
                            onPress={() => setIsMuteVisible(false)}
                            style={ChatDetailsStyles.muteActionBtn}
                        >
                            <Text style={ChatDetailsStyles.muteActionText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsMuteVisible(false)}
                            style={ChatDetailsStyles.muteActionBtn}
                        >
                            <Text style={ChatDetailsStyles.muteActionText}>Ok</Text>
                        </TouchableOpacity>
                    </ZorrroView>
                </ZorrroView>
            </ZorrroView>
        </Modal>
    );

    const renderAttachmentMenu = () => (
        <Modal visible={isAttachmentVisible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={() => setIsAttachmentVisible(false)}>
                <ZorrroView style={ChatDetailsStyles.bottomModalOverlay}>
                    <TouchableWithoutFeedback>
                        <ZorrroView style={ChatDetailsStyles.attachmentContainer}>
                            <ZorrroView style={ChatDetailsStyles.attachmentRow}>
                                <TouchableOpacity
                                    style={ChatDetailsStyles.attachmentItem}
                                    onPress={handlePickImage}
                                >
                                    <ZorrroView style={ChatDetailsStyles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.GALLERY
                                            width={24}
                                            height={24}
                                            color="#EAB308"
                                        />
                                    </ZorrroView>
                                    <Text style={ChatDetailsStyles.attachmentText}>Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={ChatDetailsStyles.attachmentItem}
                                    onPress={handleCamera}
                                >
                                    <ZorrroView style={ChatDetailsStyles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.CAMERA
                                            width={24}
                                            height={24}
                                            color="#A855F7"
                                        />
                                    </ZorrroView>
                                    <Text style={ChatDetailsStyles.attachmentText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={ChatDetailsStyles.attachmentItem}
                                    onPress={handleMockDocument}
                                >
                                    <ZorrroView style={ChatDetailsStyles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.DOCUMENT
                                            width={24}
                                            height={24}
                                            color="#3B82F6"
                                        />
                                    </ZorrroView>
                                    <Text style={ChatDetailsStyles.attachmentText}>Document</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={ChatDetailsStyles.attachmentItem}
                                    onPress={handleMockAudio}
                                >
                                    <ZorrroView style={ChatDetailsStyles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.AUDIO
                                            width={24}
                                            height={24}
                                            color="#0EA5E9"
                                        />
                                    </ZorrroView>
                                    <Text style={ChatDetailsStyles.attachmentText}>Audio</Text>
                                </TouchableOpacity>
                            </ZorrroView>
                            <Text style={ChatDetailsStyles.recentMediaTitle}>Recent photos</Text>
                            {isLoadingRecentImages ? (
                                <Text style={ChatDetailsStyles.recentMediaHint}>Loading...</Text>
                            ) : recentImages.length === 0 ? (
                                <Text style={ChatDetailsStyles.recentMediaHint}>
                                    No recent photos available
                                </Text>
                            ) : (
                                <FlatList
                                    data={[
                                        { uri: '__camera_tile__', name: 'Camera' } as RecentImage,
                                        ...recentImages,
                                    ]}
                                    keyExtractor={(item, index) => `${item.uri}-${index}`}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={ChatDetailsStyles.recentMediaList}
                                    renderItem={({ item }) =>
                                        item.uri === '__camera_tile__' ? (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={[
                                                    ChatDetailsStyles.recentMediaThumbWrapper,
                                                    ChatDetailsStyles.cameraTile,
                                                ]}
                                                onPress={handleCamera}
                                            >
                                                <ZORRRO_SVG.CHAT_SCREENS.CAMERA
                                                    width={22}
                                                    height={22}
                                                    color="#A855F7"
                                                />
                                                <Text style={ChatDetailsStyles.cameraTileText}>Camera</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={ChatDetailsStyles.recentMediaThumbWrapper}
                                                onPress={() => handleSelectRecentImage(item)}
                                                onLongPress={() => {
                                                    setPendingAttachment({
                                                        type: 'image',
                                                        data: {
                                                            uri: item.uri,
                                                            name: item.name || `image-${Date.now()}.jpg`,
                                                            mimeType: item.mimeType || 'image/jpeg',
                                                            size: item.size,
                                                        },
                                                    });
                                                    setIsAttachmentVisible(false);
                                                    setSelectedRecentImages([]);
                                                }}
                                            >
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={ChatDetailsStyles.recentMediaThumb}
                                                />
                                                {selectedRecentImages.some(
                                                    selected => selected.uri === item.uri,
                                                ) && (
                                                        <ZorrroView style={ChatDetailsStyles.recentMediaSelectedOverlay}>
                                                            <Text style={ChatDetailsStyles.recentMediaSelectedText}>
                                                                ✓
                                                            </Text>
                                                        </ZorrroView>
                                                    )}
                                            </TouchableOpacity>
                                        )
                                    }
                                />
                            )}
                            {selectedRecentImages.length > 0 && (
                                <TouchableOpacity
                                    style={ChatDetailsStyles.sendSelectedButton}
                                    onPress={handleSendSelectedRecentImages}
                                >
                                    <Text style={ChatDetailsStyles.sendSelectedText}>
                                        Send {selectedRecentImages.length} selected
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </ZorrroView>
                    </TouchableWithoutFeedback>
                </ZorrroView>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderMessageActionMenu = () => (
        <Modal visible={!!selectedMessageAction} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setSelectedMessageAction(null)}>
                <ZorrroView style={ChatDetailsStyles.actionModalOverlay}>
                    <ZorrroView style={ChatDetailsStyles.actionMenuContainer}>
                        <TouchableOpacity
                            style={ChatDetailsStyles.actionMenuItem}
                            onPress={() => setSelectedMessageAction(null)}
                        >
                            <Text style={ChatDetailsStyles.actionMenuText}>Reply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatDetailsStyles.actionMenuItem}
                            onPress={() => setSelectedMessageAction(null)}
                        >
                            <Text style={ChatDetailsStyles.actionMenuText}>Forward</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatDetailsStyles.actionMenuItem}
                            onPress={() => setSelectedMessageAction(null)}
                        >
                            <Text style={ChatDetailsStyles.actionMenuText}>Copy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatDetailsStyles.actionMenuItem}
                            onPress={() => {
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut,
                                );
                                setMessages(prev =>
                                    prev.filter(m => m.id !== selectedMessageAction),
                                );
                                setSelectedMessageAction(null);
                            }}
                        >
                            <Text style={[ChatDetailsStyles.actionMenuText, { color: '#EF4444' }]}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </ZorrroView>
                </ZorrroView>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderAttachmentPreview = () => (
        <Modal visible={!!pendingAttachment} transparent animationType="slide">
            <ZorrroView style={ChatDetailsStyles.bottomModalOverlay}>
                <ZorrroView style={ChatDetailsStyles.previewContainer}>
                    <Text style={ChatDetailsStyles.previewTitle}>Preview</Text>

                    {pendingAttachment?.type === 'image' && (
                        <Image
                            source={{ uri: pendingAttachment.data.uri }}
                            style={ChatDetailsStyles.previewImage}
                        />
                    )}

                    {pendingAttachment?.type === 'document' && (
                        <ZorrroView style={ChatDetailsStyles.previewDocContainer}>
                            <ZORRRO_SVG.CHAT_SCREENS.DOCUMENT
                                width={28}
                                height={28}
                                color="#3B82F6"
                            />
                            <ZorrroView style={ChatDetailsStyles.previewDocMeta}>
                                <Text style={ChatDetailsStyles.previewDocName} numberOfLines={2}>
                                    {pendingAttachment.data.name}
                                </Text>
                                <Text style={ChatDetailsStyles.previewDocSize}>
                                    {formatBytes(pendingAttachment.data.size)}
                                </Text>
                            </ZorrroView>
                        </ZorrroView>
                    )}

                    {pendingAttachment?.type === 'audio' && (
                        <TouchableOpacity
                            style={ChatDetailsStyles.previewAudioContainer}
                            onPress={handlePreviewAudioPlayback}
                            activeOpacity={0.8}
                        >
                            <ZORRRO_SVG.CHAT_SCREENS.AUDIO
                                width={24}
                                height={24}
                                color="#0EA5E9"
                            />
                            <ZorrroView style={ChatDetailsStyles.previewAudioMeta}>
                                <Text style={ChatDetailsStyles.previewAudioText}>
                                    {isPreviewAudioPlaying ? 'Stop' : 'Play'} audio preview
                                </Text>
                                <ZorrroView style={ChatDetailsStyles.previewAudioWaveBase}>
                                    <Animated.View
                                        style={[
                                            ChatDetailsStyles.previewAudioWaveProgress,
                                            {
                                                width: previewAudioProgressAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0%', '100%'],
                                                }),
                                            },
                                        ]}
                                    />
                                </ZorrroView>
                            </ZorrroView>
                            <Text style={ChatDetailsStyles.previewAudioDuration}>
                                {pendingAttachment.data.durationLabel}
                            </Text>
                        </TouchableOpacity>
                    )}

                    <ZorrroView style={ChatDetailsStyles.previewActions}>
                        <TouchableOpacity
                            style={ChatDetailsStyles.previewCancelButton}
                            onPress={handleCancelAttachment}
                        >
                            <Text style={ChatDetailsStyles.previewCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ChatDetailsStyles.previewSendButton}
                            onPress={handleConfirmAttachmentSend}
                        >
                            <Text style={ChatDetailsStyles.previewSendText}>Send</Text>
                        </TouchableOpacity>
                    </ZorrroView>
                </ZorrroView>
            </ZorrroView>
        </Modal>
    );

    return (
        <ZorrroView safe style={ChatDetailsStyles.safeArea}>
            <ScreenStatusBar backgroundColor={ZORRRO_COLORS?.WHITE} barStyle="dark-content" />

            <ChatDetailsHeader
                isGroup={isGroup}
                onBackPress={() => navigation.goBack()}
                onProfilePress={() =>
                    navigation.navigate(isGroup ? 'GroupProfile' : 'UserProfile')
                }
                onMenuPress={() => setIsMenuVisible(true)}
                styles={ChatDetailsStyles}
            />

            <KeyboardAvoidingView
                style={ChatDetailsStyles.keyboardWrap}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={ChatDetailsStyles.chatList}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    ListFooterComponent={() =>
                        isTyping ? (
                            <ZorrroView style={ChatDetailsStyles.typingIndicatorContainer}>
                                <Text style={ChatDetailsStyles.typingText}>
                                    {isGroup ? 'Someone is typing...' : 'Priya is typing...'}
                                </Text>
                            </ZorrroView>
                        ) : null
                    }
                />

                <ChatComposer
                    isRecording={isRecording}
                    isRecordPaused={isRecordPaused}
                    inputText={inputText}
                    setInputText={setInputText}
                    recordDuration={recordDuration}
                    onAttachmentPress={() => setIsAttachmentVisible(true)}
                    onSendPress={handleSend}
                    onRecordStart={() => handleRecordStart(0)}
                    onRecordPauseToggle={handleRecordPauseToggle}
                    onRecordCancel={handleRecordCancel}
                    onRecordSend={handleRecordSend}
                    styles={ChatDetailsStyles}
                />
            </KeyboardAvoidingView>

            {renderHeaderMenu()}
            {renderMuteModal()}
            {renderAttachmentMenu()}
            {renderMessageActionMenu()}
            {renderAttachmentPreview()}
        </ZorrroView>
    );
};

export default ChatDetails;


