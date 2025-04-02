import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface MessageSkeletonProps {
  isUser?: boolean;
  showAvatar?: boolean;
}

export function MessageSkeleton({
  isUser = false,
  showAvatar = true,
}: MessageSkeletonProps) {
  const align = isUser ? "right" : "left";

  return (
    <div className={cn("flex gap-2", align === "right" ? "justify-end" : "")}>
      {align === "left" && showAvatar && (
        <Skeleton className="mt-1 h-8 w-8 rounded-full flex-shrink-0" />
      )}

      <div
        className={cn("flex flex-col", align === "right" ? "items-end" : "")}
      >
        <div
          className={cn(
            "rounded-lg p-3 max-w-[280px] min-w-[100px]",
            align === "right"
              ? "rounded-tr-none bg-[#ffd8b1] opacity-50"
              : "rounded-tl-none bg-[#e9eaed] opacity-50"
          )}
        >
          <Skeleton className="h-4 w-full bg-current opacity-30" />
          <Skeleton className="mt-2 h-4 w-3/4 bg-current opacity-30" />
        </div>

        <div
          className={cn(
            "mt-1 flex items-center gap-1",
            align === "right" ? "justify-end" : ""
          )}
        >
          <Skeleton className="h-3 w-10 bg-muted-foreground/30" />
        </div>
      </div>
    </div>
  );
}
