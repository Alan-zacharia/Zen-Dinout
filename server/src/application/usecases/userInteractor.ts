import { UserType } from "../../domain/entities/User";
import { IMailer } from "../../domain/interface/external-lib/IMailer";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { jwtGenerateRefreshToken } from "../../functions/jwtTokenFunctions";

export class userInteractorImpl implements IUserInteractor {
  constructor(private readonly repository: IUserRepository, Imailer: IMailer) {}
  

  async register(credentials: UserType): Promise<{ user: UserType | null; message: string; token : string}> {
    try {
      const { user, message , token  } = await this.repository.create(credentials);
      return { user, message , token };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      }
      console.log(error);
      throw error;
    }
  }


  async login(credentials: { email: string;password: string; }): Promise<{
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
        refreshToken = await jwtGenerateRefreshToken(user.id as string);
      }
      console.log(token, user);
      return { user, message, token, refreshToken };
    } catch (error) {
      console.log("Error occured in Login", error);
      throw error;
    }
  };
  async verify(otp: string, userId: string): Promise<{ message: string; status: boolean; }> {
  try{
     const {message , status } = await this.repository.OtpCheking(otp , userId);
     return {message , status};
  }catch(error){
    console.log(error);
    throw error;
  }
  }
  async resendOtp(userId: string): Promise<{ message: string; status: boolean; }> {
  try{
     const {message , status } = await this.repository.resend(userId);
     return {message , status};
  }catch(error){
    console.log(error);
    throw error;
  }
  }

}
