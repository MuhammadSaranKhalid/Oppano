"use client"
import { ChevronDown, FileText, MessageCircle, Activity, MoreHorizontal, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { NavItem } from "@/components/nav-item"
import { ChannelItem } from "@/components/channel-item"
import { DirectMessageItem } from "@/components/direct-message-item"
import type { UserProfileData } from "@/components/user-profile"

interface SidebarProps {
  onUserClick: (user: UserProfileData) => void
}

export function Sidebar({ onUserClick }: SidebarProps) {
  const users = [
    {
      id: "cristal",
      name: "Cristal Parker",
      status: "Next time it's my turn!",
      time: "12/22/21",
      isYou: true,
      profile: {
        name: "Cristal Parker",
        role: "Product Designer",
        pronouns: "She/her/hers",
        status: "Away, notifications snoozed",
        localTime: "6:20 AM local time",
        startDate: "Dec 6, 2022 (7 months ago)",
        linkedIn: "My LinkedIn profile",
      },
    },
    {
      id: "bill",
      name: "Bill Kuphal",
      status: "The weather will be perfect for th...",
      time: "9:41 AM",
      isActive: true,
      profile: {
        name: "Bill Kuphal",
        role: "Senior Developer",
        pronouns: "He/him/his",
        status: "Online for 10 mins",
        localTime: "2:20 PM local time",
        startDate: "Mar 15, 2021 (2 years ago)",
        linkedIn: "My LinkedIn profile",
      },
    },
    {
      id: "david",
      name: "David Smith",
      status: "Here're my latest drone shots",
      time: "9:16 AM",
      unread: 80,
      profile: {
        name: "David Smith",
        role: "Photographer",
        pronouns: "He/him/his",
        status: "Away",
        localTime: "10:20 PM local time",
        startDate: "Aug 3, 2022 (11 months ago)",
        linkedIn: "My LinkedIn profile",
      },
    },
  ]

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex items-center gap-2 p-3">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="w-full h-9 rounded-full border-none bg-[#f4f4f5] pl-9 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1 px-3">
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Replies" />
          <NavItem icon={<Activity className="h-5 w-5" />} label="Activity" />
          <NavItem icon={<FileText className="h-5 w-5" />} label="Drafts" />
          <NavItem icon={<MoreHorizontal className="h-5 w-5" />} label="More" />
        </div>

        <div className="mt-2 border-t border-[#e9eaed]"></div>

        <div className="mt-4 px-3">
          <Collapsible defaultOpen>
            <div className="flex items-center justify-between py-1">
              <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                <span>Loopz</span>
              </CollapsibleTrigger>
              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <CollapsibleContent>
              <div className="mt-1 space-y-1 pl-4">
                <ChannelItem name="general" />
                <ChannelItem name="design_team" isPrivate />
                <ChannelItem name="marketing_team" />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="mt-4 px-3">
          <Collapsible defaultOpen>
            <div className="flex items-center justify-between py-1">
              <CollapsibleTrigger className="flex items-center gap-1 text-sm font-medium">
                <ChevronDown className="h-4 w-4" />
                <span>Direct Messages</span>
              </CollapsibleTrigger>
              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-sm text-white bg-[#ff6a00]">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <CollapsibleContent>
              <div className="mt-1 space-y-0">
                {users.map((user) => (
                  <div key={user.id} onClick={() => onUserClick(user.profile)}>
                    <DirectMessageItem
                      name={user.name}
                      status={user.status}
                      time={user.time}
                      isYou={user.isYou}
                      isActive={user.isActive}
                      unread={user.unread}
                    />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  )
}

