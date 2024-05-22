import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcryptjs';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  phone ?: string;
  createdAt: Date;
  updatedAt?: Date;
  isBlocked : boolean;
  role : string;
  isVerified: boolean;
  isAdmin: boolean;
  otp:string;
}

const userSchema: Schema<UserDocument> = new Schema({
    username : {
        type : String,
        required : true
    },
    email :{
        type:String,
        required : true,
        unique : true 
    },
    phone : {
        type : Number,
    },
    password :{
        type : String,
        required : true
    },
    isBlocked :{
        type : Boolean,
        default:false
    },
    role:{
     type:String,
     enum : ["user","seller"],
     default:"user"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    otp:{
        type : String,
    }
});

userSchema.pre<UserDocument>("save",async function (next) {
  this.updatedAt = new Date();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
