import mongoose from "mongoose";
import { UserType } from "../../domain/entities/User";
import { IAdminRepositories } from "../../domain/interface/repositories/IAdminRepositories";
import UserModel from "../database/model.ts/userModel";
import bcrypt from 'bcryptjs';
import restaurantModel from "../database/model.ts/restaurantModel";

export class adminRepositoryImpl implements IAdminRepositories {
 
  async loginAdminRepo(credentials: {
    email: string;
    password: string;
  }): Promise<{ admin: UserType | null; message: string }> {
    try {
      const admin = await UserModel.findOne({ email: credentials.email });
      if (!admin || !admin.isAdmin) {
            return { admin, message: "Admin doesn't exist" };
      }else{
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          admin.password
        );
        if (passwordMatch) {
          return { admin, message: "Login Successful" };
        } else {
          return { admin, message: "Password is incorrect" };
        }
      }
    } catch (error : any) {
      console.log("Error in admin login repo : " , error);
      return { admin: null, message: error.message };
    }
  }
  async getUsersList(): Promise<{ users: object | null; message: string }> {
    try {
      console.log('Get USer Repo')
      const users = await UserModel.find({isVerified : true});
      return { users, message: "Users list Successfull" };
    } catch (error) {
      console.log("Error in get user repo : ", error);
      throw error;
    }
  }
  async getRestaurantsList(): Promise<{
    restaurants: object | null;
    message: string;
  }> {
    try {
      const restaurants = await restaurantModel.find({isApproved : true});
      return { restaurants, message: "restaurant list Successfull" };
    } catch (error) {
      console.log("Error in get restaurant repo : ", error);
      throw error;
    }
  }
  async approve(): Promise<{
    restaurants: object | null;
    message: string;
  }> {
    try {
      const restaurants = await restaurantModel.find({});
      return { restaurants, message: "restaurant list Successfull" };
    } catch (error) {
      console.log("Error in get restaurant approve repo : ", error);
      throw error;
    }
  };

  async userBlockUnblock(id: string, block: string): Promise<{ users: UserType | null ; message: string; }> {
       try{
        let user;
        if(block == 'false'){
          user = await UserModel.findByIdAndUpdate(id,{isBlocked : true },{new : true});
        }else{
          user = await UserModel.findByIdAndUpdate(id,{isBlocked : false },{new :true});
        } 
          return {users : user , message : "user actions successfull"}
       }catch(error){
        console.log("Error in get restaurant actions repo : ", error);
        throw error;
       }
  }
}
