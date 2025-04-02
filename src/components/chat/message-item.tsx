// // // // "use client";

// // // // import { memo } from "react";
// // // // import { Check, Clock } from "lucide-react";
// // // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // // // import { cn } from "@/lib/utils";
// // // // import type { MessageItemProps } from "./types";
// // // // import { formatMessageTime } from "./utils";

// // // // const MessageItem = memo(function MessageItem({
// // // //   message,
// // // //   isUser,
// // // //   showAvatar,
// // // //   showName,
// // // //   isLastInGroup,
// // // // }: MessageItemProps) {
// // // //   const align = isUser ? "right" : "left";
// // // //   const senderName = message.sender?.username || "Unknown";
// // // //   const isRead = message.status === "READ";
// // // //   const time = formatMessageTime(message.createdAt);

// // // //   return (
// // // //     <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
// // // //       {align === "left" && showAvatar && (
// // // //         <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
// // // //           <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
// // // //           <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
// // // //         </Avatar>
// // // //       )}

// // // //       <div
// // // //         className={cn("flex flex-col", align === "right" ? "items-end" : "")}
// // // //       >
// // // //         {showName && align === "right" && (
// // // //           <div className="flex items-center mb-1">
// // // //             <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">
// // // //               {senderName}
// // // //             </div>
// // // //             {time && (
// // // //               <span className="ml-2 text-xs text-muted-foreground">{time}</span>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         <div
// // // //           className={cn(
// // // //             "rounded-lg p-3 max-w-[280px]",
// // // //             align === "right"
// // // //               ? "rounded-tr-none bg-[#ffd8b1] text-black"
// // // //               : "rounded-tl-none bg-[#e9eaed] text-black"
// // // //           )}
// // // //         >
// // // //           <div>{message.content}</div>
// // // //           {message.messageType === "IMAGE" && message.content && (
// // // //             <div className="mt-2">
// // // //               <img
// // // //                 src={message.content || "/placeholder.svg"}
// // // //                 alt="Shared image"
// // // //                 className="rounded-md"
// // // //               />
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {message.parentMessageId && align === "left" && (
// // // //           <div className="mt-1 flex items-center">
// // // //             <Avatar className="h-6 w-6 flex-shrink-0">
// // // //               <AvatarFallback>R</AvatarFallback>
// // // //             </Avatar>
// // // //           </div>
// // // //         )}

// // // //         {isLastInGroup && time && !showName && (
// // // //           <div
// // // //             className={cn(
// // // //               "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
// // // //               align === "right" ? "justify-end" : ""
// // // //             )}
// // // //           >
// // // //             <span>{time}</span>
// // // //             {align === "right" && isRead && (
// // // //               <Check className="h-3 w-3 text-[#ff6a00]" />
// // // //             )}
// // // //             {align === "left" && <Clock className="h-3 w-3" />}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // });

// // // // export default MessageItem;

// // // "use client";

// // // import { memo } from "react";
// // // import { Check, Clock } from "lucide-react";
// // // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // // import { cn } from "@/lib/utils";
// // // import type { MessageItemProps } from "./types";
// // // import { formatMessageTime } from "./utils";
// // // import { useChatStore } from "@/store/chat-store";

// // // const MessageItem = memo(function MessageItem({
// // //   message,
// // //   isUser,
// // //   showAvatar,
// // //   showName,
// // //   isLastInGroup,
// // // }: MessageItemProps) {
// // //   const { selectedConversation } = useChatStore();
// // //   console.log("Selected Conversation : ", selectedConversation);

// // //   const align = isUser ? "right" : "left";
// // //   const senderName = message.sender?.username || "Unknown";
// // //   const isRead = message.status === "READ";
// // //   const time = formatMessageTime(message.createdAt);

// // //   return (
// // //     <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
// // //       {align === "left" && showAvatar && (
// // //         <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
// // //           <AvatarImage
// // //             src="/placeholder.svg?height=32&width=32"
// // //             alt={`${senderName}'s avatar`}
// // //           />
// // //           <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
// // //         </Avatar>
// // //       )}

// // //       <div
// // //         className={cn("flex flex-col", align === "right" ? "items-end" : "")}
// // //       >
// // //         {!isUser && showName && (
// // //           <div className="flex items-center mb-1">
// // //             <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">
// // //               {senderName}
// // //             </div>
// // //             {time && (
// // //               <span className="ml-2 text-xs text-muted-foreground">{time}</span>
// // //             )}
// // //           </div>
// // //         )}

// // //         <div
// // //           className={cn(
// // //             "rounded-lg p-3 max-w-[280px]",
// // //             align === "right"
// // //               ? "rounded-tr-none bg-[#ffd8b1] text-black"
// // //               : "rounded-tl-none bg-[#e9eaed] text-black"
// // //           )}
// // //         >
// // //           <div>{message.content}</div>
// // //           {message.messageType === "IMAGE" && message.content && (
// // //             <div className="mt-2">
// // //               <img
// // //                 src={message.content || "/placeholder.svg"}
// // //                 alt="Shared image"
// // //                 className="rounded-md"
// // //               />
// // //             </div>
// // //           )}
// // //         </div>

// // //         {message.parentMessageId && align === "left" && (
// // //           <div className="mt-1 flex items-center">
// // //             <Avatar className="h-6 w-6 flex-shrink-0">
// // //               <AvatarFallback>R</AvatarFallback>
// // //             </Avatar>
// // //           </div>
// // //         )}

// // //         {isLastInGroup && time && (
// // //           <div
// // //             className={cn(
// // //               "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
// // //               align === "right" ? "justify-end" : ""
// // //             )}
// // //           >
// // //             <span>{time}</span>
// // //             {align === "right" && isRead && (
// // //               <Check className="h-3 w-3 text-[#ff6a00]" />
// // //             )}
// // //             {align === "left" && <Clock className="h-3 w-3" />}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // });

// // // export default MessageItem;

// // "use client";

// // import { memo } from "react";
// // import { Check, Clock } from "lucide-react";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import { cn } from "@/lib/utils";
// // import type { MessageItemProps } from "./types";
// // import { formatMessageTime } from "./utils";
// // import { useChatStore } from "@/store/chat-store";

// // const MessageItem = memo(function MessageItem({
// //   message,
// //   isUser,
// //   showAvatar,
// //   showName,
// //   isLastInGroup,
// // }: MessageItemProps) {
// //   const { selectedConversation } = useChatStore();
// //   const align = isUser ? "right" : "left";
// //   const senderName = message.sender?.username || "Unknown";
// //   const isRead = message.status === "READ";
// //   const time = formatMessageTime(message.createdAt);

// //   // Determine the avatar source based on conversation type:
// //   // For channel conversations, use the sender's profilePicture (if available).
// //   const avatarSrc =
// //     selectedConversation?.type === "CHANNEL" && message.sender?.profilePicture
// //       ? message.sender.profilePicture
// //       : "/placeholder.svg?height=32&width=32";

// //   return (
// //     <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
// //       {align === "left" && showAvatar && selectedConversation?.type === "CHANNEL" && (
// //         <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
// //           <AvatarImage src={avatarSrc} alt={`${senderName}'s avatar`} />
// //           <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
// //         </Avatar>
// //       )}

// //       <div
// //         className={cn("flex flex-col", align === "right" ? "items-end" : "")}
// //       >
// //         {!isUser && showName && (
// //           <div className="flex items-center mb-1">
// //             <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">
// //               {senderName}
// //             </div>
// //             {time && (
// //               <span className="ml-2 text-xs text-muted-foreground">{time}</span>
// //             )}
// //           </div>
// //         )}

// //         <div
// //           className={cn(
// //             "rounded-lg p-3 max-w-[280px]",
// //             align === "right"
// //               ? "rounded-tr-none bg-[#ffd8b1] text-black"
// //               : "rounded-tl-none bg-[#e9eaed] text-black"
// //           )}
// //         >
// //           <div>{message.content}</div>
// //           {/** Only show image messages if in a channel conversation */}
// //           {message.messageType === "IMAGE" &&
// //             message.content &&
// //             selectedConversation?.type === "CHANNEL" && (
// //               <div className="mt-2">
// //                 <img
// //                   src={message.content || "/placeholder.svg"}
// //                   alt="Shared image"
// //                   className="rounded-md"
// //                 />
// //               </div>
// //             )}
// //         </div>

// //         {message.parentMessageId && align === "left" && (
// //           <div className="mt-1 flex items-center">
// //             <Avatar className="h-6 w-6 flex-shrink-0">
// //               <AvatarFallback>R</AvatarFallback>
// //             </Avatar>
// //           </div>
// //         )}

// //         {isLastInGroup && time && (
// //           <div
// //             className={cn(
// //               "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
// //               align === "right" ? "justify-end" : ""
// //             )}
// //           >
// //             <span>{time}</span>
// //             {align === "right" && isRead && (
// //               <Check className="h-3 w-3 text-[#ff6a00]" />
// //             )}
// //             {align === "left" && <Clock className="h-3 w-3" />}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // });

// // export default MessageItem;

// "use client";

// import { memo } from "react";
// import { Check, Clock } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";
// import type { MessageItemProps } from "./types";
// import { formatMessageTime } from "./utils";
// import { useChatStore } from "@/store/chat-store";

// const MessageItem = memo(function MessageItem({
//   message,
//   isUser,
//   showAvatar,
//   showName,
//   isLastInGroup,
// }: MessageItemProps) {
//   const { selectedConversation } = useChatStore();
//   const align = isUser ? "right" : "left";
//   const senderName = message.sender?.username || "Unknown";
//   const isRead = message.status === "READ";
//   const time = formatMessageTime(message.createdAt);

//   // For channel conversations, use the sender's profile picture if available.
//   const avatarSrc =
//     selectedConversation?.type === "CHANNEL" && message.sender?.profilePicture
//       ? message.sender.profilePicture
//       : "/placeholder.svg?height=32&width=32";

//   return (
//     <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
//       {align === "left" &&
//         showAvatar &&
//         selectedConversation?.type === "CHANNEL" && (
//           <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
//             <AvatarImage src={avatarSrc} alt={`${senderName}'s avatar`} />
//             <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
//           </Avatar>
//         )}

//       <div
//         className={cn("flex flex-col", align === "right" ? "items-end" : "")}
//       >
//         {!isUser && showName && (
//           <div className="flex items-center mb-1">
//             <div className="rounded-lg bg-[#ffd8b1] px-3 py-1 text-sm">
//               {senderName}
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
//           {/* Display text content if available */}
//           {message.content && <div>{message.content}</div>}

//           {/* Display image message if type IMAGE and no separate attachment exists */}
//           {message.messageType === "IMAGE" &&
//             !message.attachments &&
//             message.content &&
//             selectedConversation?.type === "CHANNEL" && (
//               <div className="mt-2">
//                 <img
//                   src={message.content || "/placeholder.svg"}
//                   alt="Shared image"
//                   className="rounded-md"
//                 />
//               </div>
//             )}

//           {/* Display file attachments if message type is FILE and attachments exist */}
//           {message.messageType === "FILE" &&
//             message.attachments &&
//             message.attachments.length > 0 && (
//               <div className="mt-2">
//                 {message.attachments[0].fileType.startsWith("image/") ? (
//                   <img
//                     src={message.attachments[0].fileUrl}
//                     alt="Shared file"
//                     className="rounded-md"
//                   />
//                 ) : (
//                   <a
//                     href={message.attachments[0].fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="underline text-blue-500"
//                   >
//                     Download File:{" "}
//                     {message.attachments[0].metadata?.name || "file"}
//                   </a>
//                 )}
//               </div>
//             )}
//         </div>

//         {message.parentMessageId && align === "left" && (
//           <div className="mt-1 flex items-center">
//             <Avatar className="h-6 w-6 flex-shrink-0">
//               <AvatarFallback>R</AvatarFallback>
//             </Avatar>
//           </div>
//         )}

//         {isLastInGroup && time && (
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
// });

// export default MessageItem;

"use client";

import { memo } from "react";
import { Check, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { MessageItemProps } from "./types";
import { formatMessageTime } from "./utils";
import { useChatStore } from "@/store/chat-store";

const MessageItem = memo(function MessageItem({
  message,
  isUser,
  showAvatar,
  showName,
}: MessageItemProps) {
  const { selectedConversation } = useChatStore();
  const align = isUser ? "right" : "left";
  const senderName = message.sender?.username || "Unknown";
  const isRead = message.status === "READ";
  const time = formatMessageTime(message.createdAt);

  // For channel conversations, use the sender's profile picture if available.
  const avatarSrc =
    selectedConversation?.type === "CHANNEL" && message.sender?.profilePicture
      ? message.sender.profilePicture
      : "/placeholder.svg?height=32&width=32";

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "right" ? "items-end" : "items-start"
      )}
    >
      <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
        {align === "left" &&
          showAvatar &&
          selectedConversation?.type === "CHANNEL" && (
            <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
              <AvatarImage src={avatarSrc} alt={`${senderName}'s avatar`} />
              <AvatarFallback>{senderName.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        <div
          className={cn(
            "rounded-lg p-3 max-w-[280px]",
            align === "right"
              ? "rounded-tr-none bg-[#ffd8b1] text-black"
              : "rounded-tl-none bg-[#e9eaed] text-black"
          )}
        >
          {message.content && <div>{message.content}</div>}

          {message.messageType === "IMAGE" &&
            !message.attachments &&
            message.content &&
            selectedConversation?.type === "CHANNEL" && (
              <div className="mt-2">
                <img
                  src={message.content || "/placeholder.svg"}
                  alt="Shared image"
                  className="rounded-md"
                />
              </div>
            )}

          {message.messageType === "FILE" &&
            message.attachments &&
            message.attachments.length > 0 && (
              <div className="mt-2">
                {message.attachments[0].fileType.startsWith("image/") ? (
                  <img
                    src={message.attachments[0].fileUrl}
                    alt="Shared file"
                    className="rounded-md"
                  />
                ) : (
                  <a
                    href={message.attachments[0].fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-500"
                  >
                    Download File:{" "}
                    {/* {message.attachments[0].metadata?.name || "file"} */}
                  </a>
                )}
              </div>
            )}
        </div>
      </div>
      <div className="text-xs text-muted-foreground flex items-center gap-1">
        <span>{time}</span>
        {align === "right" && isRead && (
          <Check className="h-3 w-3 text-[#ff6a00]" />
        )}
        {align === "left" && <Clock className="h-3 w-3" />}
      </div>
    </div>
  );
});

export default MessageItem;
