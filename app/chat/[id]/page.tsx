import { auth } from '@/auth';
import Chatpage from '@/components/Chatpage';
import { getMessage } from '@/lib/messagedata';
import { getProfileUser } from '@/lib/userdata';
import React from 'react';

import mongoose from 'mongoose';

const Chattingpage = async ({ params }: { params: { id: string } }) => {
  let userProfile=await getProfileUser(params.id);
  userProfile=JSON.stringify(userProfile);

  
    const authUser = await auth();

    // Use optional chaining to handle potential undefined values
    const messages =  authUser?.user?.id
    ? await getMessage(authUser.user.id, params.id)
    : [];

    return (
      <div className='w-[72%]'>
        <Chatpage userProfile={userProfile} messages={messages} authUser={authUser} />
      </div>
    );
  
}


export default Chattingpage;
