import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Modal, TouchableWithoutFeedback, LayoutAnimation, Platform, UIManager, Image, Animated, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ZORRRO_SVG } from '$/assets';
import { pickImageNative, pickDocumentNative, startRecordingNative, stopRecordingNative, playAudioNative, stopAudioNative } from '$/utils/nativeModules';

const MOCK_MESSAGES: any[] = [
    { id: '1', type: 'text', text: 'Good morning sir. The vaccination drive report for Varanasi district is ready.', time: '9:30 AM', isSent: false },
    { id: '2', type: 'text', text: 'Good morning Rajesh. Please share the document.', time: '9:32 AM', isSent: true },
    { id: '3', type: 'document', text: '', fileName: 'Varanasi_Report.pdf', fileSize: '2.4 MB', time: '9:34 AM', isSent: false },
    { id: '4', type: 'text', text: "Thanks, I'll review it.", time: '9:36 AM', isSent: true },
];

const ChatDetails = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const isGroup = route.params?.isGroup;
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isMuteVisible, setIsMuteVisible] = useState(false);
    const [selectedMuteOption, setSelectedMuteOption] = useState('8 hours');
    const [isAttachmentVisible, setIsAttachmentVisible] = useState(false);
    
    // Premium Features States
    const [isTyping, setIsTyping] = useState(false);
    const [selectedMessageAction, setSelectedMessageAction] = useState<string | null>(null);
    
    // Custom Recording UI States
    const [isRecording, setIsRecording] = useState(false);
    const [recordDuration, setRecordDuration] = useState(0);
    const recordingInterval = useRef<any>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Audio Playback State
    const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

    useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);

    const sendMessage = (payload: any) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSent: true,
            ...payload
        }]);

        if (!isGroup) {
            setIsTyping(true);
            setTimeout(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    type: 'text',
                    text: "Got it! Thanks.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isSent: false
                }]);
            }, 2000);
        }
    };

    const handleSend = () => {
        if (inputText.trim()) {
            sendMessage({ type: 'text', text: inputText });
            setInputText('');
        }
    };

    const handleRecordStart = async () => {
        setIsRecording(true);
        setRecordDuration(0);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        
        recordingInterval.current = setInterval(() => {
            setRecordDuration(prev => prev + 1);
        }, 1000);

        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.5, duration: 500, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true })
            ])
        ).start();

        try {
            await startRecordingNative();
        } catch (e) {
            console.log("Native AudioRecorder not implemented yet.");
        }
    };

    const handleRecordStop = async () => {
        setIsRecording(false);
        pulseAnim.stopAnimation();
        if (recordingInterval.current) {
            clearInterval(recordingInterval.current);
        }
        
        let audioUri = '';
        try {
            audioUri = await stopRecordingNative();
        } catch (e) {
            console.log("Native AudioRecorder not implemented yet.");
        }

        if (recordDuration > 0) {
            const mins = Math.floor(recordDuration / 60);
            const secs = recordDuration % 60;
            const durationStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            sendMessage({ type: 'audio', duration: durationStr, uri: audioUri });
        }
    };

    const handlePickImage = async () => {
        setIsAttachmentVisible(false);
        try {
            const uri = await pickImageNative();
            if (uri) sendMessage({ type: 'image', mediaUri: uri });
        } catch (e: any) {
            Alert.alert("Native Module Error", e.message || "MediaPicker not implemented.");
            // Fallback for UI testing
            sendMessage({ type: 'image', mediaUri: 'https://picsum.photos/400/400?random=1' });
        }
    };

    const handleCamera = async () => {
        setIsAttachmentVisible(false);
        try {
            const uri = await pickImageNative();
            if (uri) sendMessage({ type: 'image', mediaUri: uri });
        } catch (e: any) {
            Alert.alert("Native Module Error", e.message || "MediaPicker not implemented.");
            sendMessage({ type: 'image', mediaUri: 'https://picsum.photos/400/400?random=2' });
        }
    };

    const handleMockDocument = async () => {
        setIsAttachmentVisible(false);
        try {
            const doc = await pickDocumentNative();
            sendMessage({ type: 'document', fileName: doc.name, fileSize: doc.size });
        } catch (e: any) {
            Alert.alert("Native Module Error", e.message || "MediaPicker not implemented.");
            sendMessage({ type: 'document', fileName: 'Financial_Q3_Report.pdf', fileSize: '1.2 MB' });
        }
    };

    const handleMockAudio = () => {
        setIsAttachmentVisible(false);
        sendMessage({ type: 'audio', duration: '0:14' });
    };

    const handleLongPress = (id: string) => {
        setSelectedMessageAction(id);
    };

    const handleAudioPlayback = async (item: any) => {
        if (playingAudioId === item.id) {
            setPlayingAudioId(null);
            try { await stopAudioNative(); } catch (e) { console.log("Stop Audio Native Not Linked"); }
        } else {
            if (playingAudioId) {
                try { await stopAudioNative(); } catch (e) { }
            }
            setPlayingAudioId(item.id);
            try { await playAudioNative(item.uri || "mock-uri"); } catch (e) { console.log("Play Audio Native Not Linked"); }
            
            // Mock auto-stop after some time
            setTimeout(() => {
                setPlayingAudioId(prev => (prev === item.id ? null : prev));
            }, 3000);
        }
    };

    const renderMessageContent = (item: any) => {
        switch(item.type) {
            case 'image':
                return <Image source={{ uri: item.mediaUri }} style={styles.messageImage} />;
            case 'document':
                return (
                    <View style={styles.docMessageContainer}>
                        <View style={[styles.docIconBox, item.isSent ? { backgroundColor: 'rgba(255,255,255,0.2)' } : { backgroundColor: '#E5E7EB' }]}>
                            <ZORRRO_SVG.CHAT_SCREENS.DOCUMENT width={24} height={24} color={item.isSent ? "#FFFFFF" : "#3B82F6"} />
                        </View>
                        <View style={styles.docInfo}>
                            <Text style={[styles.docName, item.isSent ? styles.sentText : styles.receivedText]} numberOfLines={1}>{item.fileName}</Text>
                            <Text style={[styles.docSize, item.isSent ? styles.sentTimeText : styles.receivedTimeText]}>{item.fileSize}</Text>
                        </View>
                    </View>
                );
            case 'audio':
                const isPlaying = playingAudioId === item.id;
                return (
                    <TouchableOpacity style={styles.audioContainer} activeOpacity={0.7} onPress={() => handleAudioPlayback(item)}>
                        <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={24} height={24} color={item.isSent ? "#FFFFFF" : "#4B5563"} />
                        <View style={[styles.audioWaveMock, item.isSent ? { backgroundColor: 'rgba(255,255,255,0.5)' } : { backgroundColor: '#D1D5DB' }]}>
                            {isPlaying && <Animated.View style={[styles.audioWaveProgress, { width: '50%' }]} />}
                        </View>
                        <Text style={[styles.audioTime, item.isSent ? styles.sentTimeText : styles.receivedTimeText]}>{item.duration}</Text>
                    </TouchableOpacity>
                );
            case 'text':
            default:
                return <Text style={[styles.messageText, item.isSent ? styles.sentText : styles.receivedText]}>{item.text}</Text>;
        }
    };

    const renderMessage = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => (
        <TouchableOpacity 
            activeOpacity={0.9}
            onLongPress={() => handleLongPress(item.id)}
            style={[
                styles.messageBubble, 
                item.isSent ? styles.sentBubble : styles.receivedBubble,
                selectedMessageAction === item.id && styles.messageSelected
            ]}
        >
            {renderMessageContent(item)}
            <View style={styles.timeContainer}>
                <Text style={[styles.timeText, item.isSent ? styles.sentTimeText : styles.receivedTimeText]}>{item.time}</Text>
                {item.isSent && <Text style={styles.checkmark}> ✓✓</Text>}
            </View>
        </TouchableOpacity>
    );

    const renderHeaderMenu = () => (
        <Modal visible={isMenuVisible} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setIsMenuVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { setIsMenuVisible(false); navigation.navigate(isGroup ? 'GroupProfile' : 'UserProfile'); }}>
                            <Text style={styles.menuText}>{isGroup ? 'View Group' : 'View User'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { setIsMenuVisible(false); navigation.navigate('SharedMedia'); }}>
                            <Text style={styles.menuText}>Shared Media</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { setIsMenuVisible(false); setIsMuteVisible(true); }}>
                            <Text style={styles.menuText}>Mute Notifications</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderMuteModal = () => (
        <Modal visible={isMuteVisible} transparent animationType="fade">
            <View style={styles.centerModalOverlay}>
                <View style={styles.muteModalContainer}>
                    <Text style={styles.muteModalTitle}>Mute Message Notifications</Text>
                    <Text style={styles.muteModalSubtitle}>You will not be notified for the messages received in the chat.</Text>
                    
                    {['8 hours', '1 Week', 'Always'].map((option) => (
                        <TouchableOpacity key={option} style={styles.radioRow} onPress={() => setSelectedMuteOption(option)}>
                            <View style={[styles.radioCircle, selectedMuteOption === option && styles.radioCircleSelected]}>
                                {selectedMuteOption === option && <View style={styles.radioDot} />}
                            </View>
                            <Text style={styles.radioText}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                    
                    <View style={styles.muteActionRow}>
                        <TouchableOpacity onPress={() => setIsMuteVisible(false)} style={styles.muteActionBtn}>
                            <Text style={styles.muteActionText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsMuteVisible(false)} style={styles.muteActionBtn}>
                            <Text style={styles.muteActionText}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const renderAttachmentMenu = () => (
        <Modal visible={isAttachmentVisible} transparent animationType="slide">
            <TouchableWithoutFeedback onPress={() => setIsAttachmentVisible(false)}>
                <View style={styles.bottomModalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.attachmentContainer}>
                            <View style={styles.attachmentRow}>
                                <TouchableOpacity style={styles.attachmentItem} onPress={handlePickImage}>
                                    <View style={styles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.GALLERY width={24} height={24} color="#EAB308" />
                                    </View>
                                    <Text style={styles.attachmentText}>Gallery</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentItem} onPress={handleCamera}>
                                    <View style={styles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.CAMERA width={24} height={24} color="#A855F7" />
                                    </View>
                                    <Text style={styles.attachmentText}>Camera</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentItem} onPress={handleMockDocument}>
                                    <View style={styles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.DOCUMENT width={24} height={24} color="#3B82F6" />
                                    </View>
                                    <Text style={styles.attachmentText}>Document</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.attachmentItem} onPress={handleMockAudio}>
                                    <View style={styles.attachmentIconBox}>
                                        <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={24} height={24} color="#0EA5E9" />
                                    </View>
                                    <Text style={styles.attachmentText}>Audio</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderMessageActionMenu = () => (
        <Modal visible={!!selectedMessageAction} transparent animationType="fade">
            <TouchableWithoutFeedback onPress={() => setSelectedMessageAction(null)}>
                <View style={styles.actionModalOverlay}>
                    <View style={styles.actionMenuContainer}>
                        <TouchableOpacity style={styles.actionMenuItem} onPress={() => setSelectedMessageAction(null)}>
                            <Text style={styles.actionMenuText}>Reply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionMenuItem} onPress={() => setSelectedMessageAction(null)}>
                            <Text style={styles.actionMenuText}>Forward</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionMenuItem} onPress={() => setSelectedMessageAction(null)}>
                            <Text style={styles.actionMenuText}>Copy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionMenuItem} onPress={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            setMessages(prev => prev.filter(m => m.id !== selectedMessageAction));
                            setSelectedMessageAction(null);
                        }}>
                            <Text style={[styles.actionMenuText, { color: '#EF4444' }]}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ZORRRO_SVG.SCREENS.GO_BACK width={24} height={24} color="#111827" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.headerProfile} onPress={() => navigation.navigate(isGroup ? 'GroupProfile' : 'UserProfile')}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{isGroup ? '👥' : 'PS'}</Text>
                    </View>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{isGroup ? 'Revenue Officers - Kolkata' : 'Priya Sharma'}</Text>
                        <Text style={styles.headerSubtitle}>{isGroup ? '48 members' : 'Department Admin'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsMenuVisible(true)} style={styles.moreButton}>
                    <Text style={styles.moreIcon}>⋮</Text>
                </TouchableOpacity>
            </View>

            {/* Chat Area */}
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessage}
                contentContainerStyle={styles.chatList}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => 
                    isTyping ? (
                        <View style={styles.typingIndicatorContainer}>
                            <Text style={styles.typingText}>{isGroup ? 'Someone is typing...' : 'Priya is typing...'}</Text>
                        </View>
                    ) : null
                }
            />

            {/* Input Area */}
            <View style={styles.inputContainer}>
                {!isRecording && (
                    <>
                        <TouchableOpacity style={styles.iconButton} onPress={() => setIsAttachmentVisible(true)}>
                            <Text style={styles.inputIconText}>📎</Text>
                        </TouchableOpacity>
                        <View style={styles.textInputWrapper}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Type a message..."
                                placeholderTextColor="#9CA3AF"
                                value={inputText}
                                onChangeText={setInputText}
                                multiline
                            />
                        </View>
                    </>
                )}

                {isRecording && (
                    <View style={styles.recordingWrapper}>
                        <Animated.View style={[styles.recordingDot, { transform: [{ scale: pulseAnim }] }]} />
                        <Text style={styles.recordingTimer}>
                            {Math.floor(recordDuration / 60)}:{(recordDuration % 60).toString().padStart(2, '0')}
                        </Text>
                        <Text style={styles.recordingSlideText}>{'< Release to send'}</Text>
                    </View>
                )}

                {inputText.length > 0 ? (
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <ZORRRO_SVG.SCREENS.RIGHT_ARROW width={20} height={20} color="#FFFFFF" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={[styles.sendButton, { backgroundColor: isRecording ? '#DC2626' : '#0084C8' }]} 
                        onPressIn={handleRecordStart}
                        onPressOut={handleRecordStop}
                    >
                        <ZORRRO_SVG.CHAT_SCREENS.AUDIO width={20} height={20} color="#FFFFFF" />
                    </TouchableOpacity>
                )}
            </View>

            {renderHeaderMenu()}
            {renderMuteModal()}
            {renderAttachmentMenu()}
            {renderMessageActionMenu()}

        </SafeAreaView>
    );
};

export default ChatDetails;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backButton: {
        padding: 4,
        marginRight: 8,
    },
    headerProfile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#0284C7',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerInfo: {
        justifyContent: 'center',
    },
    headerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    moreButton: {
        padding: 8,
    },
    moreIcon: {
        fontSize: 24,
        color: '#111827',
        fontWeight: 'bold',
    },
    chatList: {
        padding: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
        marginBottom: 16,
    },
    sentBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#0084C8',
        borderBottomRightRadius: 4,
    },
    receivedBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#F3F4F6',
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    sentText: {
        color: '#FFFFFF',
    },
    receivedText: {
        color: '#1F2937',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    timeText: {
        fontSize: 11,
    },
    sentTimeText: {
        color: 'rgba(255,255,255,0.7)',
    },
    receivedTimeText: {
        color: '#9CA3AF',
    },
    checkmark: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.9)',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        backgroundColor: '#FFFFFF',
    },
    iconButton: {
        padding: 8,
        marginRight: 4,
    },
    inputIconText: {
        fontSize: 20,
    },
    textInputWrapper: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        minHeight: 40,
        justifyContent: 'center',
    },
    textInput: {
        fontSize: 15,
        color: '#1F2937',
        padding: 0,
        maxHeight: 100,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#0084C8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    menuContainer: {
        position: 'absolute',
        top: 60,
        right: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 8,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuText: {
        fontSize: 15,
        color: '#1F2937',
    },
    centerModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    muteModalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        width: '80%',
        padding: 24,
    },
    muteModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    muteModalSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 20,
        lineHeight: 20,
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9CA3AF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioCircleSelected: {
        borderColor: '#0084C8',
    },
    radioDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#0084C8',
    },
    radioText: {
        fontSize: 15,
        color: '#111827',
    },
    muteActionRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    muteActionBtn: {
        marginLeft: 24,
    },
    muteActionText: {
        color: '#0084C8',
        fontSize: 15,
        fontWeight: '600',
    },
    bottomModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    attachmentContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    attachmentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    attachmentItem: {
        alignItems: 'center',
    },
    attachmentIconBox: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    attachmentText: {
        fontSize: 13,
        color: '#4B5563',
        fontWeight: '500',
    },
    messageSelected: {
        opacity: 0.7,
        borderWidth: 2,
        borderColor: '#0084C8',
    },
    actionModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionMenuContainer: {
        width: 250,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    actionMenuItem: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    actionMenuText: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
    typingIndicatorContainer: {
        alignSelf: 'flex-start',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        marginBottom: 10,
    },
    typingText: {
        color: '#6B7280',
        fontSize: 14,
        fontStyle: 'italic',
    },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 4,
    },
    docMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
        marginBottom: 4,
    },
    docIconBox: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    docInfo: {
        flex: 1,
    },
    docName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 2,
    },
    docSize: {
        fontSize: 11,
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
        marginBottom: 4,
    },
    audioWaveMock: {
        flex: 1,
        height: 4,
        borderRadius: 2,
        marginHorizontal: 12,
        overflow: 'hidden',
    },
    audioWaveProgress: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    audioTime: {
        fontSize: 12,
        fontWeight: '500',
    },
    recordingWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    recordingDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#DC2626',
        marginRight: 10,
    },
    recordingTimer: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
        width: 45,
    },
    recordingSlideText: {
        fontSize: 14,
        color: '#9CA3AF',
        fontStyle: 'italic',
        marginLeft: 'auto',
    },
});
