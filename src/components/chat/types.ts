import type React from "react"
import type { User, Conversation, Message } from "@/types"

export interface ChatContextType {
    conversations: Conversation[]
    selectedConversation: Conversation | null
    messages: Message[]
    currentUser: User | null
    isLoadingConversations: boolean
    isLoadingChannels: boolean
    isLoadingDirectMessages: boolean
    isLoadingMessages: boolean
    latestMessages: Record<string, Message>
    unreadCounts: Record<string, number>

    fetchConversations: () => Promise<void>
    selectConversation: (conversationId: string) => Promise<void>
    fetchMessages: (conversationId: string) => Promise<void>
    sendMessage: (content: string, conversationId: string) => Promise<void>
    markMessageAsRead: (messageId: string) => Promise<void>
}

export interface MessageItemProps {
    message: Message
    isUser: boolean
    showAvatar: boolean
    showName: boolean
    isLastInGroup?: boolean
}

export interface MessageGroupProps {
    sender: string
    messages: Message[]
    isUser: boolean
}

export interface ConversationItemProps {
    conversation: Conversation
    isActive: boolean
    latestMessage?: Message
    unreadCount: number
    onClick: () => void
}

export interface ChannelItemProps {
    name: string
    conversationId: string
    isPrivate?: boolean
    isActive: boolean
    latestMessage?: Message
    unreadCount: number
    onClick: (id: string) => void
}

export interface DirectMessageItemProps {
    name: string
    conversationId: string
    isYou?: boolean
    isActive: boolean
    latestMessage?: Message
    unreadCount: number
    onClick: (id: string) => void
}

export interface NavItemProps {
    icon: React.ReactNode | string
    label: string
    active?: boolean
    onClick?: () => void
}

export interface ChannelSectionProps {
    channels: Conversation[]
    selectedConversationId: string | undefined
    latestMessages: Record<string, Message>
    unreadCounts: Record<string, number>
    onSelectConversation: (id: string) => void
    isLoading: boolean
}

export interface DirectMessageSectionProps {
    directMessages: Conversation[]
    selectedConversationId: string | undefined
    latestMessages: Record<string, Message>
    unreadCounts: Record<string, number>
    onSelectConversation: (id: string) => void
    isLoading: boolean
}

export interface MessageInputProps {
    onSend: (message: string) => void
    disabled: boolean
}

export interface ChatHeaderProps {
    conversation: Conversation | null
    isLoading: boolean
}

