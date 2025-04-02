import { supabaseBrowserClient } from "@/utils/supabase/client";
import { create } from "zustand";
import { MessageStatus, type Conversation, type Message, type User } from "@/types";

// Update the ChatState interface to include latestMessages
interface ChatState {
    conversations: Partial<Conversation[]>;
    selectedConversation: Conversation | null;
    messages: Message[];
    currentUser: User | null;
    isLoadingConversations: boolean;
    isLoadingMessages: boolean;
    isLoadingChannels: boolean;
    isLoadingDirectMessages: boolean;
    latestMessages: Record<string, Message>; // Add this to track latest message per conversation
    unreadCounts: Record<string, number>; // Add this to track unread counts

    // Actions
    fetchConversations: () => Promise<void>;
    selectConversation: (conversationId: string) => Promise<void>;
    fetchMessages: (conversationId: string) => Promise<void>;
    sendMessage: (content: string, conversationId: string) => Promise<void>;
    sendFileMessage: (file: File, conversationId: string, content: string) => Promise<void>;

    markMessageAsRead: (messageId: string) => Promise<void>;
    fetchCurrentUser: () => Promise<void>;
    setupMessageListener: (conversationId: string) => () => void;
    setupChatListener: (conversation: Conversation | null) => () => void;
    setupConversationsListener: () => Promise<() => void>; // Add this to listen for all conversations
    updateLatestMessage: (conversationId: string, message: Message) => void; // Add this to update latest message
    fetchUnreadCounts: () => Promise<void>; // Add this to fetch unread counts
}

// Update the initial state and implementation
export const useChatStore = create<ChatState>((set, get) => ({
    conversations: [],
    selectedConversation: null,
    messages: [],
    currentUser: null,
    isLoadingConversations: false,
    isLoadingMessages: false,
    isLoadingChannels: false,
    isLoadingDirectMessages: false,
    latestMessages: {},
    unreadCounts: {},

    sendFileMessage: async (file: File, conversationId: string, content?: string) => {
        try {
            const {
                data: { user },
            } = await supabaseBrowserClient.auth.getUser();
            if (!user) return;

            // Determine file extension (default to "dat" if not found)
            const fileExt = file.name.split(".").pop() || "dat";
            const filePath = `uploads/${user.id}/${Date.now()}.${fileExt}`;

            // Upload file to Supabase Storage bucket "message-files"
            const { data: uploadData, error: uploadError } = await supabaseBrowserClient.storage
                .from("oppano")
                .upload(filePath, file, { cacheControl: "3600", upsert: false });

            if (uploadError) {
                console.error("Error uploading file:", uploadError);
                return;
            }

            // Get the public URL for the uploaded file
            const { data: { publicUrl } } = await supabaseBrowserClient.storage
                .from("oppano")
                .getPublicUrl(filePath);

            // if (urlError || !publicUrl) {
            //     console.error("Error getting public URL:", urlError);
            //     return;
            // }

            // Insert a new Message record with messageType "FILE" and optional caption in content
            const { data: messageData, error: messageError } = await supabaseBrowserClient
                .from("Message")
                .insert({
                    conversationId,
                    senderId: user.id,
                    // If a caption is provided, include it; otherwise, you may choose to store the URL as fallback
                    content: content || "",
                    messageType: "FILE",
                    status: "SENT",
                })
                .select("*, sender:User(*)")
                .single();

            if (messageError) {
                console.error("Error sending file message:", messageError);
                return;
            }

            // Insert a record into MessageAttachment with file details
            const { error: attachmentError } = await supabaseBrowserClient
                .from("MessageAttachment")
                .insert({
                    messageId: messageData.id,
                    fileUrl: publicUrl,
                    fileType: file.type,
                    fileSize: file.size,
                    metadata: {
                        name: file.name,
                    },
                });

            if (attachmentError) {
                console.error("Error inserting message attachment:", attachmentError);
                // You can decide whether to continue even if the attachment insert fails
            }

            // Update local state with the new file message
            set((state) => ({
                messages: [...state.messages, messageData],
                latestMessages: {
                    ...state.latestMessages,
                    [conversationId]: messageData,
                },
            }));
        } catch (error) {
            console.error("Error in sendFileMessage:", error);
        }
    },

    // fetchConversations: async () => {
    //     set({ isLoadingConversations: true });
    //     set({ isLoadingChannels: true });
    //     set({ isLoadingDirectMessages: true });

    //     try {
    //         // First, get the current authenticated user
    //         const {
    //             data: { user },
    //             error: userError,
    //         } = await supabaseBrowserClient.auth.getUser();

    //         if (userError || !user) {
    //             set({ isLoadingConversations: false });
    //             set({ isLoadingChannels: false });
    //             set({ isLoadingDirectMessages: false });
    //             return;
    //         }

    //         // A single query that:
    //         //  1) Finds "ConversationParticipant" rows for this user
    //         //  2) Pulls in the "Conversation" details
    //         //  3) Within Conversation, fetches:
    //         //     - the *latest* Message (sorted by createdAt desc, limited to 1)
    //         //     - the "sender:User" for each Message
    //         //     - all conversationParticipants, and for each participant, the "user:User"
    //         const { data: participants, error: participantsError } =
    //             await supabaseBrowserClient
    //                 .from("ConversationParticipant")
    //                 .select(
    //                     `
    //           id,
    //           conversationId,
    //           userId,
    //           role,
    //           isActive,

    //           conversation:Conversation (
    //             id,
    //             organizationId,
    //             type,
    //             title,
    //             description,
    //             isArchived,
    //             createdAt,
    //             updatedAt,

    //             messages:Message (
    //               id,
    //               conversationId,
    //               senderId,
    //               content,
    //               messageType,
    //               status,
    //               isDeleted,
    //               createdAt,
    //               sender:User(*),
    //               attachments:MessageAttachment (*)
    //             ),

    //             conversationParticipants:ConversationParticipant (
    //               id,
    //               userId,
    //               role,
    //               isActive,
    //               joinedAt,
    //               user:User(*)
    //             )
    //           )
    //         `
    //                 )
    //                 .eq("userId", user.id)
    //                 .eq("isActive", true)
    //                 // Sort only the nested messages by createdAt desc
    //                 .order("createdAt", {
    //                     ascending: false,
    //                     foreignTable: "conversation.messages",
    //                 })
    //                 // Limit the nested messages to just the top 1
    //                 .limit(1, { foreignTable: "conversation.messages" });


    //         if (participantsError) throw participantsError;

    //         // participants will be an array of ConversationParticipant rows;
    //         // each contains a "conversation" field with the actual conversation details
    //         if (participants) {
    //             // Extract the conversations from each participant object
    //             console.log("Conversation : ", participants)
    //             const conversations = participants.map((p) => p.conversation);
    //             // Filter participants to only those with a conversation and extract the conversation
    //             // const conversations = participants
    //             //     .filter((p) => p.conversation)
    //             //     .map((p) => p.conversation);

    //             // const conversations = participants.flatMap((p) => p.conversation) as Conversation[];
    //             // const conversations = participants.flatMap((p) => {
    //             //     // Check if conversation is an array; if so, process each one
    //             //     if (Array.isArray(p.conversation)) {
    //             //         return p.conversation.map((convo: any) => {
    //             //             // Map over messages to fix the sender field
    //             //             const fixedMessages = convo.messages?.map((m: any) => ({
    //             //                 ...m,
    //             //                 // If m.sender is an array, take the first element; otherwise keep it as is
    //             //                 sender: Array.isArray(m.sender) ? m.sender[0] : m.sender,
    //             //             })) || [];

    //             //             return {
    //             //                 ...convo,
    //             //                 messages: fixedMessages,
    //             //             };
    //             //         });
    //             //     }
    //             //     return [];
    //             // }) as Conversation[];

    //             set({ conversations });

    //             // set({ conversations });


    //             // console.log("participant: ", conversations)
    //             // set({ conversations });

    //             console.log("Participants : ", conversations)
    //             // set({ conversations });

    //             // Build a dictionary of latest messages per conversation
    //             // const latestMessages: Record<string, Message> = {};
    //             // for (const p of participants) {
    //             //     console.log("P : ", p)
    //             //     const convo = p.conversation;
    //             //     console.log("Convo : ", convo)
    //             //     // convo.messages is an array with at most 1 element (the latest)
    //             //     const [latest] = convo?.messages || [];
    //             //     if (latest) {
    //             //         latestMessages[convo?.id] = latest;
    //             //     }
    //             // }
    //             // set({ latestMessages });

    //             // Build a dictionary of latest messages per conversation
    //             const latestMessages: Record<string, Message> = {};
    //             for (const p of participants) {
    //                 console.log("P: ", p);
    //                 // Ensure p.conversation is a single object rather than an array
    //                 const convo = Array.isArray(p.conversation) ? p.conversation[0] : p.conversation;
    //                 console.log("Convo: ", convo);
    //                 // Ensure that convo exists and has a messages property
    //                 if (convo && convo.messages) {
    //                     // convo.messages is an array with at most 1 element (the latest)
    //                     const [latest] = convo.messages || [];
    //                     if (latest) {
    //                         // Fix the sender field: if sender is an array, take the first element
    //                         const fixedLatest: Message = {
    //                             ...latest,
    //                             sender: Array.isArray(latest.sender) ? latest.sender[0] : latest.sender,
    //                         };
    //                         latestMessages[convo.id] = fixedLatest;
    //                     }
    //                 }
    //             }
    //             set({ latestMessages });


    //             // Optionally, fetch unread counts if you want them in the same flow:
    //             await get().fetchUnreadCounts();
    //         }
    //     } catch (error) {
    //         console.error("Error fetching conversations:", error);
    //     } finally {
    //         set({ isLoadingConversations: false });
    //         set({ isLoadingChannels: false });
    //         set({ isLoadingDirectMessages: false });
    //     }
    // },

    // fetchConversations: async () => {
    //     set({
    //         isLoadingConversations: true,
    //         isLoadingChannels: true,
    //         isLoadingDirectMessages: true
    //     });

    //     try {
    //         // First, get the current authenticated user
    //         const {
    //             data: { user },
    //             error: userError,
    //         } = await supabaseBrowserClient.auth.getUser();

    //         if (userError || !user) {
    //             set({
    //                 isLoadingConversations: false,
    //                 isLoadingChannels: false,
    //                 isLoadingDirectMessages: false
    //             });
    //             return;
    //         }

    //         // A single query that:
    //         //  1) Finds "ConversationParticipant" rows for this user
    //         //  2) Pulls in the "Conversation" details
    //         //  3) Within Conversation, fetches:
    //         //     - the *latest* Message (as "latest_message" rather than an array)
    //         //     - the "sender:User" for that Message
    //         //     - all conversationParticipants, and for each participant, the "user:User"
    //         const { data: participants, error: participantsError } =
    //             await supabaseBrowserClient
    //                 .from("ConversationParticipant")
    //                 .select(`
    //             id,
    //             conversationId,
    //             userId,
    //             role,
    //             isActive,
    //             conversation:Conversation (
    //               id,
    //               organizationId,
    //               type,
    //               title,
    //               description,
    //               isArchived,
    //               createdAt,
    //               updatedAt,
    //               latest_message:Message!Conversation_lastMessageId_fkey (
    //                 id,
    //                 conversationId,
    //                 senderId,
    //                 content,
    //                 messageType,
    //                 status,
    //                 isDeleted,
    //                 createdAt,
    //                 sender:User(*),
    //                 attachments:MessageAttachment(*)
    //             ),
    //               participants:ConversationParticipant (
    //                 id,
    //                 userId,
    //                 role,
    //                 isActive,
    //                 joinedAt,
    //                 user:User(*)
    //               )
    //             )
    //           `)
    //                 .eq("userId", user.id)
    //                 .eq("isActive", true)
    //         // Sort only the nested latest_message by createdAt desc
    //         // .order("createdAt", {
    //         //     ascending: false,
    //         //     foreignTable: "conversation.latest_message",
    //         // })
    //         // Limit the nested latest_message to just the top 1
    //         // .limit(1, { foreignTable: "conversation.latest_message" });

    //         console.log("Participants : ", participants)

    //         if (participantsError) throw participantsError;

    //         if (participants) {
    //             // Extract conversations from each participant object
    //             const conversations = participants
    //                 // .filter(p => p.conversation)
    //                 .map(p => p.conversation);

    //             console.log("Conversation : ", conversations)

    //             set({ conversations });

    //             // Build a dictionary for quick lookup of the latest message per conversation
    //             const latestMessages = {};
    //             for (const p of participants) {
    //                 const convo = Array.isArray(p.conversation) ? p.conversation[0] : p.conversation;
    //                 if (convo && convo.latest_message) {
    //                     latestMessages[convo.id] = convo.latest_message;
    //                 }
    //             }
    //             set({ latestMessages });

    //             // Optionally, fetch unread counts if needed
    //             await get().fetchUnreadCounts();
    //         }
    //     } catch (error) {
    //         console.error("Error fetching conversations:", error);
    //     } finally {
    //         set({
    //             isLoadingConversations: false,
    //             isLoadingChannels: false,
    //             isLoadingDirectMessages: false
    //         });
    //     }
    // },

    fetchConversations: async () => {
        set({
            isLoadingConversations: true,
            isLoadingChannels: true,
            isLoadingDirectMessages: true,
        });

        try {
            // Get the current authenticated user
            const {
                data: { user },
                error: userError,
            } = await supabaseBrowserClient.auth.getUser();

            if (userError || !user) {
                set({
                    isLoadingConversations: false,
                    isLoadingChannels: false,
                    isLoadingDirectMessages: false,
                });
                return;
            }

            // Query for ConversationParticipant with nested Conversation data
            const { data: participants, error: participantsError } =
                await supabaseBrowserClient
                    .from("ConversationParticipant")
                    .select(`
                id,
                conversationId,
                userId,
                role,
                isActive,
                conversation:Conversation (
                  id,
                  organizationId,
                  type,
                  title,
                  description,
                  isArchived,
                  createdAt,
                  updatedAt,
                  latest_message:Message!Conversation_lastMessageId_fkey (
                    id,
                    conversationId,
                    senderId,
                    content,
                    messageType,
                    status,
                    isDeleted,
                    createdAt,
                    sender:User(*),
                    attachments:MessageAttachment(*)
                  ),
                  participants:ConversationParticipant (
                    id,
                    userId,
                    role,
                    isActive,
                    joinedAt,
                    user:User(*)
                  )
                )
              `)
                    .eq("userId", user.id)
                    .eq("isActive", true);

            if (participantsError) throw participantsError;
            console.log("Participants:", participants);

            // Transform participants data to a flat array of Conversation objects
            const flattenedConversations: Conversation[] = [];
            participants?.forEach((p: any) => {
                if (p.conversation) {
                    // If conversation is an array, iterate; otherwise, wrap it in an array
                    const convos = Array.isArray(p.conversation)
                        ? p.conversation
                        : [p.conversation];
                    convos.forEach((c: any) => {
                        // Build the conversation object according to your type
                        const conversation: Conversation = {
                            id: c.id,
                            organizationId: c.organizationId,
                            type: c.type,
                            title: c.title,
                            description: c.description,
                            isArchived: c.isArchived,
                            createdAt: c.createdAt,
                            updatedAt: c.updatedAt,
                            // Map latest_message to latestMessage and pick the first if it’s an array
                            latest_message: c.latest_message || null,
                            // Ensure participants field is provided
                            participants: c.participants || [],
                        };
                        flattenedConversations.push(conversation);
                    });
                }
            });

            console.log("Flattened Conversations:", flattenedConversations);
            set({ conversations: flattenedConversations });

            // Build a dictionary for quick lookup of the latest message per conversation
            const latestMessages: Record<string, Message> = {};
            flattenedConversations.forEach((convo) => {
                if (convo.latest_message) {
                    latestMessages[convo.id!] = convo.latest_message;
                }
            });
            set({ latestMessages });

            // Optionally, fetch unread counts
            await get().fetchUnreadCounts();
        } catch (error) {
            console.error("Error fetching conversations:", error);
        } finally {
            set({
                isLoadingConversations: false,
                isLoadingChannels: false,
                isLoadingDirectMessages: false,
            });
        }
    },


    selectConversation: async (conversationId: string) => {
        const { conversations } = get();
        const conversation = conversations.find((c) => c.id === conversationId);

        if (conversation) {
            set({ selectedConversation: conversation });
            await get().fetchMessages(conversationId);

            // Mark all messages as read when selecting a conversation
            const {
                data: { user },
            } = await supabaseBrowserClient.auth.getUser();
            if (user) {
                const { data: messages } = await supabaseBrowserClient
                    .from("Message")
                    .select("id")
                    .eq("conversationId", conversationId)
                    .neq("senderId", user.id)
                    .neq("status", "READ");

                if (messages && messages.length > 0) {
                    for (const message of messages) {
                        await get().markMessageAsRead(message.id);
                    }

                    // Update unread counts
                    await get().fetchUnreadCounts();
                }
            }
        }
    },

    fetchMessages: async (conversationId: string) => {
        set({ isLoadingMessages: true });

        try {
            const { data } = await supabaseBrowserClient
                .from("Message")
                .select("*, sender:User(*), attachments:MessageAttachment(*)")
                .eq("conversationId", conversationId)
                .eq("isDeleted", false)
                .order("createdAt", { ascending: true });

            if (data) {
                set({ messages: data });
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            set({ isLoadingMessages: false });
        }
    },

    sendMessage: async (content: string, conversationId: string) => {
        try {
            const {
                data: { user },
            } = await supabaseBrowserClient.auth.getUser();

            if (!user) return;

            // First, add the message to the local state optimistically
            const optimisticMessage = {
                id: `temp-${Date.now()}`,
                conversationId,
                senderId: user.id,
                content,
                messageType: "TEXT",
                status: "SENT",
                createdAt: new Date().toISOString(),
                isDeleted: false,
                sender: get().currentUser,
            };

            // Update messages state
            set((state) => ({
                messages: [...state.messages, optimisticMessage as any],
            }));

            // Send the message to the server
            const { data, error } = await supabaseBrowserClient
                .from("Message")
                .insert({
                    conversationId,
                    senderId: user.id,
                    content,
                    messageType: "TEXT",
                    status: "SENT",
                })
                .select("*, sender:User(*)")
                .single();

            if (error) {
                console.error("Error sending message:", error);
                // Remove the optimistic message if there was an error
                set((state) => ({
                    messages: state.messages.filter((m) => m.id !== optimisticMessage.id),
                }));
                return;
            }

            const { error: updateError } = await supabaseBrowserClient
                .from("Conversation")
                .update({ lastMessageId: data.id })
                .eq("id", conversationId);

            console.log("Update Error : ", updateError)

            if (data) {
                // Replace the optimistic message with the real one
                set((state) => ({
                    messages: state.messages
                        .filter((m) => m.id !== optimisticMessage.id)
                        .concat(data),
                    latestMessages: {
                        ...state.latestMessages,
                        [conversationId]: data,
                    },
                }));
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    },

    markMessageAsRead: async (messageId: string) => {
        try {
            await supabaseBrowserClient
                .from("Message")
                .update({ status: "READ" })
                .eq("id", messageId);

            // Update the message in the local state
            // set((state) => ({
            //     messages: state.messages.map((m) =>
            //         m.id === messageId ? { ...m, status: "READ" } : m
            //     ),
            // }));
            set((state) => ({
                messages: state.messages.map((m) =>
                    m.id === messageId
                        ? { ...m, status: MessageStatus.READ } as Message
                        : m
                ),
            }));

        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    },

    fetchCurrentUser: async () => {
        try {
            const {
                data: { user },
            } = await supabaseBrowserClient.auth.getUser();

            if (!user) return;

            const { data } = await supabaseBrowserClient
                .from("User")
                .select("*")
                .eq("id", user.id)
                .single();

            if (data) {
                set({ currentUser: data });
            }
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
    },

    setupMessageListener: (conversationId: string) => {
        const subscription = supabaseBrowserClient
            .channel(`messages:${conversationId}`)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "Message",
                    filter: `conversationId=eq.${conversationId}`,
                },
                async (payload) => {
                    const newMessage = payload.new as Message;

                    // Fetch the sender information
                    const { data: sender } = await supabaseBrowserClient
                        .from("User")
                        .select("*")
                        .eq("id", newMessage.senderId)
                        .single();

                    const messageWithSender = {
                        ...newMessage,
                        sender,
                    };

                    // Only add the message if it's not from the current user or not already in the messages array
                    const { messages, currentUser } = get();
                    const messageExists = messages.some((m) => m.id === newMessage.id);

                    if (!messageExists) {
                        set((state) => ({
                            messages: [...state.messages, messageWithSender as any],
                        }));
                    }

                    // Update latest message for this conversation
                    get().updateLatestMessage(conversationId, messageWithSender as any);

                    // If the message is not from the current user, mark it as read if the conversation is selected
                    if (newMessage.senderId !== currentUser?.id) {
                        const { selectedConversation } = get();
                        if (selectedConversation?.id === conversationId) {
                            get().markMessageAsRead(newMessage.id);
                        } else {
                            // Update unread counts
                            await get().fetchUnreadCounts();
                        }
                    }
                }
            )
            .subscribe();

        // Return a cleanup function
        return () => {
            subscription.unsubscribe();
        };
    },

    // setupChatListener: (conversation: Conversation | null) => {
    //     // If conversation is falsy, return a no-op cleanup function.
    //     if (!conversation) {
    //         return () => { };
    //     }
    //     console.log("Chat Listener")
    //     const { id, type } = conversation;
    //     // Derive a channel name based on conversation type
    //     const channelName =
    //         type === "PRIVATE" ? `private:messages:${id}` : `channel:messages:${id}`;

    //     // Subscribe to realtime INSERT events for this conversation
    //     const subscription = supabaseBrowserClient
    //         .channel(channelName)
    //         .on(
    //             "postgres_changes",
    //             {
    //                 event: "INSERT",
    //                 schema: "public",
    //                 table: "Message",
    //                 filter: `conversationId=eq.${id}`,
    //             },
    //             async (payload) => {
    //                 console.log("Payload : ", payload)
    //                 const newMessage = payload.new as Message;

    //                 // Optionally fetch the sender details if needed
    //                 const { data: sender } = await supabaseBrowserClient
    //                     .from("User")
    //                     .select("*")
    //                     .eq("id", newMessage.senderId)
    //                     .single();

    //                 const messageWithSender = { ...newMessage, sender };

    //                 // Update local messages state
    //                 set((state) => ({
    //                     messages: [...state.messages, messageWithSender],
    //                 }));

    //                 // Update the latest message for this conversation
    //                 get().updateLatestMessage(id, messageWithSender);

    //                 // For private chats, mark the message as read if the conversation is active
    //                 if (type === "PRIVATE") {
    //                     const { selectedConversation, currentUser } = get();
    //                     if (
    //                         selectedConversation?.id === id &&
    //                         newMessage.senderId !== currentUser?.id
    //                     ) {
    //                         get().markMessageAsRead(newMessage.id);
    //                     }
    //                 } else if (type === "CHANNEL") {
    //                     // For channels, update unread counts (or handle other channel-specific logic)
    //                     await get().fetchUnreadCounts();
    //                 }
    //             }
    //         )
    //         .subscribe();

    //     // Return a cleanup function to unsubscribe when needed
    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // },

    setupChatListener: (conversation: Conversation | null) => {
        // If conversation is falsy, return a no-op cleanup function.
        if (!conversation) {
            return () => { };
        }
        console.log("Chat Listener");
        const { id, type } = conversation;
        // Derive a channel name based on conversation type
        const channelName =
            type === "PRIVATE" ? `private:messages:${id}` : `channel:messages:${id}`;

        // Subscribe to realtime INSERT events for this conversation
        const subscription = supabaseBrowserClient
            .channel(channelName)
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "Message",
                    filter: `conversationId=eq.${id}`,
                },
                async (payload) => {
                    console.log("Payload: ", payload);
                    const newMessage = payload.new as Message;

                    // Optionally fetch the sender details if needed
                    const { data: sender } = await supabaseBrowserClient
                        .from("User")
                        .select("*")
                        .eq("id", newMessage.senderId)
                        .single();

                    const messageWithSender = { ...newMessage, sender };

                    // Prevent adding the message if it already exists in state.
                    // This helps avoid duplicates when the sender's message is received back from the listener.
                    set((state) => {
                        const messageExists = state.messages.some(
                            (m) => m.id === messageWithSender.id
                        );
                        if (messageExists) {
                            return state;
                        }
                        return {
                            messages: [...state.messages, messageWithSender],
                        };
                    });

                    // Update the latest message for this conversation
                    get().updateLatestMessage(id, messageWithSender);

                    // For private chats, mark the message as read if the conversation is active
                    if (type === "PRIVATE") {
                        const { selectedConversation, currentUser } = get();
                        if (
                            selectedConversation?.id === id &&
                            newMessage.senderId !== currentUser?.id
                        ) {
                            get().markMessageAsRead(newMessage.id);
                        }
                    } else if (type === "CHANNEL") {
                        // For channels, update unread counts (or handle other channel-specific logic)
                        await get().fetchUnreadCounts();
                    }
                }
            )
            .subscribe();

        // Return a cleanup function to unsubscribe when needed
        return () => {
            subscription.unsubscribe();
        };
    },

    setupConversationsListener: async () => {
        try {
            // getUser() is async, so we can await it
            const { data, error } = await supabaseBrowserClient.auth.getUser();
            if (error || !data?.user) {
                // Return a no-op if no user
                return () => { };
            }

            const subscription = supabaseBrowserClient
                .channel("public:Message")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "Message" },
                    (payload) => {
                        console.log("Payload : ", payload)
                    }
                )
                .subscribe();

            // Return cleanup function
            return () => {
                subscription.unsubscribe();
            };
        } catch (err) {
            console.error(err);
            // Return a no-op if there's an error
            return () => { };
        }
    },

    updateLatestMessage: (conversationId: string, message: Message) => {
        set((state) => ({
            latestMessages: {
                ...state.latestMessages,
                [conversationId]: message,
            },
        }));
    },

    fetchUnreadCounts: async () => {
        try {
            const {
                data: { user },
            } = await supabaseBrowserClient.auth.getUser();

            if (!user) return;

            const { conversations } = get();
            const unreadCounts: Record<string, number> = {};

            for (const conversation of conversations) {
                const { count } = await supabaseBrowserClient
                    .from("Message")
                    .select("*", { count: "exact", head: true })
                    .eq("conversationId", conversation.id)
                    .neq("senderId", user.id)
                    .neq("status", "READ");

                unreadCounts[conversation.id] = count || 0;
            }

            set({ unreadCounts });
        } catch (error) {
            console.error("Error fetching unread counts:", error);
        }
    },
}));
