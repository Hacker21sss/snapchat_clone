// src/components/models/user.model.ts

import mongoose,{Document,Model} from 'mongoose';

// Define the User interface with essential properties
export interface User  {
  
  username: string;
  fullname: string;
  email: string;
  profilephoto: string;
}

// Extend the User interface with Mongoose Document
export interface UserDocument extends User, Document {
  _id: String;
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userModel = new mongoose.Schema<UserDocument>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilephoto: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// Create and export the User model
export const User :Model<UserDocument>=mongoose?.models?.User  || mongoose.model("User",userModel);
