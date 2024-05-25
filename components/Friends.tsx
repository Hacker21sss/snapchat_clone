import React from 'react'
import Friend from './Friend'
import { auth } from '@/auth'
import { getSidebarUsers } from '@/lib/userdata';

const Friends = async() => {
    const authUser=await auth();
    const otherUsers=authUser?.user ?await getSidebarUsers(authUser?.user?._id):[];
    console.log(otherUsers);
    return (
        <div className='flex flex-col'>
            {
                otherUsers.map((user)=>{
                    return(
                        <Friend key={user._id} user={user}/>

                    )
                })
            }

            


        </div>
    )
}

export default Friends