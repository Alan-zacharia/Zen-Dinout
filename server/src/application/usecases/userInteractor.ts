import { UserType } from "../../domain/entities/User";
import { RestaurantType } from "../../domain/entities/restaurants";
import { IMailer } from "../../domain/interface/external-lib/IMailer";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { jwtGenerateRefreshToken } from "../../functions/auth/jwtTokenFunctions";
import logger from "../../infrastructure/lib/Wintson";

export class userInteractorImpl implements IUserInteractor {
  constructor(private readonly repository: IUserRepository) {};

  async userRegisterInteractor(credentials: UserType): Promise<{ user: UserType | null; message: string; }> {
    try {
      const { user, message  } = await this.repository.userCreate(credentials);
      return { user, message  };
    } catch (error) {
      logger.error((error as Error).message);
      throw (error as Error).message
    }
  }

  async userLoginInteractor(credentials: { email: string;password: string; }): Promise<{
    user: UserType | null;
    message: string;
    token: string | null;
    refreshToken: string | null;
  }> {
    try {
      const { user, message, token } = await this.repository.findByCredentials(
      credentials.email,
      credentials.password
      );
      let refreshToken = "";
      if (user) {
      refreshToken = jwtGenerateRefreshToken(user.id as string);
      }
      return { user, message, token, refreshToken };
    } catch (error) {
      logger.error((error as Error).message);
      throw (error as Error).message;
    }
  };

  async generateOtpInteractor(email : string): Promise<{ message: string; otp : number }> {
    try{
      const {message , otp} = await this.repository.generateOtp(email);
      return {message  , otp};
    }catch(error){
      logger.error((error as Error).message);
      throw (error as Error).message;
    }
  };

  async resetPasswordInteractor(email: string): Promise<{ message: string; success: boolean; }> {
    try{
      const {message , success} = await this.repository.resetPassword(email)
      return {message , success}
    }catch(error){
      logger.error((error as Error).message);
      throw (error as Error).message;
    }
  };

  async resetPasswordChangeInteractor(id: string , password:string): Promise<{ message: string; status: boolean; }> {
    try{
     const {message , status} = await this.repository.resetPasswordConfirm(id,password);
     return {message , status}
    }catch(error){
     logger.error((error as Error).message);
     throw (error as Error).message;
    }
   };

  async googleLoginInteractor(credentials: {email : string , sub :  string , given_name : string}): Promise<{ message: string; user: UserType; token:string }> {
    try{
      const {message , user ,token } = await this.repository.googleCredentialsCreate(credentials);
      return {message , user , token};
    }catch(error){
      logger.error((error as Error).message);
      throw (error as Error).message;
    }
  };
  async getListedRestaurantsInteractor():Promise<{ listedRestaurants : RestaurantType[]}> {
    try{
      const {listedRestaurants} = await this.repository.getListedRestaurants();
      return {listedRestaurants};
    }catch(error){
      logger.error((error as Error).message);
      throw (error as Error).message;
    }
  };

}
