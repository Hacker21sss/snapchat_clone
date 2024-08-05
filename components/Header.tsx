import React from 'react';
import Image from 'next/image';
import Myai from '@/public/myai-asset.png';
import { Button } from './ui/button';
import { FaLaptop } from 'react-icons/fa';
import Link from 'next/link';
import { auth } from '@/auth';
import { SiImessage } from 'react-icons/si';

const Header = async () => {
    const authUser = await auth();

    return (
        <div className='flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 py-6 md:px-10 md:py-8'>
            <div className='text-center md:text-left'>
                <h1 className='text-4xl md:text-7xl font-medium leading-tight mb-4'>
                    Snapchat is<br />&quot; now on the&quot; <br /> web!
                </h1>
                <h2 className='text-lg md:text-xl mb-6'>
                    &quot;Chat, snap, and video call your friends from&quot; <br /> &quot;wherever you are&quot;
                </h2>
                {authUser ? (
                    <Link href={"/chat"}>
                        <Button className='gap-2 rounded-full'>
                            <SiImessage size='18px' /> &quot;Start Chat&quot;
                        </Button>
                    </Link>
                ) : (
                    <Link href={"/login"}>
                        <Button className='gap-2 rounded-full'>
                            <FaLaptop /> &quot;Login to Chat&quot;
                        </Button>
                    </Link>
                )}
            </div>
            <div className='mt-6 md:mt-0'>
                <Image
                    src={Myai}
                    alt='Myai'
                    width={400}
                    height={400}
                    layout='intrinsic' // Adjust the layout property as needed
                />
            </div>
        </div>
    );
};

export default Header;
