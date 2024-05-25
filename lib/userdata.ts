import { Message } from "@/components/models/message.model";
import { User, UserDocument } from "@/components/models/user.model";
import connectDatabase from "./db";





export const getSidebarUsers = async (loggedInUserId: string) => {



    try {
        const otherusers = await User.find({ _id: { $ne: loggedInUserId } });

        const userinfo = await Promise.all(
            otherusers.map(async (user) => {
                const lastMessage = await Message.findOne({
                    $or: [
                        { senderId: user._id, recieverId: loggedInUserId },
                        { senderId: loggedInUserId, recieverId: user._id }
                    ]
                }).sort({ createdAt: -1 }).populate('senderId', 'fullname profilephoto_id')
                    .populate('recieverId', 'fullname profilephoto _id')
                    .exec();

                return {
                    _id: user._id,
                    participants: [user],
                    lastMeassage: lastMessage ? {
                        ...lastMessage.toJSON(),
                        senderId: lastMessage.senderId,
                        recieverId: lastMessage.recieverId
                    } : null
                };
            })
        )



        return userinfo;

    } catch (error) {
        console.log(error);
        throw error;

    }
}
export const getprofileUser=async(userId:string)=>{
    try {
       await connectDatabase();
       const user:UserDocument|null=await User.findOne({_id:userId}) ;
       if(!user)
        return "user not found";

return user;
       
    } catch (error) {
       console.log(error);
       
       throw(error);
    }
}