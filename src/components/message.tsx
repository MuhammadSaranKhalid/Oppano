import { Check, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export interface MessageContent {
  text: string
  image?: string
  link?: string
}

interface MessageProps {
  content: MessageContent
  sender: string
  time?: string
  isUser?: boolean
  showAvatar?: boolean
  showName?: boolean
  isRead?: boolean
  replyTo?: {
    avatar: string
    name: string
  }
}

export function Message({
  content,
  sender,
  time,
  isUser = false,
  showAvatar = true,
  showName = false,
  isRead = false,
  replyTo,
}: MessageProps) {
  const align = isUser ? "right" : "left"

  return (
    <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
      {align === "left" && showAvatar && (
        <Avatar className="mt-1 h-8 w-8 rounded-full flex-shrink-0">
          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
          <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col", align === "right" ? "items-end" : "")}>
        {showName && align === "right" && (
          <div className="flex items-center mb-1">
            <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">{sender}</div>
            {time && <span className="ml-2 text-xs text-muted-foreground">{time}</span>}
          </div>
        )}

        <div
          className={cn(
            "rounded-lg p-3 max-w-[280px]",
            align === "right" ? "rounded-tr-none bg-[#ffd8b1] text-black" : "rounded-tl-none bg-[#e9eaed] text-black",
          )}
        >
          <div>{content.text}</div>
          {content.image && (
            <div className="mt-2">
              <img src={content.image || "/placeholder.svg"} alt="Shared image" className="rounded-md" />
            </div>
          )}
          {content.link && (
            <a href={content.link} className="text-[#ff6a00]">
              {content.link}
            </a>
          )}
        </div>

        {replyTo && align === "left" && (
          <div className="mt-1 flex items-center">
            <Avatar className="h-6 w-6 rounded-full flex-shrink-0">
              <AvatarImage src={`/placeholder.svg?height=24&width=24`} />
              <AvatarFallback>{replyTo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}

        {time && !showName && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
              align === "right" ? "justify-end" : "",
            )}
          >
            <span>{time}</span>
            {align === "right" && isRead && <Check className="h-3 w-3 text-[#ff6a00]" />}
            {align === "left" && <Clock className="h-3 w-3" />}
          </div>
        )}
      </div>
    </div>
  )
}

