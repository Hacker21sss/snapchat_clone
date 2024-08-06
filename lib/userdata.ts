// src/lib/userdata.ts

import  { User, UserDocument } from "@/components/models/user.model";
import { Message ,MessageDocument} from "@/components/models/message.model";
import connectDatabase from "./db";
import {Chat} from "@/components/models/chat.model";
import mongoose from 'mongoose';


export const getProfileUser =async(
  userId:string)=>{
    try{await connectDatabase();
      const user :UserDocument | null=await User.findOne({_id:userId});

      if (!user){
        return "user not found";
      }
      return user;


    }
    catch(error){
      console.log(error);
      throw error ;
    }
  };
  export const getSidebarUsers = async (authUserId: mongoose.Types.ObjectId): Promise<any[]> => {
    try {
        const otherUsers: UserDocument[] = await User.find({ _id: { $ne: authUserId } });
        const userInfo = await Promise.all(
            otherUsers.map(async (user) => {
                const lastMessage: MessageDocument | null = await Message.findOne({
                    $or: [
                        { senderId: user._id, receiverId: authUserId },
                        { senderId: authUserId, receiverId: user._id }
                    ]
                }).sort({ createdAt: -1 })
                    .populate('senderId', 'fullname avatar _id')
                    .populate('receiverId', 'fullname, avatar, _id')
                    .exec()

                return {
                    _id: user._id,
                    participants: [user],
                    lastMessage: lastMessage
                        ?
                        {
                            ...lastMessage,
                            senderId: lastMessage.senderId,
                            receiverId: lastMessage.recieverId
                        }
                        : null
                }
            })
        );
        return userInfo;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export const getMessages = async (loggedInUserId:string, otherUserId:string ) => {
    try { 
         await connectDatabase();
         const chatMessage = await Chat.findOne({
            participants:{$all:[loggedInUserId, otherUserId]}
         }).populate({
            path:'messages',
            populate:{
                path:'senderId',
                model:'User',
                select:'fullname'
            }
         });
         if(!chatMessage) return []; 
         return JSON.parse(JSON.stringify(chatMessage.messages)) ;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


