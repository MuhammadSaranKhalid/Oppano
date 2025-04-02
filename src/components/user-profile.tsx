"use client"

import { Bell, Calendar, Clock, Computer, MessageCircle, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface UserProfileData {
  name: string
  role: string
  pronouns: string
  status: string
  localTime: string
  startDate: string
  linkedIn: string
}

interface UserProfileProps {
  user: UserProfileData
  onClose: () => void
}

export function UserProfile({ user, onClose }: UserProfileProps) {
  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Profile</h2>
        <div className="flex items-center gap-2">
          <Computer className="h-5 w-5 text-gray-500" />
          <button onClick={onClose} className="md:hidden">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-32 w-32 overflow-hidden rounded-md">
            <img src="/placeholder.svg?height=128&width=128" alt={user.name} className="h-full w-full object-cover" />
          </div>

          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-700">{user.role}</p>
          <p className="text-xs text-gray-500">{user.pronouns}</p>

          <div className="mt-4 w-full space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Bell className="h-4 w-4 text-gray-500" />
              <span>{user.status}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{user.localTime}</span>
            </div>
          </div>

          <div className="mt-4 grid w-full grid-cols-1 gap-2">
            <Button variant="outline" className="justify-start">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" className="justify-start">
              <Phone className="mr-2 h-4 w-4" />
              Clust
            </Button>
            <Button variant="outline" className="justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>

          <div className="mt-6 w-full">
            <h3 className="mb-2 text-sm font-semibold">About me</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Start Date</p>
                <p className="text-sm text-[#ff6a00]">{user.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">LinkedIn</p>
                <a href="#" className="text-sm text-[#ff6a00]">
                  {user.linkedIn}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

