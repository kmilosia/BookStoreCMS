import React, { useEffect } from 'react'
import { useMessageStore } from '../store/messageStore'
import { AiOutlineClose } from 'react-icons/ai'

function Message() {
    const message = useMessageStore((state) => state.message)
    const hideMessage = useMessageStore((state) => state.hideMessage)
    useEffect(() => {
        if(message.bool){
            setTimeout(() => {
                hideMessage()
              }, 2000)
        }
    },[message])
  return (
    message.bool && (
        <div className={`fixed top-0 left-0 h-max w-screen grid grid-cols-[auto_max-content] ${message.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white py-5 px-5 shadow-md z-[10000]`}>
          <div className='w-full flex justify-center items-center cursor-default'>
              <h1 className='font-medium'>{message.title}</h1>
          </div>
          <button className='flex justify-end' onClick={() => hideMessage()}><AiOutlineClose className='text-xl transition-all text-white hover:text-gray-100 dark:hover:text-gray-100'/></button>
        </div>
      )
  )
}

export default Message
