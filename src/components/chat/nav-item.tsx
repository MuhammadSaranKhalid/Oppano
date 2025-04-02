"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import type { NavItemProps } from "./types";

const NavItem = memo(function NavItem({
  icon,
  label,
  active,
  onClick,
}: NavItemProps) {
  // Render icon based on string or ReactNode
  const renderIcon = () => {
    if (typeof icon === "string") {
      switch (icon) {
        case "replies":
          return (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 14L3.41421 12.5858C4.19526 11.8047 5.27043 11.3333 6.41421 11.3333H11C12.6569 11.3333 14 9.99022 14 8.33333V4.33333C14 2.67644 12.6569 1.33333 11 1.33333H5C3.34315 1.33333 2 2.67644 2 4.33333V14Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        case "activity":
          return (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6667 8H12L10 13.3333L6 2.66667L4 8H1.33334"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        case "drafts":
          return (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 5.33333L8 2L2.66667 5.33333M13.3333 5.33333L8 8.66667M13.3333 5.33333V10.6667L8 14M8 8.66667L2.66667 5.33333M8 8.66667V14M2.66667 5.33333V10.6667L8 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        case "more":
          return (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8.66667H8.00667M8 4.66667H8.00667M8 12.6667H8.00667M4 8.66667H4.00667M4 4.66667H4.00667M4 12.6667H4.00667M12 8.66667H12.0067M12 4.66667H12.0067M12 12.6667H12.0067"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          );
        default:
          return null;
      }
    }

    return icon;
  };

  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm",
        active ? "bg-muted" : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <span className="text-gray-600">{renderIcon()}</span>
      <span>{label}</span>
    </button>
  );
});

export default NavItem;
