import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ZORRRO_SVG } from '../../../../assets';
import { ZorrroView } from '$/components';
import { ChatsLandingStyles } from '$/styles/screenStyle/ChatsLanding';

export type ChatListItemData = {
    id: string;
    name: string;
    initials: string;
    lastMessage: string;
    time: string;
    unread: number;
    isGroup: boolean;
    role?: string;
    department?: string;
};

type ChatListItemProps = {
    item: ChatListItemData;
    onPress: () => void;
};

const ChatListItem = ({ item, onPress }: ChatListItemProps) => {
    return (
        <TouchableOpacity style={ChatsLandingStyles.chatItem} onPress={onPress}>
            <ZorrroView style={ChatsLandingStyles.avatarContainer}>
                <Text style={ChatsLandingStyles.avatarText}>{item.initials}</Text>
            </ZorrroView>
            <ZorrroView style={ChatsLandingStyles.chatDetails}>
                <ZorrroView style={ChatsLandingStyles.chatHeader}>
                    <Text style={ChatsLandingStyles.chatName}>{item.name}</Text>
                    <Text style={ChatsLandingStyles.chatTime}>{item.time}</Text>
                </ZorrroView>
                {item.role && (
                    <ZorrroView style={ChatsLandingStyles.roleContainer}>
                        <ZorrroView style={ChatsLandingStyles.roleBadge}>
                            <Text style={ChatsLandingStyles.roleText}>{item.role}</Text>
                        </ZorrroView>
                        {item.department && (
                            <Text style={ChatsLandingStyles.departmentText}> • {item.department}</Text>
                        )}
                    </ZorrroView>
                )}
                <ZorrroView style={ChatsLandingStyles.messageRow}>
                    <ZORRRO_SVG.SCREENS.DONE_ALL
                        width={16}
                        height={16}
                        color="#DAE0E7"
                        style={ChatsLandingStyles.checkmarks}
                        fill="#DAE0E7"
                    />
                    <Text style={ChatsLandingStyles.lastMessage} numberOfLines={1}>
                        {item.lastMessage}
                    </Text>
                    {item.unread > 0 && (
                        <ZorrroView style={ChatsLandingStyles.unreadBadgeContainer}>
                            <ZorrroView style={ChatsLandingStyles.unreadBadge}>
                                <Text style={ChatsLandingStyles.unreadBadgeText}>{item.unread}</Text>
                            </ZorrroView>
                        </ZorrroView>
                    )}
                </ZorrroView>
            </ZorrroView>
        </TouchableOpacity>
    );
};

export default ChatListItem;
