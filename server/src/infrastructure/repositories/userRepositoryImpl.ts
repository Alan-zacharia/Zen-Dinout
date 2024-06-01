import { UserType } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { jwtGenerateToken } from "../../functions/jwtTokenFunctions";
import UserModel from "../database/model.ts/userModel";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import bcrypt, { hashSync } from 'bcryptjs';
import { OTPModel } from "../database/model.ts/OtpModel";

export class userRepositoryImpl implements IUserRepository {
  
  async findByCredentials(
    email: string,
    password: string
  ): Promise<{ user: UserType | null; message: string; token: string | null }> {
    const user = await UserModel.findOne({ email: email});
    console.log(user , email)
    let token = null, message = '';
    if(!user){
        message = 'User not found';
    }else{
        const hashedPassword = await bcrypt.compare(password , user.password);
         if(!hashedPassword){
           console.log('password is not match');
           message = 'Invalid password';
         }else{
            token =  jwtGenerateToken(user._id as string);
            console.log(token);
         }
    } 
    if(user && !message ){
        return { user : user , message :"Login Successfull" , token };
    }
        console.log(message);
        return {user : null , message , token };
  };


  async create(
    user: UserType
  ): Promise<{ user: UserType | null; message: string; token : string }> {
    try{
    const { username, email, password, role } = user;
    const otp = otpGenerator.generateOtp();
    nodemailerCreateOtp(user.email as string, otp)
    const newUser = new  UserModel({
      username,
      email,
      password,
      role,
    });
    await newUser.save()
    const otpData = new OTPModel({ otp: otp , userId :newUser._id });
    await otpData.save();
    const token = jwtGenerateToken(newUser._id as string);
    return {user: newUser as UserType,message: "User created successfully", token};
  }catch(error){
    console.log("Error in create repository ",error)
    return {
      user: null,
      message: "User created successfully",
      token :''
    };
  }
  };

  async OtpCheking(otp: string, userId: string): Promise<{ message: string; status: boolean; }> {
    console.log("Otp Cheking ..................................................")
    const id = userId.toString();
    let Data = await OTPModel.findOne({userId : id}); 
    const userData = await UserModel.findById(userId); 
    console.log(Data)
    console.log(userData)
    if(userData && Data){
      const compareOtp = await bcrypt.compare(otp , Data.otp);
      if(compareOtp){
        userData.isVerified = true;
        userData.otp = '';
        await userData.save();
        await Data.deleteOne();
        return {status : true , message : "Otp Verified succesfully" }
      } 
    }
      return {status : false , message : "Incorrect otp" }
  }

  async resend( userId: string): Promise<{ message: string; status: boolean; }> {
    console.log(userId)
    const user = await UserModel.findById(userId);
    console.log(user)

    if(user){
      let user_id; 
      const otp = otpGenerator.generateOtp() ;
      nodemailerCreateOtp(user.email as string, otp);
      const id = user._id;
      if(id) user_id =  id.toString();
      const hashedOtp = hashSync(otp.toString(), 10);
      await OTPModel.findOneAndUpdate(
        { userId: user_id },
        { otp: hashedOtp },
        { upsert: true, new: true }
      );
      return {status : true , message : "Otp Resend succesfully" }
    }
    return {status : false , message : "Incorrect otp" }
  };

}
