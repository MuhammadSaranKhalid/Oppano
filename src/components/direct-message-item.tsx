"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface DirectMessageItemProps {
  name: string
  status: string
  time: string
  isYou?: boolean
  isActive?: boolean
  unread?: number
  onClick?: () => void
}

export function DirectMessageItem({
  name,
  status,
  time,
  isYou = false,
  isActive = false,
  unread = 0,
  onClick,
}: DirectMessageItemProps) {
  return (
    <button
      className={cn("flex w-full items-center gap-2 px-2 py-2 text-sm", isActive ? "bg-[#fff9e5]" : "hover:bg-muted")}
      onClick={onClick}
    >
      <Avatar className="h-8 w-8 rounded-full">
        <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col items-start overflow-hidden">
        <div className="flex items-center gap-1 w-full">
          <span className="font-medium truncate">{name}</span>
          {isYou && <span className="text-xs text-muted-foreground whitespace-nowrap">(You)</span>}
        </div>
        <span className="text-xs text-muted-foreground truncate w-full">{status}</span>
      </div>
      <div className="flex flex-col items-end gap-1 ml-1 flex-shrink-0">
        <span className="text-xs text-muted-foreground whitespace-nowrap">{time}</span>
        {unread > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6a00] text-xs text-white">
            {unread}
          </span>
        )}
      </div>
    </button>
  )
}

