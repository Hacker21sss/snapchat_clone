import { auth } from '@/auth';
import Chatpage from '@/components/Chatpage';
import { getMessage } from '@/lib/messagedata';
import { getprofileUser } from '@/lib/userdata';
import React from 'react';

const Chattingpage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    
    try {
       
        const userProfile = await getprofileUser(id);

        
        const authUser = await auth();
        
        
        const messages = authUser ? await getMessage(authUser?.user?._id, id) : [];

        return (
            <div className='w-[72%]'>
                <Chatpage userProfile={userProfile} messages={messages} authUser={authUser} />
            </div>
        );
    } catch (error) {
        console.error('Error fetching chat data:', error);
        
        // You might want to handle the error in a user-friendly way, such as:
        // - Showing an error message
        // - Redirecting the user
        // - Returning a fallback UI
        return (
            <div className='w-[72%]'>
                <p>Error loading chat data. Please try again later.</p>
            </div>
        );
    }
};

export default Chattingpage;
