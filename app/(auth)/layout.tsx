import Image from 'next/image'
import React from 'react'
import snapchatl from '@/public/snapchatl.jpg'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' h-screen bg-gray-300'>
            <div className='w-screen h-screen flex items-center justify-center'>
                <div className='bg-white p-10 flex flex-col items-center text-center shadow-lg rounded-md'>
                    <Image
                        src={snapchatl}
                        alt='snapchatl'
                        width={40}
                        height={40}


                    />

{children}
                </div>
            </div>

            
        </div>
    )
}

export default layout