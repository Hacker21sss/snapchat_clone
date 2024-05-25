import React from 'react'
import ChatTopBar from './ChatTopBar'
import ChatBody from './ChatBody'
import Chatinput from './Chatinput'

const Chatpage = ({userProfile,messages,authUser}:{userProfile:any,messages:any,authUser:any}) => {
  return (
    <div className='m-2 flex flex-col h-[96%]  '>
<ChatTopBar userProfile={userProfile}/>
<ChatBody messages={messages} authUser={authUser}/>
<Chatinput/>


    </div>
  )
}

export default Chatpage