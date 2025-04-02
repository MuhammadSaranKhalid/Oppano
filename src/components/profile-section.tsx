// import Image from "next/image"
// import type { ProfileInfo } from "@/types"
// import { Bell, Clock, MessageSquare, Phone, Calendar } from "lucide-react"

// interface ProfileSectionProps {
//   profile: ProfileInfo
// }

// export function ProfileSection({ profile }: ProfileSectionProps) {
//   return (
//     <div className="w-72 border-l border-[#dbdde1] flex-shrink-0 flex flex-col h-full overflow-y-auto">
//       <div className="p-4 flex flex-col items-center">
//         <div className="w-full h-56 rounded-lg overflow-hidden mb-4">
//           <Image
//             src={profile.avatar || "/placeholder.svg"}
//             alt={profile.name}
//             width={288}
//             height={224}
//             className="object-cover w-full h-full"
//           />
//         </div>

//         <h2 className="text-xl font-bold">{profile.name}</h2>
//         <p className="text-sm">{profile.title}</p>
//         <p className="text-xs text-[#747881]">{profile.pronouns}</p>

//         <div className="w-full mt-4 space-y-2">
//           <div className="flex items-center text-sm">
//             <Bell className="h-4 w-4 mr-2" />
//             <span>{profile.status}</span>
//           </div>
//           <div className="flex items-center text-sm">
//             <Clock className="h-4 w-4 mr-2" />
//             <span>{profile.localTime}</span>
//           </div>
//         </div>

//         <div className="w-full mt-4 space-y-2">
//           <button className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center">
//             <MessageSquare className="h-4 w-4 mr-2" />
//             Message
//           </button>
//           <button className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center">
//             <Phone className="h-4 w-4 mr-2" />
//             Clust
//           </button>
//           <button className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center">
//             <Calendar className="h-4 w-4 mr-2" />
//             Calendar
//           </button>
//         </div>

//         <div className="w-full mt-6">
//           <h3 className="font-medium mb-2">About me</h3>
//           <div className="space-y-2 text-sm">
//             <div>
//               <p className="text-xs text-[#747881]">Start Date</p>
//               <p>{profile.startDate}</p>
//             </div>
//             {profile.linkedIn && (
//               <div>
//                 <p className="text-xs text-[#747881]">LinkedIn</p>
//                 <p className="text-[#ff6a00]">{profile.linkedIn}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Bell, Clock, MessageSquare, Phone, Calendar, LogOut } from "lucide-react"
import { useLogout } from "@refinedev/core"
import { useChatStore } from "@/store/chat-store"
import type { ProfileInfo } from "@/types"

export function ProfileSection() {
  const { currentUser, fetchCurrentUser } = useChatStore()
  const [profile, setProfile] = useState<ProfileInfo | null>(null)
  const { mutate: logout } = useLogout()

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.username,
        title: "Team Member",
        pronouns: "",
        avatar: currentUser.profilePicture || "/placeholder.svg?height=224&width=288",
        status: "Online",
        localTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " local time",
        startDate:
          new Date(currentUser.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }) +
          ` (${Math.floor((Date.now() - new Date(currentUser.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30))} months ago)`,
        linkedIn: "",
      })
    }
  }, [currentUser])

  if (!profile) {
    return (
      <div className="w-72 border-l border-[#dbdde1] flex-shrink-0 flex items-center justify-center">
        Loading profile...
      </div>
    )
  }

  return (
    <div className="w-72 border-l border-[#dbdde1] flex-shrink-0 flex flex-col h-full overflow-y-auto">
      <div className="p-4 flex flex-col items-center">
        <div className="w-full h-56 rounded-lg overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
          {profile.avatar ? (
            <img src={profile.avatar || "/placeholder.svg"} alt={profile.name} className="object-cover w-full h-full" />
          ) : (
            <span className="text-4xl">{profile.name.charAt(0)}</span>
          )}
        </div>

        <h2 className="text-xl font-bold">{profile.name}</h2>
        <p className="text-sm">{profile.title}</p>
        <p className="text-xs text-[#747881]">{profile.pronouns}</p>

        <div className="w-full mt-4 space-y-2">
          <div className="flex items-center text-sm">
            <Bell className="h-4 w-4 mr-2" />
            <span>{profile.status}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2" />
            <span>{profile.localTime}</span>
          </div>
        </div>

        <div className="w-full mt-4 space-y-2">
          <button className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </button>
          <button className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </button>
          <button className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar
          </button>
          <button
            onClick={() => logout()}
            className="w-full border border-[#dbdde1] rounded py-2 px-4 text-sm flex items-center justify-center text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="w-full mt-6">
          <h3 className="font-medium mb-2">About me</h3>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-xs text-[#747881]">Start Date</p>
              <p>{profile.startDate}</p>
            </div>
            {profile.linkedIn && (
              <div>
                <p className="text-xs text-[#747881]">LinkedIn</p>
                <p className="text-[#ff6a00]">{profile.linkedIn}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

