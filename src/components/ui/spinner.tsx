import { Loader2, Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
}

function Spinner({ size = 24, className }: SpinnerProps) {
  return (
    <Loader
      size={size}
      className={cn("animate-spin text-[#ff6a00]", className)}
    />
  );
}

export { Spinner };
