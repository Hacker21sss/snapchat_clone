'use client'


import React, { useState } from 'react'
import { BiCamera } from 'react-icons/bi'
import { Button } from './ui/button'
import { Emojipopover } from './Emojipopover'
import { sendSnapMessage } from '@/lib/serveractions'
import { Content } from 'next/font/google'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const Chatinput = () => {
  const [inputText, setInputText] = useState<string>("");
  const [Loading, setLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const receiverId = params.id;
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendSnapMessage(inputText,
        receiverId,
        "text"
      );
      setInputText("");
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex justify-between items-center gap-2'>
      <div className='p-2 cursor-pointer bg-gray-200 rounded-full'>
        <BiCamera size={'24px'} />
      </div>
      <form onSubmit={submitHandler} className='w-full'>
        <div className='flex items-center gap-5'>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            type='text'
            placeholder='send a snap message'
            className='rounded-full w-full border p-2 outline-none font-medium'
          />
          {
            Loading ? (
              <Button className='rounded-full'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                please wait....
              </Button>

            ) : (

              <Button className='rounded-full' type='submit'>Send snap</Button>
            )
          }
         
        </div>
      </form>
      <div>
        <Emojipopover />

      </div>


    </div>
  )
}

export default Chatinput