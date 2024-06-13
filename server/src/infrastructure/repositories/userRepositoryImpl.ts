import { UserType } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { jwtGenerateToken } from "../../functions/auth/jwtTokenFunctions";
import UserModel from "../database/model.ts/userModel";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import bcrypt, { hashSync } from 'bcryptjs';
import { OTPModel } from "../database/model.ts/OtpModel";
import reset_PasswordMailer from "../../functions/resetPasswordEmail";
import logger from "../lib/Wintson";
import { hashedPasswordCompare, hashedPasswordFunction } from "../../functions/bcryptFunctions";
import { RestaurantType } from "../../domain/entities/restaurants";
import restaurantModel from "../database/model.ts/restaurantModel";

export class userRepositoryImpl implements IUserRepository {

  async findByCredentials(
    email: string,
    password: string
  ): Promise<{ user: UserType | null; message: string; token: string | null }> {
    console.log("User Login repo ..........");
    try{
    const user = await UserModel.findOne({ email: email});
    let token = null, message = '';
    if(!user){
        message = 'User not found';
    }else{
    if(user.isVerified){
        const hashedPassword = await hashedPasswordCompare(password , user.password);
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
    if(user && !message ) return { user : user , message :"Login Successfull" , token };
    return {user : null , message , token };
    }catch(error){
      logger.error("Oops error in User Login Repo.... " , (error as Error).message);
      throw (error as Error).message;
    }
  };

  async userCreate(
    user: UserType
  ): Promise<{ user: UserType | null; message: string;}> {
    console.log("User creation repository..................")
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
    logger.error("Error in create repository ",(error as Error).message)
    throw (error as Error).message
  }
  };

  async generateOtp(email : string): Promise<{ message: string; otp : number }> {
    console.log("Generate Otp ..........")
    try{
      const otp = otpGenerator.generateOtp();
      await nodemailerCreateOtp(email, otp);
      logger.info(`Otp : ${otp}`);
      return {message : "Otp Sended successfully" , otp }
    }catch(error){
      logger.error("Error in generate otp... : ", (error as Error).message);
      throw (error as Error).message
    }
  };

  async resetPassword(email: string): Promise<{ message: string; success: boolean; }> {
    console.log("Reset password repository.......")
    try{
      const user = await UserModel.findOne({email});
      if(!user){
      logger.error("User not found.....")
      return {message : "User not found" , success : false} 
      }
      reset_PasswordMailer(user.email, user._id as string);
      return {message : "User exists" , success : true};
    }catch(error){
      logger.error("Oops error in reset-password Repo.... " , (error as Error).message);
      throw (error as Error).message;
    }
  };

  async resetPasswordConfirm(id: string , password:string): Promise<{ message: string; status: boolean; }> {
    try{
      console.log("Confirm reset password.........",id)
      const hashedPassword = hashedPasswordFunction(password);
      const user = await UserModel.findByIdAndUpdate(id,{password : hashedPassword});
      if(!user){
      logger.error("Failed to update password")
      return {message : "Something went wrong" , status : false};
      }
      return {message : "Successfully reseted" , status : true}
    }catch(error){
      logger.error("Oops an error occured in Reset password repo : ", (error as Error).message);
      throw (error as Error).message;
    }
  };

  async googleCredentialsCreate(credentials: {email : string , sub :  string , given_name : string}): Promise<{ message: string; user: UserType; token :string }> {
    console.log("Repository Google Creation....");
    try{
      const user = new UserModel({
      username : credentials.given_name , 
      email : credentials.email,
      password : credentials.sub
      });
      await user.save();
      console.log(user)
      let token =  jwtGenerateToken(user._id as string);
      return {user , message :"User Created Successfully",token};
    }catch(error){
      logger.error("Oops an error occured in google creation repo : ", (error as Error).message);
      throw (error as Error).message;
    }
  };


  async getListedRestaurants() : Promise<{listedRestaurants : RestaurantType[]}> {
    try{
      const listedRestaurants : RestaurantType[] = await restaurantModel.aggregate([
      {$match :{isApproved : true}},
      {$match :{$and :[{featuredImage : {$exists : true}},{address : {$exists : true}}]}},
      {$sort : {createdAt : -1}}]);
      return { listedRestaurants : listedRestaurants };
    }catch(error){
      logger.error("Oops an error occured in get listed restaurants : " , (error as Error).message);
      throw (error as Error).message;
    }
  }

}
