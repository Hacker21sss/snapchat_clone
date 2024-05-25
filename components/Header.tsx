import React from 'react'
import Image from 'next/image'
import Myai from '@/public/myai-asset.png'
import { Button } from './ui/button'
import { FaLaptop } from "react-icons/fa";
import Link from 'next/link';
import { auth } from '@/auth'
import { SiImessage } from "react-icons/si";


const Header = async () => {
    const authUser=await auth();
    
    
    return (
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
            <div >
                <h1 className='text-7xl font-medium'>Snapchat is<br /> now on the <br />  web!</h1>
                <h1 className='my-5 text-xl'>chat,snap,and video call your friends from <br />  wherever you are.</h1>
{
    authUser ? <Link href={"/login"}> <Button className='gap-2 rounded-full'><SiImessage size='18px' />start  chat </Button></Link>
    :
    <Link href={"/login"}> <Button className='gap-2 rounded-full'><FaLaptop />Login to chat </Button></Link>
}



              


            </div>
            <div>
                <Image

                    src={Myai}
                    alt='Myai'
                    width={650}
                    height={650}
                />
            </div>




        </div>
    )
}

export default Header