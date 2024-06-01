import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';

interface OTPDocument extends Document {
    userId:string
    otp: string;
    createdAt: Date;
}

const OtpSchema = new Schema<OTPDocument>({
    userId : {
        type:String,
        required:true
    },
    otp : {
        type:String,
        required:true
    }, 
    createdAt:{
        type : Date ,
        default :Date.now()
    },
    
});

OtpSchema.pre<OTPDocument>("save",async function (next){
   const otp =  bcrypt.hashSync(this.otp,8);
   this.otp = otp;
   next()
})


export const OTPModel = mongoose.model<OTPDocument>('OTP', OtpSchema);
