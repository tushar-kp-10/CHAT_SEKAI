import React from 'react'
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="!p-2.5 !border-b !border-base-300">
      <div className="flex items-center !justify-between">
        <div className="flex !items-center !gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="!size-10 aspect-square !rounded-full object-cover relative">
              <img className='!size-10 !border-2 aspect-square !rounded-full object-cover' src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="!text-sm !text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="cursor-pointer">
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader