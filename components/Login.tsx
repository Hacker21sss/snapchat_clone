import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { FaGithub } from "react-icons/fa";

const Login = () => {
  
  return (
    <div>

<h1 className='text-2xl text-center font-medium my-2 '>Login to snapchat</h1>
<Button className='w-full my-4 gap-2'><FaGithub size="24px" />login with github</Button>
<p>new to snapchat?<Link href={'/signup'}className='underline'>signup</Link></p>




    </div>
  )
}

export default Login