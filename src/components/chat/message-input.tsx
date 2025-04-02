// // // // // // "use client";

// // // // // // import type React from "react";

// // // // // // import { useState, useRef, useCallback } from "react";
// // // // // // import { Plus, Send, Smile } from "lucide-react";
// // // // // // import { Input } from "@/components/ui/input";
// // // // // // import { Button } from "@/components/ui/button";
// // // // // // import type { MessageInputProps } from "./types";

// // // // // // export default function MessageInput({ onSend, disabled }: MessageInputProps) {
// // // // // //   const [message, setMessage] = useState("");
// // // // // //   const inputRef = useRef<HTMLInputElement>(null);

// // // // // //   const handleSend = useCallback(() => {
// // // // // //     if (!message.trim() || disabled) return;

// // // // // //     onSend(message);
// // // // // //     setMessage("");

// // // // // //     // Focus the input after sending
// // // // // //     setTimeout(() => {
// // // // // //       inputRef.current?.focus();
// // // // // //     }, 0);
// // // // // //   }, [message, disabled, onSend]);

// // // // // //   const handleKeyDown = useCallback(
// // // // // //     (e: React.KeyboardEvent<HTMLInputElement>) => {
// // // // // //       if (e.key === "Enter" && !e.shiftKey) {
// // // // // //         e.preventDefault();
// // // // // //         handleSend();
// // // // // //       }
// // // // // //     },
// // // // // //     [handleSend]
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="border-t p-4">
// // // // // //       <div className="flex items-center">
// // // // // //         <Button
// // // // // //           variant="ghost"
// // // // // //           size="icon"
// // // // // //           className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
// // // // // //           aria-label="Add attachment"
// // // // // //           disabled={disabled}
// // // // // //         >
// // // // // //           <Plus className="h-5 w-5" />
// // // // // //         </Button>
// // // // // //         <div className="relative mx-2 flex-1">
// // // // // //           <Input
// // // // // //             ref={inputRef}
// // // // // //             value={message}
// // // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // // //             onKeyDown={handleKeyDown}
// // // // // //             placeholder={
// // // // // //               disabled
// // // // // //                 ? "Select a conversation to start chatting"
// // // // // //                 : "Type your message"
// // // // // //             }
// // // // // //             className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
// // // // // //             disabled={disabled}
// // // // // //             aria-label="Message input"
// // // // // //           />
// // // // // //           <Button
// // // // // //             variant="ghost"
// // // // // //             size="icon"
// // // // // //             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // // // //             aria-label="Add emoji"
// // // // // //             disabled={disabled}
// // // // // //           >
// // // // // //             <Smile className="h-5 w-5" />
// // // // // //           </Button>
// // // // // //         </div>
// // // // // //         <Button
// // // // // //           onClick={handleSend}
// // // // // //           disabled={!message.trim() || disabled}
// // // // // //           className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
// // // // // //           aria-label="Send message"
// // // // // //         >
// // // // // //           <Send className="h-5 w-5" />
// // // // // //         </Button>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // "use client";

// // // // // import React, { useState, useRef, useCallback } from "react";
// // // // // import { Plus, Send, Smile, Upload } from "lucide-react";
// // // // // import { Input } from "@/components/ui/input";
// // // // // import { Button } from "@/components/ui/button";
// // // // // import type { MessageInputProps } from "./types";
// // // // // import { useChatStore } from "@/store/chat-store";

// // // // // export default function MessageInput({ onSend, disabled }: MessageInputProps) {
// // // // //   const [message, setMessage] = useState("");
// // // // //   const inputRef = useRef<HTMLInputElement>(null);
// // // // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // // // //   const { sendFileMessage, selectedConversation } = useChatStore();

// // // // //   const handleSend = useCallback(() => {
// // // // //     if (!message.trim() || disabled) return;
// // // // //     onSend(message);
// // // // //     setMessage("");
// // // // //     setTimeout(() => {
// // // // //       inputRef.current?.focus();
// // // // //     }, 0);
// // // // //   }, [message, disabled, onSend]);

// // // // //   const handleKeyDown = useCallback(
// // // // //     (e: React.KeyboardEvent<HTMLInputElement>) => {
// // // // //       if (e.key === "Enter" && !e.shiftKey) {
// // // // //         e.preventDefault();
// // // // //         handleSend();
// // // // //       }
// // // // //     },
// // // // //     [handleSend]
// // // // //   );

// // // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     if (e.target.files && e.target.files[0] && selectedConversation) {
// // // // //       const file = e.target.files[0];
// // // // //       await sendFileMessage(file, selectedConversation.id);
// // // // //       // Clear the file input so the same file can be uploaded again if needed
// // // // //       e.target.value = "";
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="border-t p-4">
// // // // //       <div className="flex items-center">
// // // // //         <Button
// // // // //           variant="ghost"
// // // // //           size="icon"
// // // // //           className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
// // // // //           aria-label="Add attachment"
// // // // //           disabled={disabled}
// // // // //           onClick={() => fileInputRef.current?.click()}
// // // // //         >
// // // // //           <Upload className="h-5 w-5" />
// // // // //         </Button>
// // // // //         <input
// // // // //           type="file"
// // // // //           ref={fileInputRef}
// // // // //           onChange={handleFileChange}
// // // // //           style={{ display: "none" }}
// // // // //         />
// // // // //         <div className="relative mx-2 flex-1">
// // // // //           <Input
// // // // //             ref={inputRef}
// // // // //             value={message}
// // // // //             onChange={(e) => setMessage(e.target.value)}
// // // // //             onKeyDown={handleKeyDown}
// // // // //             placeholder={
// // // // //               disabled
// // // // //                 ? "Select a conversation to start chatting"
// // // // //                 : "Type your message"
// // // // //             }
// // // // //             className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
// // // // //             disabled={disabled}
// // // // //             aria-label="Message input"
// // // // //           />
// // // // //           <Button
// // // // //             variant="ghost"
// // // // //             size="icon"
// // // // //             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // // //             aria-label="Add emoji"
// // // // //             disabled={disabled}
// // // // //           >
// // // // //             <Smile className="h-5 w-5" />
// // // // //           </Button>
// // // // //         </div>
// // // // //         <Button
// // // // //           onClick={handleSend}
// // // // //           disabled={!message.trim() || disabled}
// // // // //           className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
// // // // //           aria-label="Send message"
// // // // //         >
// // // // //           <Send className="h-5 w-5" />
// // // // //         </Button>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import React, { useState, useRef, useCallback } from "react";
// // // // import { Plus, Send, Smile, Upload } from "lucide-react";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Button } from "@/components/ui/button";
// // // // import type { MessageInputProps } from "./types";
// // // // import { useChatStore } from "@/store/chat-store";

// // // // export default function MessageInput({ onSend, disabled }: MessageInputProps) {
// // // //   const [message, setMessage] = useState("");
// // // //   const [selectedFileName, setSelectedFileName] = useState("");
// // // //   const inputRef = useRef<HTMLInputElement>(null);
// // // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // // //   const { sendFileMessage, selectedConversation } = useChatStore();

// // // //   const handleSend = useCallback(() => {
// // // //     if (!message.trim() || disabled) return;
// // // //     onSend(message);
// // // //     setMessage("");
// // // //     setTimeout(() => {
// // // //       inputRef.current?.focus();
// // // //     }, 0);
// // // //   }, [message, disabled, onSend]);

// // // //   const handleKeyDown = useCallback(
// // // //     (e: React.KeyboardEvent<HTMLInputElement>) => {
// // // //       if (e.key === "Enter" && !e.shiftKey) {
// // // //         e.preventDefault();
// // // //         handleSend();
// // // //       }
// // // //     },
// // // //     [handleSend]
// // // //   );

// // // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     if (e.target.files && e.target.files[0] && selectedConversation) {
// // // //       const file = e.target.files[0];
// // // //       // Store the file name to show in the UI
// // // //       setSelectedFileName(file.name);
// // // //       await sendFileMessage(file, selectedConversation.id);
// // // //       // Clear the file input so the same file can be uploaded again if needed
// // // //       e.target.value = "";
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="border-t p-4">
// // // //       <div className="flex items-center">
// // // //         <Button
// // // //           variant="ghost"
// // // //           size="icon"
// // // //           className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
// // // //           aria-label="Add attachment"
// // // //           disabled={disabled}
// // // //           onClick={() => fileInputRef.current?.click()}
// // // //         >
// // // //           <Upload className="h-5 w-5" />
// // // //         </Button>
// // // //         {/* Hidden file input */}
// // // //         <input
// // // //           type="file"
// // // //           ref={fileInputRef}
// // // //           onChange={handleFileChange}
// // // //           style={{ display: "none" }}
// // // //         />
// // // //         {/* Display selected file name if any */}
// // // //         {selectedFileName && (
// // // //           <span className="ml-2 text-sm text-gray-600">{selectedFileName}</span>
// // // //         )}
// // // //         <div className="relative mx-2 flex-1">
// // // //           <Input
// // // //             ref={inputRef}
// // // //             value={message}
// // // //             onChange={(e) => setMessage(e.target.value)}
// // // //             onKeyDown={handleKeyDown}
// // // //             placeholder={
// // // //               disabled
// // // //                 ? "Select a conversation to start chatting"
// // // //                 : "Type your message"
// // // //             }
// // // //             className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
// // // //             disabled={disabled}
// // // //             aria-label="Message input"
// // // //           />
// // // //           <Button
// // // //             variant="ghost"
// // // //             size="icon"
// // // //             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // // //             aria-label="Add emoji"
// // // //             disabled={disabled}
// // // //           >
// // // //             <Smile className="h-5 w-5" />
// // // //           </Button>
// // // //         </div>
// // // //         <Button
// // // //           onClick={handleSend}
// // // //           disabled={!message.trim() || disabled}
// // // //           className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
// // // //           aria-label="Send message"
// // // //         >
// // // //           <Send className="h-5 w-5" />
// // // //         </Button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";

// // // import React, { useState, useRef, useCallback } from "react";
// // // import { Upload, Send, Smile } from "lucide-react";
// // // import { Input } from "@/components/ui/input";
// // // import { Button } from "@/components/ui/button";
// // // import type { MessageInputProps } from "./types";
// // // import { useChatStore } from "@/store/chat-store";

// // // export default function MessageInput({ onSend, disabled }: MessageInputProps) {
// // //   const [message, setMessage] = useState("");
// // //   // State to hold image preview URL
// // //   const [previewUrl, setPreviewUrl] = useState("");
// // //   const inputRef = useRef<HTMLInputElement>(null);
// // //   const fileInputRef = useRef<HTMLInputElement>(null);
// // //   const { sendFileMessage, selectedConversation } = useChatStore();

// // //   const handleSend = useCallback(() => {
// // //     if (!message.trim() || disabled) return;
// // //     onSend(message);
// // //     setMessage("");
// // //     setTimeout(() => {
// // //       inputRef.current?.focus();
// // //     }, 0);
// // //   }, [message, disabled, onSend]);

// // //   const handleKeyDown = useCallback(
// // //     (e: React.KeyboardEvent<HTMLInputElement>) => {
// // //       if (e.key === "Enter" && !e.shiftKey) {
// // //         e.preventDefault();
// // //         handleSend();
// // //       }
// // //     },
// // //     [handleSend]
// // //   );

// // //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (e.target.files && e.target.files[0] && selectedConversation) {
// // //       const file = e.target.files[0];

// // //       // If file is an image, generate a preview
// // //       if (file.type.startsWith("image/")) {
// // //         const reader = new FileReader();
// // //         reader.onloadend = () => {
// // //           setPreviewUrl(reader.result as string);
// // //         };
// // //         reader.readAsDataURL(file);
// // //       }

// // //       // Send the file message (this could be adjusted if you want to wait for user confirmation)
// // //       await sendFileMessage(file, selectedConversation.id);

// // //       // Clear the file input so the same file can be re-uploaded if needed
// // //       e.target.value = "";
// // //     }
// // //   };

// // //   return (
// // //     <div className="border-t p-4">
// // //       <div className="flex flex-col">
// // //         {/* Image preview displayed at the top of the input field */}
// // //         {previewUrl && (
// // //           <div className="mb-2">
// // //             <img
// // //               src={previewUrl}
// // //               alt="Image preview"
// // //               className="max-h-40 rounded"
// // //             />
// // //           </div>
// // //         )}
// // //         <div className="flex items-center">
// // //           <Button
// // //             variant="ghost"
// // //             size="icon"
// // //             className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
// // //             aria-label="Add attachment"
// // //             disabled={disabled}
// // //             onClick={() => fileInputRef.current?.click()}
// // //           >
// // //             <Upload className="h-5 w-5" />
// // //           </Button>
// // //           {/* Hidden file input */}
// // //           <input
// // //             type="file"
// // //             ref={fileInputRef}
// // //             onChange={handleFileChange}
// // //             style={{ display: "none" }}
// // //           />
// // //           <div className="relative mx-2 flex-1">
// // //             <Input
// // //               ref={inputRef}
// // //               value={message}
// // //               onChange={(e) => setMessage(e.target.value)}
// // //               onKeyDown={handleKeyDown}
// // //               placeholder={
// // //                 disabled
// // //                   ? "Select a conversation to start chatting"
// // //                   : "Type your message"
// // //               }
// // //               className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
// // //               disabled={disabled}
// // //               aria-label="Message input"
// // //             />
// // //             <Button
// // //               variant="ghost"
// // //               size="icon"
// // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// // //               aria-label="Add emoji"
// // //               disabled={disabled}
// // //             >
// // //               <Smile className="h-5 w-5" />
// // //             </Button>
// // //           </div>
// // //           <Button
// // //             onClick={handleSend}
// // //             disabled={!message.trim() || disabled}
// // //             className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
// // //             aria-label="Send message"
// // //           >
// // //             <Send className="h-5 w-5" />
// // //           </Button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import React, { useState, useRef, useCallback } from "react";
// // import { Upload, Send, Smile } from "lucide-react";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import type { MessageInputProps } from "./types";
// // import { useChatStore } from "@/store/chat-store";

// // export default function MessageInput({ onSend, disabled }: MessageInputProps) {
// //   const [message, setMessage] = useState("");
// //   // State to hold image preview URL and the pending file (if any)
// //   const [previewUrl, setPreviewUrl] = useState("");
// //   const [pendingFile, setPendingFile] = useState<File | null>(null);
// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);
// //   const { sendFileMessage, selectedConversation } = useChatStore();

// //   const handleSend = useCallback(async () => {
// //     // Allow sending if either text exists or there's a file pending
// //     if ((!message.trim() && !pendingFile) || disabled) return;

// //     // Send the file if one is pending
// //     if (pendingFile && selectedConversation) {
// //       await sendFileMessage(pendingFile, selectedConversation.id);
// //       // Clear the file states
// //       setPendingFile(null);
// //       setPreviewUrl("");
// //     }

// //     // Send the text message if present
// //     if (message.trim()) {
// //       onSend(message);
// //       setMessage("");
// //     }

// //     // Refocus the text input
// //     setTimeout(() => {
// //       inputRef.current?.focus();
// //     }, 0);
// //   }, [
// //     message,
// //     pendingFile,
// //     disabled,
// //     onSend,
// //     sendFileMessage,
// //     selectedConversation,
// //   ]);

// //   const handleKeyDown = useCallback(
// //     (e: React.KeyboardEvent<HTMLInputElement>) => {
// //       if (e.key === "Enter" && !e.shiftKey) {
// //         e.preventDefault();
// //         handleSend();
// //       }
// //     },
// //     [handleSend]
// //   );

// //   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0] && selectedConversation) {
// //       const file = e.target.files[0];

// //       // If file is an image, generate a preview
// //       if (file.type.startsWith("image/")) {
// //         const reader = new FileReader();
// //         reader.onloadend = () => {
// //           setPreviewUrl(reader.result as string);
// //         };
// //         reader.readAsDataURL(file);
// //       }

// //       // Store the file so it can be sent on button click
// //       setPendingFile(file);

// //       // Clear the file input (allows the same file to be reselected)
// //       e.target.value = "";
// //     }
// //   };

// //   return (
// //     <div className="border-t p-4">
// //       <div className="flex flex-col">
// //         {/* Show image preview at the top if available */}
// //         {previewUrl && (
// //           <div className="mb-2">
// //             <img
// //               src={previewUrl}
// //               alt="Image preview"
// //               className="max-h-40 rounded"
// //             />
// //           </div>
// //         )}
// //         <div className="flex items-center">
// //           <Button
// //             variant="ghost"
// //             size="icon"
// //             className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
// //             aria-label="Add attachment"
// //             disabled={disabled}
// //             onClick={() => fileInputRef.current?.click()}
// //           >
// //             <Upload className="h-5 w-5" />
// //           </Button>
// //           {/* Hidden file input */}
// //           <input
// //             type="file"
// //             ref={fileInputRef}
// //             onChange={handleFileChange}
// //             style={{ display: "none" }}
// //           />
// //           <div className="relative mx-2 flex-1">
// //             <Input
// //               ref={inputRef}
// //               value={message}
// //               onChange={(e) => setMessage(e.target.value)}
// //               onKeyDown={handleKeyDown}
// //               placeholder={
// //                 disabled
// //                   ? "Select a conversation to start chatting"
// //                   : "Type your message"
// //               }
// //               className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
// //               disabled={disabled}
// //               aria-label="Message input"
// //             />
// //             <Button
// //               variant="ghost"
// //               size="icon"
// //               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //               aria-label="Add emoji"
// //               disabled={disabled}
// //             >
// //               <Smile className="h-5 w-5" />
// //             </Button>
// //           </div>
// //           <Button
// //             onClick={handleSend}
// //             disabled={(!message.trim() && !pendingFile) || disabled}
// //             className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
// //             aria-label="Send message"
// //           >
// //             <Send className="h-5 w-5" />
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import React, { useState, useRef, useCallback } from "react";
// import { Upload, Send, Smile } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import type { MessageInputProps } from "./types";
// import { useChatStore } from "@/store/chat-store";

// export default function MessageInput({ onSend, disabled }: MessageInputProps) {
//   const [message, setMessage] = useState("");
//   // State to hold image preview URL and the pending file (if any)
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [pendingFile, setPendingFile] = useState<File | null>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { sendFileMessage, selectedConversation } = useChatStore();

//   const handleSend = useCallback(async () => {
//     // Allow sending if either text exists or there's a pending file
//     if ((!message.trim() && !pendingFile) || disabled) return;

//     // If a file is pending, upload it first
//     if (pendingFile && selectedConversation) {
//       await sendFileMessage(pendingFile, selectedConversation.id);
//       setPendingFile(null);
//       setPreviewUrl("");
//     }

//     // If there is text, send it as a text message
//     if (message.trim()) {
//       onSend(message);
//       setMessage("");
//     }

//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 0);
//   }, [
//     message,
//     pendingFile,
//     disabled,
//     onSend,
//     sendFileMessage,
//     selectedConversation,
//   ]);

//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         handleSend();
//       }
//     },
//     [handleSend]
//   );

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0] && selectedConversation) {
//       const file = e.target.files[0];

//       // If file is an image, generate a preview
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setPreviewUrl(reader.result as string);
//         };
//         reader.readAsDataURL(file);
//       }

//       // Store the file for later sending when the button is clicked
//       setPendingFile(file);
//       e.target.value = "";
//     }
//   };

//   return (
//     <div className="border-t p-4">
//       <div className="flex flex-col">
//         {/* Show image preview at the top if available */}
//         {previewUrl && (
//           <div className="mb-2">
//             <img
//               src={previewUrl}
//               alt="Image preview"
//               className="max-h-40 rounded"
//             />
//           </div>
//         )}
//         <div className="flex items-center">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
//             aria-label="Add attachment"
//             disabled={disabled}
//             onClick={() => fileInputRef.current?.click()}
//           >
//             <Upload className="h-5 w-5" />
//           </Button>
//           {/* Hidden file input */}
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//           <div className="relative mx-2 flex-1">
//             <Input
//               ref={inputRef}
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder={
//                 disabled
//                   ? "Select a conversation to start chatting"
//                   : "Type your message"
//               }
//               className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
//               disabled={disabled}
//               aria-label="Message input"
//             />
//             <Button
//               variant="ghost"
//               size="icon"
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               aria-label="Add emoji"
//               disabled={disabled}
//             >
//               <Smile className="h-5 w-5" />
//             </Button>
//           </div>
//           <Button
//             onClick={handleSend}
//             disabled={(!message.trim() && !pendingFile) || disabled}
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
//             aria-label="Send message"
//           >
//             <Send className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useCallback } from "react";
import { Upload, Send, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { MessageInputProps } from "./types";
import { useChatStore } from "@/store/chat-store";

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  // State to hold image preview URL and the pending file (if any)
  const [previewUrl, setPreviewUrl] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { sendFileMessage, selectedConversation } = useChatStore();

  const handleSend = useCallback(async () => {
    // Allow sending if either text exists or there's a pending file
    if ((!message.trim() && !pendingFile) || disabled) return;

    if (pendingFile && selectedConversation) {
      // Pass the text content as the caption along with the file
      await sendFileMessage(
        pendingFile,
        selectedConversation.id,
        message.trim()
      );
      setPendingFile(null);
      setPreviewUrl("");
      setMessage("");
    } else if (message.trim()) {
      onSend(message);
      setMessage("");
    }

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [
    message,
    pendingFile,
    disabled,
    onSend,
    sendFileMessage,
    selectedConversation,
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedConversation) {
      const file = e.target.files[0];

      // If file is an image, generate a preview
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      // Store the file for later sending when the button is clicked
      setPendingFile(file);
      e.target.value = "";
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex flex-col">
        {/* Show image preview at the top if available */}
        {previewUrl && (
          <div className="mb-2">
            <img
              src={previewUrl}
              alt="Image preview"
              className="max-h-40 rounded"
            />
          </div>
        )}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="Add attachment"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-5 w-5" />
          </Button>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="relative mx-2 flex-1">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                disabled
                  ? "Select a conversation to start chatting"
                  : "Type your message"
              }
              className="h-10 w-full rounded-full border-gray-200 pl-4 pr-10 text-sm focus-visible:ring-0"
              disabled={disabled}
              aria-label="Message input"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Add emoji"
              disabled={disabled}
            >
              <Smile className="h-5 w-5" />
            </Button>
          </div>
          <Button
            onClick={handleSend}
            disabled={(!message.trim() && !pendingFile) || disabled}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff6a00] text-white disabled:opacity-50"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
