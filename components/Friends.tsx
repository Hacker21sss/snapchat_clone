import React from 'react';
import Friend from './Friend';
import { auth } from '@/auth';
import { getSidebarUsers } from '@/lib/userdata';
import { User } from './models/user.model'; // Import the User type

const Friends = async () => {
  const authUser = await auth();
  // Make sure authUser?.user?._id is of the correct type for getSidebarUsers
  const otherUsers: any = authUser?.user ? await getSidebarUsers(authUser?.user?._id) : [];

  return (
    <div className='flex flex-col'>
      {otherUsers?.map((user: any) => {
        return (
          <Friend key={user._id} user={user} />
        );
      })}
    </div>
  );
};

export default Friends;
