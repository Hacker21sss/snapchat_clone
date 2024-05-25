import mongoose ,{Document, Model}from "mongoose"
export interface UserInterface{
    username:String,
    fullname:String,
    email:String,
    profilephoto:String
};
export interface UserDocument extends UserInterface,Document {
createdAt:Date,
updatedAt:Date,
}
const userModel=new mongoose.Schema<UserDocument>({
username:{
    type:String,
    required:true,
    unique:true

},
fullname:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
profilephoto:{
    type:String,
    default:" "
}
},{timestamps:true});


export const User:Model<UserDocument>=mongoose?.models?.User || mongoose.model('User',userModel);