import type { Message, Conversation } from "@/types"
import { ConversationType } from "@/types"

// Group messages by sender
// export function groupMessagesBySender(messages: Message[], currentUserId: string) {
//     const groups: {
//         sender: string
//         isCurrentUser: boolean
//         messages: Message[]
//     }[] = []

//     let currentGroup: {
//         sender: string
//         senderId: string
//         isCurrentUser: boolean
//         messages: Message[]
//     } | null = null

//     messages.forEach((message) => {
//         const isCurrentUser = message.senderId === currentUserId
//         const senderName = message.sender?.username || "Unknown User"

//         // Start a new group if:
//         // 1. This is the first message
//         // 2. The sender changed
//         // 3. More than 5 minutes passed since the last message in the group
//         if (
//             !currentGroup ||
//             currentGroup.senderId !== message.senderId ||
//             (message.createdAt &&
//                 currentGroup.messages[currentGroup.messages.length - 1].createdAt &&
//                 new Date(message.createdAt).getTime() -
//                 new Date(currentGroup.messages[currentGroup.messages.length - 1].createdAt).getTime() >
//                 5 * 60 * 1000)
//         ) {
//             if (currentGroup) {
//                 groups.push(currentGroup)
//             }

//             currentGroup = {
//                 sender: senderName,
//                 senderId: message.senderId || "",
//                 isCurrentUser,
//                 messages: [message],
//             }
//         } else {
//             // Add to the current group
//             currentGroup.messages.push(message)
//         }
//     })

//     // Add the last group
//     if (currentGroup) {
//         groups.push(currentGroup)
//     }

//     return groups
// }

export function groupMessagesBySender(messages: any[], currentUserId: string) {
    if (!messages || messages.length === 0) return [];
    const groups: {
        sender: any;
        messages: any[];
        isCurrentUser: boolean;
        lastMessageTime: Date;
    }[] = [];

    messages.forEach((message) => {
        const messageTime = new Date(message.createdAt);
        // If there's no group or sender is different or time gap is more than 5 minutes, start a new group.
        if (
            !groups.length ||
            groups[groups.length - 1].sender.id !== message.sender.id ||
            messageTime.getTime() -
            groups[groups.length - 1].lastMessageTime.getTime() >
            5 * 60 * 1000
        ) {
            groups.push({
                sender: message.sender,
                messages: [message],
                isCurrentUser: message.sender.id === currentUserId,
                lastMessageTime: messageTime,
            });
        } else {
            // Otherwise, add message to the current group.
            groups[groups.length - 1].messages.push(message);
            groups[groups.length - 1].lastMessageTime = messageTime;
        }
    });

    return groups;
}


// Format message time
export function formatMessageTime(dateString?: Date | string): string {
    if (!dateString) return ""

    const date = new Date(dateString)
    const now = new Date()

    // Same day, just show time
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Within the last week, show day name
    const daysDiff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff < 7) {
        return date.toLocaleDateString([], { weekday: "short" })
    }

    // Otherwise show date MM/DD/YY format
    return date.toLocaleDateString([], {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
    })
}

// Format message preview
export function formatMessagePreview(message: Message): string {
    if (!message) return "No messages yet"

    if (message.messageType === "TEXT") {
        return (message?.content?.length ?? 0) > 30 ? message?.content?.substring(0, 30) + "..." : message.content || ""

    } else if (message.messageType === "IMAGE") {
        return "Sent an image"
    } else if (message.messageType === "FILE") {
        return "Sent a file"
    } else if (message.messageType === "VIDEO") {
        return "Sent a video"
    } else if (message.messageType === "AUDIO") {
        return "Sent an audio message"
    }

    return ""
}


export function getConversationLabel(
    conversation: any,
    currentUserId: string
): {
    isGeneral: boolean;
    isSelfChat: boolean;
    displayName: string;
} {
    // For channels:
    const isGeneral =
        conversation.type === ConversationType.CHANNEL &&
        conversation.title?.toLowerCase() === "general";

    // For your own "notes to self" conversation:
    const isSelfChat =
        conversation.type === ConversationType.PRIVATE &&
        conversation.title?.toLowerCase() === "self chat";

    // Default to conversation.title
    let displayName = conversation.title || "Untitled";

    if (conversation.type === ConversationType.PRIVATE && !isSelfChat) {
        // For a private chat, show the other user's name
        // conversationParticipants is an array
        const otherParticipant = conversation.participants?.find(
            (p: any) => p.userId !== currentUserId
        );
        // Use the other participant’s username if it exists
        if (otherParticipant?.user?.username) {
            displayName = otherParticipant.user.username;
        }
    }

    // If it's # General
    if (isGeneral) {
        displayName = "# General";
    } else if (isSelfChat) {
        displayName = "Notes to self";
    }

    return { isGeneral, isSelfChat, displayName };
}
// Export formatTime
export const formatTime = formatMessageTime

