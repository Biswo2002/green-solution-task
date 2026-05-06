import React from 'react';

export type EvidenceType = 'audio' | 'photo' | 'video';

export interface EvidenceItem {
    id: string;
    type: EvidenceType;
    name: string;
}

export interface SubmittedInfo {
    type: string | null;
    quickInfos: string[];
    evidence: EvidenceItem[];
}

export interface SosTypeOption {
    id: string;
    label: string;
    Icon: React.ComponentType<{
        width?: number;
        height?: number;
        fill?: string;
        color?: string;
    }>;
}
