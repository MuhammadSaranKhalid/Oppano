import { Skeleton } from "@/components/ui/skeleton";

export function ChannelItemSkeleton() {
  return (
    <div className="flex w-full items-center gap-2 py-1 px-2">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
