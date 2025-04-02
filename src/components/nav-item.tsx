"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

export function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm",
        active ? "bg-muted" : "hover:bg-muted",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

