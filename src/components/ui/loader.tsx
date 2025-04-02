import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "border-t-[#ff6a00] border-r-[#ff6a00] border-b-transparent border-l-transparent rounded-full animate-spin",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
}

export { Loader };
