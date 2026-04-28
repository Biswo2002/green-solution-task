import { NativeModules, Platform } from 'react-native';

// This is a bridge to the custom Native Module you will implement in Android/iOS.
const { MediaPicker, AudioRecorder } = NativeModules;

export const pickImageNative = async (): Promise<string> => {
    if (!MediaPicker) throw new Error("MediaPicker Native Module is not linked yet.");
    return await MediaPicker.pickImage();
};

export const pickDocumentNative = async (): Promise<any> => {
    if (!MediaPicker) throw new Error("MediaPicker Native Module is not linked yet.");
    return await MediaPicker.pickDocument();
};

export const startRecordingNative = async (): Promise<void> => {
    if (!AudioRecorder) throw new Error("AudioRecorder Native Module is not linked yet.");
    return await AudioRecorder.startRecording();
};

export const stopRecordingNative = async (): Promise<string> => {
    if (!AudioRecorder) throw new Error("AudioRecorder Native Module is not linked yet.");
    return await AudioRecorder.stopRecording();
};

export const playAudioNative = async (uri: string): Promise<void> => {
    if (!AudioRecorder) throw new Error("AudioRecorder Native Module is not linked yet.");
    return await AudioRecorder.playAudio(uri);
};

export const stopAudioNative = async (): Promise<void> => {
    if (!AudioRecorder) throw new Error("AudioRecorder Native Module is not linked yet.");
    return await AudioRecorder.stopAudio();
};
