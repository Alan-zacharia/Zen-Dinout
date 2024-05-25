import { required } from "joi";
import mongoose, { Schema } from "mongoose";
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
        expires:30 ,
        default :Date.now()
    }
});


export const OTPModel = mongoose.model<OTPDocument>('OTP', OtpSchema);
