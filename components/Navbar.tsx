import React from 'react'
import snapchatl from '@/public/snapchatl.jpg'
import Image from 'next/image'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Ghost } from 'lucide-react'
import { TbGridDots } from "react-icons/tb";
import {auth} from '@/auth'

import LogoutButton from './shared/LogoutButton'
import Link from 'next/link'


const Navbar = async() => {
const authUser=await auth();
     
    return (
        <div className='flex  items-center justify-between w-screen px-10 py-4'>


            <div className='flex items-center gap-2' >

                <Image
                    src={snapchatl}
                    alt='snapchatl'
                    width={50}
                    height={50}

                />
                <Input type="text" placeholder="search..." className='rounded-full' />


            </div>


            <div className='flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mt-4 md:mt-0' >
                <Button variant={'ghost'}>stories</Button>
                <Button variant={'ghost'}>spotlight</Button>
                <Button variant={'ghost'}>chat</Button>
                <Button variant={'ghost'} >Lenses</Button>



            </div>


            <div className='flex items-center gap-5'  >
                <Button size={'icon'} variant={'secondary'} className='rounded-full bg-white text-black'>
                    <TbGridDots />

                </Button >
                <Button className='rounded-full'>Snapchat Ads..</Button>
                <Button className='rounded-full'>Download</Button>
                {
                    authUser?(<LogoutButton/>):(<Link href={'/login'}><Button className='rounded-full'>Login</Button></Link>)
                }
                



            </div>

        </div>
    )
}

export default Navbar