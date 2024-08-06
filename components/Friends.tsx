import React from 'react';
import Friend from './Friend';
import { auth } from '@/auth';
import { getSidebarUsers } from '@/lib/userdata';
import { User } from '@/types/auth.type'; // Import the User type

const Friends: React.FC = async () => {
  const authUser = await auth();
  // Make sure authUser?.user?._id is of the correct type for getSidebarUsers
  const otherUsers: User[] = authUser?.user ? await getSidebarUsers(authUser.user._id) : [];

  return (
    <div className='flex flex-col'>
      {otherUsers?.map((user: User) => {
        return (
          <Friend key={user._id} user={user} />
        );
      })}
    </div>
  );
};

export default Friends;
