
export enum OrgMemberRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export enum ConversationType {
    PRIVATE = "PRIVATE",
    GROUP = "GROUP",
    CHANNEL = "CHANNEL",
}

export enum ConversationParticipantRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export enum MessageType {
    TEXT = "TEXT",
    IMAGE = "IMAGE",
    FILE = "FILE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
}

export enum MessageStatus {
    SENT = "SENT",
    DELIVERED = "DELIVERED",
    READ = "READ",
}

export interface User {
    id: string
    username: string
    email: string
    profilePicture?: string
    phone?: string
    bio?: string
    lastActive: Date
    createdAt: Date
    updatedAt: Date
}

export interface Organization {
    id: string
    name: string
    domain?: string
    createdAt: Date
    updatedAt: Date
}

export interface OrganizationUser {
    id: string
    organizationId: string
    userId: string
    role: OrgMemberRole
    joinedAt: Date
    organization?: Organization
    user?: User
}

export interface Conversation {
    id?: string
    organizationId?: string
    type?: ConversationType
    title?: string
    description?: string
    isArchived?: boolean
    lastMessageId?: string
    createdAt?: Date
    updatedAt?: Date
    conversationParticipants?: ConversationParticipant[]
    messages?: Message[]
    organization?: Organization
}

export interface ConversationParticipant {
    id: string
    conversationId: string
    userId: string
    role: ConversationParticipantRole
    joinedAt: Date
    lastReadMessageId?: number
    notificationMuted: boolean
    isActive: boolean
    conversation?: Conversation
    user?: User
}

export interface Message {
    id?: string
    conversationId?: string
    senderId?: string
    content?: string
    messageType?: MessageType
    parentMessageId?: string
    forwardedFromMessageId?: string
    createdAt?: Date
    updatedAt?: Date
    status?: MessageStatus
    isDeleted?: boolean
    conversation?: Conversation
    sender?: User
    parentMessage?: Message
    forwardedFrom?: Message
    attachments?: Attachments[]
    childMessages?: Message[]
    forwardedMessages?: Message[]
}

export interface Attachments {
    id: string
    fileSize: number
    fileType: string
    fileUrl: string
    messageId: string
}


export interface ProfileInfo {
    name: string
    title: string
    pronouns: string
    avatar?: string
    status: string
    localTime: string
    startDate: string
    linkedIn?: string
}

