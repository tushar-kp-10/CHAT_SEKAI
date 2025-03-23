import React from 'react'
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUSer} = useChatStore();
  return (
    <div className='!bg-bas-200'>
      <div className='flex items-center !justify-center !pt-20 !px-4'>
        <div className='!bg-base-100 !rounded-lg !shadow-cl !w-full !max-2-6xl !h-[calc(100vh-8rem)]'>
          <div className='!flex !h-full !rounded-lg !overflow-hidden'>
            <Sidebar/>
            {!selectedUSer ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage