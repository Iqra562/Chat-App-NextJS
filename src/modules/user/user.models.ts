import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
   password: string;
  avatar?: string;
  bio?: string;
  isOnline: boolean;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}


const UserSchema = new mongoose.Schema({
    name:{
         type: String,
      required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
       avatar: {
      type: String,
   },
 isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: null,
    },

    password:   {
        type:String,
        required:true
    },
},{timestamps:true})

export default mongoose.models.User || mongoose.model("User",UserSchema  )