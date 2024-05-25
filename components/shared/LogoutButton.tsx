import React from 'react'
import { Button } from '../ui/button';
import { IoIosLogOut } from "react-icons/io";
import { logoutHandler } from '@/lib/serveractions';


const LogoutButton = () => {
//     const logoutHandler=async()=>{
//         'use server'
//         try {
//             await signOut();
            
//         } catch (error) {
//             console.log(error);
//             throw error ;
//         }
//         redirect("/login");
//     }
  return (
    <form action={logoutHandler}>
        
            
                <Button size={'icon'} className='rounded-full' >
                <IoIosLogOut size={'18px'} />
                </Button>

            
        

    </form>
  )
}

export default LogoutButton