// "use client"

// import { Plus, Send, Smile } from "lucide-react"
// import { Input } from "@/components/ui/input"

// interface MessageInputProps {
//   onSend?: (message: string) => void
// }

// export function MessageInput({ onSend }: MessageInputProps) {
//   return (
//     <div className="border-t p-4">
//       <div className="flex items-center">
//         <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
//           <Plus className="h-5 w-5" />
//         </button>
//         <div className="relative mx-2 flex-1">
//           <Input
//             placeholder="Type your message"
//             className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
//           />
//           <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
//             <Smile className="h-5 w-5" />
//           </button>
//         </div>
//         <button
//           className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white"
//           onClick={() => onSend && onSend("")}
//         >
//           <Send className="h-5 w-5" />
//         </button>
//       </div>
//     </div>
//   )
// }

"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Send, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/chat-store";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const { selectedConversation, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!message.trim() || !selectedConversation) return;

    sendMessage(message, selectedConversation.id);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-center">
        <button className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100">
          <Plus className="h-5 w-5" />
        </button>
        <div className="relative mx-2 flex-1">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
            className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
            disabled={!selectedConversation}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <Smile className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={!message.trim() || !selectedConversation}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
