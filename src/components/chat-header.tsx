// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface ChatHeaderProps {
//   name: string
//   status: string
// }

// export function ChatHeader({ name, status }: ChatHeaderProps) {
//   return (
//     <div className="flex items-center border-b px-4 py-2">
//       <div className="flex items-center gap-2">
//         <Avatar className="h-8 w-8 rounded-full">
//           <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
//           <AvatarFallback>{name.charAt(0)}</AvatarFallback>
//         </Avatar>
//         <div>
//           <h2 className="text-sm font-medium">{name}</h2>
//           <p className="text-xs text-muted-foreground">{status}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useChatStore } from "@/store/chat-store";

export function ChatHeader() {
  const { selectedConversation } = useChatStore();

  if (!selectedConversation) {
    return (
      <div className="flex items-center border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium">Select a conversation</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span>{selectedConversation.title?.charAt(0) || "#"}</span>
        </div>
        <div>
          <h2 className="text-sm font-medium">
            {selectedConversation.title || "Untitled"}
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedConversation.type === "CHANNEL"
              ? "Channel"
              : selectedConversation.type === "GROUP"
              ? "Group"
              : "Direct Message"}
          </p>
        </div>
      </div>
    </div>
  );
}
