import mongoose, { Types, PopulatedDoc, Schema, Model } from "mongoose"


import { UserDocument } from "./user.model"
export interface MesssageInterface {
    senderId: Types.ObjectId | PopulatedDoc<UserDocument>,
    recieverId: Types.ObjectId | PopulatedDoc<UserDocument>,
    content: String,
    messageType: 'text' | 'image',
    opened: boolean
}
export interface MessageDocument extends MesssageInterface, Document {
    createdAt: Date,
    updatedAt: Date,
    
}

const messageModel = new mongoose.Schema<MessageDocument>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        reuired: true,
    },
    messageType: {
        type: String,
        required: true,
        enum: ['text', 'image']
    },
    opened: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })



export const Message:Model<MessageDocument>=mongoose?.models?.Message || mongoose.model('Message',messageModel);