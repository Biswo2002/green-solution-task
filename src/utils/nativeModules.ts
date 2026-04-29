import { NativeModules } from 'react-native';

// This is a bridge to the custom Native Module you will implement in Android/iOS.
const { MediaPicker, AudioRecorder } = NativeModules;

export type PickerSource = 'gallery' | 'camera';

export interface PickedImage {
    uri: string;
    name: string;
    mimeType?: string;
    size?: number;
    width?: number;
    height?: number;
}

export interface PickedDocument {
    uri: string;
    name: string;
    mimeType?: string;
    size?: number;
}

export interface RecentImage {
    uri: string;
    name: string;
    mimeType?: string;
    size?: number;
}

export const pickImageNative = async (source: PickerSource = 'gallery'): Promise<PickedImage> => {
    if (!MediaPicker) throw new Error("MediaPicker Native Module is not linked yet.");
    return await MediaPicker.pickImage(source);
};

export const pickDocumentNative = async (): Promise<PickedDocument> => {
    if (!MediaPicker) throw new Error("MediaPicker Native Module is not linked yet.");
    return await MediaPicker.pickDocument();
};

export const getRecentImagesNative = async (limit = 24): Promise<RecentImage[]> => {
    if (!MediaPicker) throw new Error("MediaPicker Native Module is not linked yet.");
    return await MediaPicker.getRecentImages(limit);
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
