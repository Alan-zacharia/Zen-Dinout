import { error } from "console";
import { UserType } from "../../domain/entities/User";
import { IMailer } from "../../domain/interface/external-lib/IMailer";
import { IUserRepository } from "../../domain/interface/repositories/IUserRepository";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import { jwtGenerateRefreshToken } from "../../functions/jwtTokenFunctions";

export class userInteractorImpl implements IUserInteractor {
  constructor(private readonly repository: IUserRepository, Imailer: IMailer) {}


 

  async register(credentials: UserType): Promise<{ user: UserType | null; message: string }> {
    try {
      const { user, message } = await this.repository.create(credentials);
      if (user) {
        const otp = await otpGenerator.generateOtp();
        nodemailerCreateOtp(user.email, otp);
      }
      return { user, message };
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
  }
}
