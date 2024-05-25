'use client'
import { ArrowBigLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { deleteChat } from '@/lib/serveractions'
import { useParams } from 'next/navigation'
import { useFormStatus } from 'react-dom'

const ChatTopBar = ({ userProfile }: { userProfile: any }) => {
    const { id } = useParams<{ id: string }>();
    const deleteChatHandler = deleteChat.bind(null, id);
    return (
        <div className='flex items-center justify-between '>
            <div className='flex items-center gap-4'>
                <Link href={'/chat'}>

                    <ArrowBigLeft />
                </Link>

                <div className='flex items-center gap-2'>
                    <Avatar>

                        <AvatarImage src={userProfile.profilephoto} alt='user-profile-photo' />
                    </Avatar>
                    <h1 className='font-bold' >{userProfile.fullname}</h1>

                </div>



            </div>
            <form action={deleteChatHandler} >

                <SubmitButton />

            </form>



        </div>
    )
}

export default ChatTopBar


const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button variant={'destructive'} className='rounded-full'>

            {
                !pending ? "clear chat" : <Button  variant={'destructive'} className='rounded-full'><Loader2 className='mr-2 h-4 w-4 animate-spin' />please wait</Button>
            }
        </Button>
    )
}