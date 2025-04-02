// "use client";

// import { useEffect, useRef, useMemo } from "react";
// import { groupMessagesBySender } from "./utils";
// import { useVirtualizer } from "@tanstack/react-virtual";
// import { useChatStore } from "@/store/chat-store";
// import MessageGroup from "./message-group";
// import { MessageListSkeleton } from "./skeletons/message-list-skeleton";

// export default function MessageList() {
//   const { messages, selectedConversation, isLoadingMessages, currentUser } =
//     useChatStore();

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const parentRef = useRef<HTMLDivElement>(null);

//   // Group messages by sender for better display
//   const groupedMessages = useMemo(() => {
//     return groupMessagesBySender(messages, currentUser?.id || "");
//   }, [messages, currentUser?.id]);

//   // Set up virtualization for better performance with large message lists
//   const rowVirtualizer = useVirtualizer({
//     count: groupedMessages.length,
//     getScrollElement: () => parentRef.current,
//     estimateSize: () => 100, // Estimate average height of a message group
//     overscan: 5,
//   });

//   // Scroll to bottom when new messages arrive
//   useEffect(() => {
//     if (messages.length > 0) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages.length]);

//   if (isLoadingMessages) {
//     return <MessageListSkeleton />;
//   }

//   if (!selectedConversation) {
//     return (
//       <div className="flex-1 p-4 flex items-center justify-center">
//         Select a conversation to view messages
//       </div>
//     );
//   }

//   return (
//     <div ref={parentRef} className="flex-1 overflow-y-auto p-4">
//       {groupedMessages.length === 0 ? (
//         <div className="flex h-full items-center justify-center text-muted-foreground">
//           No messages yet. Start the conversation!
//         </div>
//       ) : (
//         <div
//           className="relative w-full"
//           style={{
//             height: `${rowVirtualizer.getTotalSize()}px`,
//           }}
//         >
//           {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//             const group = groupedMessages[virtualRow.index];
//             return (
//               <div
//                 key={virtualRow.index}
//                 className="absolute top-0 left-0 w-full"
//                 style={{
//                   height: `${virtualRow.size}px`,
//                   transform: `translateY(${virtualRow.start}px)`,
//                 }}
//               >
//                 <MessageGroup
//                   sender={group.sender}
//                   messages={group.messages}
//                   isUser={group.isCurrentUser}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       )}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useMemo } from "react";
import { groupMessagesBySender } from "./utils";
import { useChatStore } from "@/store/chat-store";
import MessageItem from "./message-item";
import { MessageListSkeleton } from "./skeletons/message-list-skeleton";

export default function MessageList() {
  const { messages, selectedConversation, isLoadingMessages, currentUser } =
    useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Group messages using the updated function
  const groupedMessages = useMemo(() => {
    return groupMessagesBySender(messages, currentUser?.id || "");
  }, [messages, currentUser?.id]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoadingMessages) {
    return <MessageListSkeleton />;
  }

  if (!selectedConversation) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        Select a conversation to view messages
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {groupedMessages.length === 0 ? (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          No messages yet. Start the conversation!
        </div>
      ) : (
        groupedMessages.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-4">
            {group.messages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                isUser={group.isCurrentUser}
                showAvatar={index === 0}
                showName={!group.isCurrentUser && index === 0}
              />
            ))}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
