import React from 'react';
import snapchatl from '@/public/snapchatl.jpg';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { TbGridDots } from 'react-icons/tb';
import { auth } from '@/auth';
import LogoutButton from './shared/LogoutButton';
import Link from 'next/link';

const Navbar = async () => {
    const authUser = await auth();

    return (
        <div className='flex flex-col md:flex-row items-center justify-between w-full px-4 py-4 md:px-10 md:py-4 bg-white shadow-md'>
            <div className='flex items-center justify-between w-full md:w-auto mb-4 md:mb-0'>
                <Image
                    src={snapchatl}
                    alt='Snapchat Logo'
                    width={50}
                    height={50}
                />
                <Input type="text" placeholder="Search..." className='rounded-full w-full md:w-auto md:ml-4' />
            </div>

            <div className='flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-4 md:mb-0'>
                <Button variant={'ghost'}>Stories</Button>
                <Button variant={'ghost'}>Spotlight</Button>
                <Button variant={'ghost'}>Chat</Button>
                <Button variant={'ghost'}>Lenses</Button>
            </div>

            <div className='flex flex-wrap items-center gap-2 md:gap-4'>
                <Button size={'icon'} variant={'secondary'} className='rounded-full bg-white text-black'>
                    <TbGridDots />
                </Button>
                <Button className='rounded-full'>Snapchat Ads</Button>
                <Button className='rounded-full'>Download</Button>
                {authUser ? (
                    <LogoutButton />
                ) : (
                    <Link href={'/login'}>
                        <Button className='rounded-full'>Login</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
