import { ChatHeader } from "@/components/chat-header"
import { MessageGroup } from "@/components/message-group"
import { MessageInput } from "@/components/message-input"

export function ChatArea() {
  const messages = [
    {
      sender: "Bill Kuphal",
      isUser: false,
      messages: [
        {
          content: { text: "Who was that philosopher you shared with me recently?" },
          time: "2:14 PM",
        },
      ],
    },
    {
      sender: "Roland Barthes",
      isUser: true,
      messages: [
        {
          content: { text: "That's him!" },
          time: "2:16 PM",
        },
      ],
    },
    {
      sender: "Bill Kuphal",
      isUser: false,
      messages: [
        {
          content: { text: "What was his vision statement?" },
          time: "2:18 PM",
        },
      ],
    },
    {
      sender: "Roland Barthes",
      isUser: true,
      messages: [
        {
          content: {
            text: '"Ultimately in order to see a photograph well, it is best to look away or close your eyes."',
          },
          time: "2:16 PM",
        },
        {
          content: {
            text: "Aerial photograph from the Helsinki urban environment division.",
            image: "/placeholder.svg?height=200&width=300",
          },
          time: "2:20 PM",
          isRead: true,
        },
      ],
    },
    {
      sender: "Bill Kuphal",
      isUser: false,
      messages: [
        {
          content: { text: "Aerial photograph from the Helsinki urban environment division" },
        },
        {
          content: {
            text: "Check this ",
            link: "https://dribbble.com",
          },
          time: "2:22 PM",
          replyTo: {
            avatar: "/placeholder.svg?height=24&width=24",
            name: "Roland Barthes",
          },
        },
      ],
    },
  ]

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      <ChatHeader name="Bill Kuphal" status="Online for 10 mins" />

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((group, index) => (
            <MessageGroup key={index} sender={group.sender} messages={group.messages} isUser={group.isUser} />
          ))}
        </div>
      </div>

      <MessageInput />
    </div>
  )
}

