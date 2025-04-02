import { MessageSkeleton } from "./message-skeleton";

interface MessageGroupSkeletonProps {
  isUser?: boolean;
  messageCount?: number;
}

export function MessageGroupSkeleton({
  isUser = false,
  messageCount = 2,
}: MessageGroupSkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: messageCount }).map((_, index) => (
        <MessageSkeleton key={index} isUser={isUser} showAvatar={index === 0} />
      ))}
    </div>
  );
}
