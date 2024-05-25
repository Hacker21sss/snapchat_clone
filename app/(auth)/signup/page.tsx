import Signup from '@/components/Signup'
import { signIn } from '@/auth'
import React from 'react'

const Signuppage = () => {
  const signuphandler = async () => {
    'use server'
    await signIn('github');
  }
  return (
    <form action={signuphandler}>

      <Signup />

    </form>
  )
}

export default Signuppage