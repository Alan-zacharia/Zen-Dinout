import { UserType } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { jwtGenerateToken } from "../../functions/jwtTokenFunctions";
import UserModel from "../database/model.ts/userModel";
import bcrypt from 'bcryptjs';

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
  ): Promise<{ user: UserType | null; message: string; }> {
    const { username, email, password, role } = user;
    const newUser: UserType = await UserModel.create({
      username,
      email,
      password,
      role,
    });
    return {
      user: newUser as UserType,
      message: "User created successfully",
    };
  }
}
