import type React from "react";
import {
  Home,
  MessageCircle,
  Activity,
  Clock,
  Folder,
  MoreHorizontal,
} from "lucide-react";

export function IconSidebar() {
  return (
    <div className="flex h-full w-12 flex-col items-center border-r bg-white py-3">
      <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#ff6a00]">
        <span className="text-white font-bold">S</span>
      </div>

      <div className="flex flex-col items-center gap-6">
        <IconButton icon={<Home className="h-5 w-5" />} />
        <IconButton icon={<MessageCircle className="h-5 w-5" />} />
        <IconButton icon={<Activity className="h-5 w-5" />} />
        <IconButton icon={<Clock className="h-5 w-5" />} />
        <IconButton icon={<Folder className="h-5 w-5" />} />
        <IconButton icon={<MoreHorizontal className="h-5 w-5" />} />
      </div>
    </div>
  );
}

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="flex h-6 w-6 items-center justify-center text-gray-600 hover:text-black">
      {icon}
    </button>
  );
}
