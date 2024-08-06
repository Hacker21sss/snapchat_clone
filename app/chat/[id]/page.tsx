import { auth } from '@/auth';
import Chatpage from '@/components/Chatpage';
import { getMessage } from '@/lib/messagedata';
import { getProfileUser } from '@/lib/userdata';
import React from 'react';

import mongoose from 'mongoose';

const Chattingpage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const userId = new mongoose.Types.ObjectId(id);
    const userProfile = await getProfileUser(id);
    const authUser = await auth();

    // Use optional chaining to handle potential undefined values
    const messages = authUser?.user ? await getMessage(authUser?.user?._id, id) : [];

    return (
      <div className='w-[72%]'>
        <Chatpage userProfile={userProfile} messages={messages} authUser={authUser} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching chat data:', error);

    return (
      <div className='w-[72%]'>
        <p>Error loading chat data. Please try again later.</p>
      </div>
    );
  }
};

export default Chattingpage;
