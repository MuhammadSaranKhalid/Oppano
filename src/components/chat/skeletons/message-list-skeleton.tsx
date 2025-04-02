import { MessageGroupSkeleton } from "./message-group-skeleton";

export function MessageListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-6">
        <MessageGroupSkeleton isUser={false} messageCount={2} />
        <MessageGroupSkeleton isUser={true} messageCount={1} />
        <MessageGroupSkeleton isUser={false} messageCount={3} />
        <MessageGroupSkeleton isUser={true} messageCount={2} />
      </div>
    </div>
  );
}
