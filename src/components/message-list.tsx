// "use client";

// import { useEffect, useRef } from "react";
// import { useChatStore } from "@/store/chat-store";
// import { Check, Clock } from "lucide-react";
// import { cn } from "@/lib/utils";

// export function MessageList() {
//   const {
//     messages,
//     selectedConversation,
//     isLoadingMessages,
//     fetchMessages,
//     setupMessageListener,
//     currentUser,
//   } = useChatStore();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (selectedConversation) {
//       fetchMessages(selectedConversation.id);

//       // Set up real-time listener for new messages
//       const unsubscribe = setupMessageListener(selectedConversation.id);

//       // Clean up listener when component unmounts or conversation changes
//       return unsubscribe;
//     }
//   }, [selectedConversation, fetchMessages, setupMessageListener]);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (isLoadingMessages) {
//     return (
//       <div className="flex-1 p-4 flex items-center justify-center">
//         Loading messages...
//       </div>
//     );
//   }

//   if (!selectedConversation) {
//     return (
//       <div className="flex-1 p-4 flex items-center justify-center">
//         Select a conversation to view messages
//       </div>
//     );
//   }

//   // Group messages by sender
//   const groupedMessages = groupMessagesBySender(
//     messages,
//     currentUser?.id || ""
//   );

//   return (
//     <div className="flex-1 overflow-y-auto p-4">
//       <div className="space-y-6">
//         {groupedMessages.map((group, index) => (
//           <MessageGroup
//             key={index}
//             sender={group.sender}
//             messages={group.messages}
//             isUser={group.isCurrentUser}
//           />
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//     </div>
//   );
// }

// function MessageGroup({
//   sender,
//   messages,
//   isUser,
// }: {
//   sender: string;
//   messages: any[];
//   isUser: boolean;
// }) {
//   return (
//     <div className="space-y-2">
//       {messages.map((message, index) => (
//         <Message
//           key={message.id}
//           content={message.content || ""}
//           sender={sender}
//           time={formatMessageTime(message.createdAt)}
//           isUser={isUser}
//           showAvatar={index === 0}
//           showName={index === 0 && isUser}
//           isRead={message.status === "READ"}
//           replyTo={
//             message.parentMessageId
//               ? {
//                   avatar: "/placeholder.svg?height=24&width=24",
//                   name: "User",
//                 }
//               : undefined
//           }
//         />
//       ))}
//     </div>
//   );
// }

// function Message({
//   content,
//   sender,
//   time,
//   isUser = false,
//   showAvatar = true,
//   showName = false,
//   isRead = false,
//   replyTo,
// }: {
//   content: string;
//   sender: string;
//   time?: string;
//   isUser?: boolean;
//   showAvatar?: boolean;
//   showName?: boolean;
//   isRead?: boolean;
//   replyTo?: {
//     avatar: string;
//     name: string;
//   };
// }) {
//   const align = isUser ? "right" : "left";

//   return (
//     <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
//       {align === "left" && showAvatar && (
//         <div className="mt-1 h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
//           <span>{sender.charAt(0)}</span>
//         </div>
//       )}

//       <div
//         className={cn("flex flex-col", align === "right" ? "items-end" : "")}
//       >
//         {showName && align === "right" && (
//           <div className="flex items-center mb-1">
//             <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">
//               {sender}
//             </div>
//             {time && (
//               <span className="ml-2 text-xs text-muted-foreground">{time}</span>
//             )}
//           </div>
//         )}

//         <div
//           className={cn(
//             "rounded-lg p-3 max-w-[280px]",
//             align === "right"
//               ? "rounded-tr-none bg-[#ffd8b1] text-black"
//               : "rounded-tl-none bg-[#e9eaed] text-black"
//           )}
//         >
//           <div>{content}</div>
//         </div>

//         {replyTo && align === "left" && (
//           <div className="mt-1 flex items-center">
//             <div className="h-6 w-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
//               <span>{replyTo.name.charAt(0)}</span>
//             </div>
//           </div>
//         )}

//         {time && !showName && (
//           <div
//             className={cn(
//               "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
//               align === "right" ? "justify-end" : ""
//             )}
//           >
//             <span>{time}</span>
//             {align === "right" && isRead && (
//               <Check className="h-3 w-3 text-[#ff6a00]" />
//             )}
//             {align === "left" && <Clock className="h-3 w-3" />}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Helper function to group messages by sender
// function groupMessagesBySender(messages: any[], currentUserId: string) {
//   const groups: {
//     sender: string;
//     isCurrentUser: boolean;
//     messages: any[];
//   }[] = [];

//   let currentGroup: {
//     sender: string;
//     senderId: string;
//     isCurrentUser: boolean;
//     messages: any[];
//   } | null = null;

//   messages.forEach((message) => {
//     const isCurrentUser = message.senderId === currentUserId;
//     const senderName = message.sender?.username || "Unknown User";

//     // Start a new group if:
//     // 1. This is the first message
//     // 2. The sender changed
//     // 3. More than 5 minutes passed since the last message in the group
//     if (
//       !currentGroup ||
//       currentGroup.senderId !== message.senderId ||
//       (message.createdAt &&
//         currentGroup.messages[currentGroup.messages.length - 1].createdAt &&
//         new Date(message.createdAt).getTime() -
//           new Date(
//             currentGroup.messages[currentGroup.messages.length - 1].createdAt
//           ).getTime() >
//           5 * 60 * 1000)
//     ) {
//       if (currentGroup) {
//         groups.push(currentGroup);
//       }

//       currentGroup = {
//         sender: senderName,
//         senderId: message.senderId || "",
//         isCurrentUser,
//         messages: [message],
//       };
//     } else {
//       // Add to the current group
//       currentGroup.messages.push(message);
//     }
//   });

//   // Add the last group
//   if (currentGroup) {
//     groups.push(currentGroup);
//   }

//   return groups;
// }

// // Helper function to format message time
// function formatMessageTime(dateString?: Date | string): string {
//   if (!dateString) return "";

//   const date = new Date(dateString);
//   const now = new Date();

//   // Same day, just show time
//   if (date.toDateString() === now.toDateString()) {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   }

//   // Within the last week, show day name and time
//   const daysDiff = Math.floor(
//     (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
//   );
//   if (daysDiff < 7) {
//     return `${date.toLocaleDateString([], {
//       weekday: "short",
//     })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
//   }

//   // Otherwise show date and time
//   return date.toLocaleString([], {
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store/chat-store";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MessageList() {
  const {
    messages,
    selectedConversation,
    isLoadingMessages,
    fetchMessages,
    setupMessageListener,
    currentUser,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);

      // Set up real-time listener for  {
      fetchMessages(selectedConversation.id);

      // Set up real-time listener for new messages
      const unsubscribe = setupMessageListener(selectedConversation.id);

      // Clean up listener when component unmounts or conversation changes
      return unsubscribe;
    }
  }, [selectedConversation, fetchMessages, setupMessageListener]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isLoadingMessages) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        Loading messages...
      </div>
    );
  }

  if (!selectedConversation) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        Select a conversation to view messages
      </div>
    );
  }

  // Group messages by sender
  const groupedMessages = groupMessagesBySender(
    messages,
    currentUser?.id || ""
  );

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-6">
        {groupedMessages.map((group, index) => (
          <MessageGroup
            key={index}
            sender={group.sender}
            messages={group.messages}
            isUser={group.isCurrentUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

function MessageGroup({
  sender,
  messages,
  isUser,
}: {
  sender: string;
  messages: any[];
  isUser: boolean;
}) {
  return (
    <div className="space-y-2">
      {messages.map((message, index) => (
        <Message
          key={message.id}
          content={message.content || ""}
          sender={sender}
          time={formatMessageTime(message.createdAt)}
          isUser={isUser}
          showAvatar={index === 0}
          showName={index === 0 && isUser}
          isRead={message.status === "READ"}
          replyTo={
            message.parentMessageId
              ? {
                  avatar: "/placeholder.svg?height=24&width=24",
                  name: "User",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function Message({
  content,
  sender,
  time,
  isUser = false,
  showAvatar = true,
  showName = false,
  isRead = false,
  replyTo,
}: {
  content: string;
  sender: string;
  time?: string;
  isUser?: boolean;
  showAvatar?: boolean;
  showName?: boolean;
  isRead?: boolean;
  replyTo?: {
    avatar: string;
    name: string;
  };
}) {
  const align = isUser ? "right" : "left";

  return (
    <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
      {align === "left" && showAvatar && (
        <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
          <AvatarFallback>{sender.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn("flex flex-col", align === "right" ? "items-end" : "")}
      >
        {showName && align === "right" && (
          <div className="flex items-center mb-1">
            <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">
              {sender}
            </div>
            {time && (
              <span className="ml-2 text-xs text-muted-foreground">{time}</span>
            )}
          </div>
        )}

        <div
          className={cn(
            "rounded-lg p-3 max-w-[280px]",
            align === "right"
              ? "rounded-tr-none bg-[#ffd8b1] text-black"
              : "rounded-tl-none bg-[#e9eaed] text-black"
          )}
        >
          <div>{content}</div>
        </div>

        {replyTo && align === "left" && (
          <div className="mt-1 flex items-center">
            <Avatar className="h-6 w-6 flex-shrink-0">
              <AvatarFallback>{replyTo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}

        {time && !showName && (
          <div
            className={cn(
              "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
              align === "right" ? "justify-end" : ""
            )}
          >
            <span>{time}</span>
            {align === "right" && isRead && (
              <Check className="h-3 w-3 text-[#ff6a00]" />
            )}
            {align === "left" && <Clock className="h-3 w-3" />}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to group messages by sender
function groupMessagesBySender(messages: any[], currentUserId: string) {
  const groups: {
    sender: string;
    isCurrentUser: boolean;
    messages: any[];
  }[] = [];

  let currentGroup: {
    sender: string;
    senderId: string;
    isCurrentUser: boolean;
    messages: any[];
  } | null = null;

  messages.forEach((message) => {
    const isCurrentUser = message.senderId === currentUserId;
    const senderName = message.sender?.username || "Unknown User";

    // Start a new group if:
    // 1. This is the first message
    // 2. The sender changed
    // 3. More than 5 minutes passed since the last message in the group
    if (
      !currentGroup ||
      currentGroup.senderId !== message.senderId ||
      (message.createdAt &&
        currentGroup.messages[currentGroup.messages.length - 1].createdAt &&
        new Date(message.createdAt).getTime() -
          new Date(
            currentGroup.messages[currentGroup.messages.length - 1].createdAt
          ).getTime() >
          5 * 60 * 1000)
    ) {
      if (currentGroup) {
        groups.push(currentGroup);
      }

      currentGroup = {
        sender: senderName,
        senderId: message.senderId || "",
        isCurrentUser,
        messages: [message],
      };
    } else {
      // Add to the current group
      currentGroup.messages.push(message);
    }
  });

  // Add the last group
  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
}

// Helper function to format message time
function formatMessageTime(dateString?: Date | string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  // Same day, just show time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Within the last week, show day name and time
  const daysDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysDiff < 7) {
    return `${date.toLocaleDateString([], {
      weekday: "short",
    })} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }

  // Otherwise show date and time
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
