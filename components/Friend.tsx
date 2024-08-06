import Link from 'next/link';
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { formatDate } from '@/lib/utils';
import { IoSend, IoSendOutline } from 'react-icons/io5';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { IoMdCheckboxOutline } from 'react-icons/io';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';


interface Participant {
  profilephoto: string;
  fullname: string;
  _id: string;
}

interface LastMessage {
  messageType: string;
  content: string;
  createdAt: Date;
  senderId: {
    _id: string;
  };
  opened?: boolean;
}

interface User {
  _id: string;
  participants: Participant[];
  lastMessage?: LastMessage;
}

const Friend = ({ user }: { user: any }) => {
  const lastMessage = user.lastMessage;
  const lastMessageType = lastMessage?.messageType;
  const formattedDate = lastMessage ? formatDate(lastMessage.createdAt) : formatDate(new Date());
  const isSender = lastMessage && lastMessage.senderId._id !== user.participants[0]._id;
  const isMessageOpened = lastMessage?.opened;

  let messageStatus: string;
  let icon: JSX.Element;

  if (isSender) {
    messageStatus = isMessageOpened ? 'opened' : 'sent';
    icon = lastMessageType === 'text' ? (
      isMessageOpened ? <IoSend size={'16px'} className='text-[#00b4d8]' /> : <IoSendOutline size={'16px'} className='text-[#00b4d8]' />
    ) : (
      isMessageOpened ? <RiCheckboxBlankFill size={'16px'} className='text-red-500' /> : <IoMdCheckboxOutline size={'16px'} className='text-red-500' />
    );
  } else {
    if (!lastMessage) {
      icon = <RiCheckboxBlankFill />;
      messageStatus = 'New Snap';
    } else {
      messageStatus = isMessageOpened ? 'Received' : 'show message';
      icon = lastMessageType === 'text' ? (
        isMessageOpened ? <MdCheckBoxOutlineBlank /> : <RiCheckboxBlankFill />
      ) : (
        isMessageOpened ? <MdCheckBoxOutlineBlank /> : <RiCheckboxBlankFill />
      );
    }
  }

  return (
    <Link href={`/chat/${user._id}`} className='flex items-center justify-between border-b-2 border-[#E3E6E8] rounded-sm my-2 p-3'>
      <div className='flex gap-2'>
        <Avatar>
          {user.participants[0].profilephoto ? (
            <AvatarImage src={user.participants[0].profilephoto} alt='Profile Photo' />
          ) : (
            <AvatarFallback>{user.participants[0].fullname.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h1 className='font-medium'>{user.participants[0].fullname}</h1>
          <p className={`text-xs font-bold text-gray-500 gap-1 flex ${messageStatus === 'New Snap' ? 'text-purple-600' : ''}`}>
            {messageStatus !== 'New Snap' && <span>{icon}</span>}
            {messageStatus === 'New Snap' ? (
              <span className='font-bold'>{messageStatus}</span>
            ) : (
              <span>{messageStatus} - {formattedDate}</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Friend;
