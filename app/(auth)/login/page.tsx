import React from 'react'
import Login from '@/components/Login'
import { signIn } from '@/auth'

const Loginpage = () => {
  const loginhandler=async()=>{
      'use server'
      await signIn('github');
  }
  return (
   
    <form action={loginhandler}>

<Login/>

    </form>
  )
}

export default Loginpage