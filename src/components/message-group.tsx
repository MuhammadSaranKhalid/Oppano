import { Message, type MessageContent } from "@/components/message"

interface MessageGroupProps {
  sender: string
  messages: {
    content: MessageContent
    time?: string
    isRead?: boolean
    replyTo?: {
      avatar: string
      name: string
    }
  }[]
  isUser?: boolean
}

export function MessageGroup({ sender, messages, isUser = false }: MessageGroupProps) {
  return (
    <div className="space-y-2">
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          sender={sender}
          time={message.time}
          isUser={isUser}
          showAvatar={index === 0}
          showName={index === 0 && isUser}
          isRead={message.isRead}
          replyTo={message.replyTo}
        />
      ))}
    </div>
  )
}

