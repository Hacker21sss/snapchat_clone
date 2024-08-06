

import { User, UserDocument } from '@/components/models/user.model';
import mongoose from 'mongoose';


export const getUserById = async (userId: mongoose.Types.ObjectId): Promise<UserDocument | null> => {
    try {
      const user = await User.findById(userId).exec();
      return user; // user is of type UserDocument, so _id should be available
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  