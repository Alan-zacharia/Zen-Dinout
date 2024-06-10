import { UserType } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { jwtGenerateToken } from "../../functions/jwtTokenFunctions";
import UserModel from "../database/model.ts/userModel";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import bcrypt, { hashSync } from 'bcryptjs';
import { OTPModel } from "../database/model.ts/OtpModel";
import reset_PasswordMailer from "../../functions/resetPasswordEmail";

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
      if(user.isVerified){
        const hashedPassword = await bcrypt.compare(password , user.password);
         if(!hashedPassword){
           console.log('password is not match');
           message = 'Invalid password';
         }else{
          
            token =  jwtGenerateToken(user._id as string);
            console.log(token);
         }
        }else{
          message = 'User Not Found';
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
  ): Promise<{ user: UserType | null; message: string;}> {
    console.log("User creation repository.................................")
    try{
    const { username, email, password } = user;
    const newUser = new  UserModel({
      username,
      email,
      password,
    });
    await newUser.save();
    return {user: newUser as UserType,message: "User created successfully"};
  }catch(error){
    console.log("Error in create repository ",error)
    return {
      user: null,
      message: "User created successfully",
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

  async resetPassword(email: string): Promise<{ message: string; success: boolean; }> {
      console.log("Reset password repository.......")
    try{
      const user = await UserModel.findOne({email});
      if(!user){
        return {message : "User not found" , success : false} 
      }
      reset_PasswordMailer(user.email, user._id as string);
      return {message : "User exists" , success : true};
    }catch(error){
      console.log("Oops error in reset-password Repo " , error);
      throw error;
    }
  };

  async resetPasswordConfirm(id: string , password:string): Promise<{ message: string; status: boolean; }> {
    try{
      console.log("Confirm reset password.........",id)
      const hashedPassword = await bcrypt.hash(password,8)
      const user = await UserModel.findByIdAndUpdate(id,{password : hashedPassword});
      console.log(user);
      if(!user) return {message : "Something went wrong" , status : false};
      return {message : "Successfully reseted" , status : true}
    }catch(error : any){
      console.log("Oops an error occured in Reset password repo : ", error.message);
      throw error;
    }
  };
 
  
}
