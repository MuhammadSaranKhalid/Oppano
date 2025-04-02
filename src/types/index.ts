// Base types for reusability
export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

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

export interface User extends BaseEntity {
    username: string
    email: string
    profilePicture?: string
    phone?: string
    bio?: string
    lastActive: Date
}

export interface Organization extends BaseEntity {
    name: string
    domain?: string
}

export interface OrganizationUser extends BaseEntity {
    organizationId: string
    userId: string
    role: OrgMemberRole
    joinedAt: Date
    organization?: Organization
    user?: User
}

export interface Conversation extends BaseEntity {
    organizationId?: string
    type?: ConversationType
    title?: string
    description?: string
    isArchived?: boolean
    // lastMessageId?: string
    latest_message?: Message
    participants?: ConversationParticipant[]
    // messages?: Message[]
    // organization?: Organization
}

export interface ConversationParticipant extends BaseEntity {
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

export interface Message extends BaseEntity {
    conversationId?: string
    senderId?: string
    content?: string
    messageType?: MessageType
    // parentMessageId?: string
    // forwardedFromMessageId?: string
    status?: MessageStatus
    isDeleted?: boolean
    // conversation?: Conversation
    sender?: User
    // parentMessage?: Message
    // forwardedFrom?: Message
    attachments?: Attachments[]
    // childMessages?: Message[]
    // forwardedMessages?: Message[]
}

export interface Attachments extends BaseEntity {
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

