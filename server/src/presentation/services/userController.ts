import { Response, Request, NextFunction } from "express";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { UserType } from "../../domain/entities/User";
import { validationResult } from "express-validator";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";

export class userController {
  constructor(private readonly interactor: IUserInteractor) {}

  /**
   * Registeration service
   * @param credentials - Object containing username,email, password, role for registeration
   * @returns Object containing user data, message, token, and refreshToken
   */
  async Register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message: errors.array()});
    }

    console.log("Register service......");
    try {
      const { email, username, password } = req.body;
      let credentials: UserType = { email, username, password };
      console.log("Registeration Credentials", credentials);
      const { user, message  } = await this.interactor.register(credentials);
      if (!user) {
        return res.status(401).json({ message });
      }
      return res.status(200).json({ message , user });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Oops ! error during register:", error.message);
      }
      res.status(500).send("Internal server error");
    }
  }

  /**
   * Login verification service
   * @param credentials - Object containing email and password for login
   * @returns Object containing user data, message, token, and refreshToken
   */
  async Login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({message : errors.array()});
    }
    console.log('hjhjkhjkhjkhjkh')
    try {
      const { email, password, role } = req.body;
      const { user, token, message, refreshToken } =
        await this.interactor.login({ email, password, role });
      if (!user) {
        return res.status(401).json({ message, token: null });
      }
      if(role !== 'user'){
        return res.status(401).json({ message : "User Not Found in this role", token: null });
      }
        res.cookie('Uauth_token',token, {
          httpOnly : true,
          secure : process.env.NODE_ENV === "production",
          maxAge : 86400000
        });
      
      return res.status(200).json({ message, user, token });
    } catch (error) {
      console.error(" OOps ! error during register:", error);
      res.status(500).send("Internal server error");
    }
  }

  /**
   * Otp verification service
   * @param data - userId for verification otp
   * @return status , message
   */

  async OtpVerify(req: Request, res: Response, next: NextFunction) {
    console.log("Otp - Verification service.......");
    try {
      const { otp : { otp }, userId } = req.body;
     console.log(otp , req.body)
      const { message, status } = await this.interactor.verify(otp, userId);
      if (!status) {
       return res.status(401).json({ message, status });
      }
      return res.status(201).json({ message, status });
    } catch (error) {
      console.error(" OOps ! error during resend otp service:", error);
      res.status(500).send("Internal server error");
    }
  }

  /**
   * Resend otp generation service
   * @param data - userId for resend otp
   * @return New otp to users G-mail
   */

  async ResendOtp(req: Request, res: Response, next: NextFunction) {
    console.log("Resend Otp");
    try {
      const { userId } = req.body;
      const { message, status } = await this.interactor.resendOtp(userId);
      if (!status) {
        return res.status(401).json({ message, status });
       }
       return res.status(201).json({ message, status });
    } catch (error) {
      console.log(" OOps ! error during resend otp service:", error);
      res.status(500).send("Internal server error");
    }
  };

  
  /**
   * Genrate otp service
   * @param data - email for otp generation
   * @return  otp to users G-mail
   */
  async GenerateOtp(req : Request , res: Response , next : NextFunction){
    console.log("Generate otp service.....");
    try{
      const {email} = req.body;
      const otp = otpGenerator.generateOtp();
      nodemailerCreateOtp(email , otp)
      return res.status(201).json({otp});
    }catch(error){
      console.log(" OOps ! error during resend otp service:", error);
      res.status(500).send("Internal server error");
    }
  };

  async reset_password(req: Request, res: Response, next: NextFunction) {
    console.log("Reset password service");
    const { email } = req.body;
    try{
        const {message , success} = await this.interactor.resetPasswordInteractor(email);
        if(!success) return res.status(401).json({message  , success});
        return res.status(201).json({message : "Reset Link sent to your email" , success});
    } catch (error) {
      console.error(" OOps ! error during resetpassword service:", error);
      res.status(500).send("Internal server error");
    }
  }
  async resetPasswordPut(req: Request, res: Response, next: NextFunction) {
    console.log("Reset Password service....");
    const { credentials } = req.body;
    try {
      const {id} = req.params
      const userId = id.split(':');
      console.log(userId[1])
      const { message, status } = await this.interactor.resetPasswordChangeInteractor(userId[1],credentials.password);
      if (!status) return res.status(401).json({ message, status });
      return res.status(201).json({ message, status });
    } catch (error) {
      console.log(" OOps ! error during resend otp service:", error);
      res.status(500).send("Internal server error");
    }
  }

  async Logout(req: Request, res: Response, next: NextFunction) {
    console.log("Logout user");
    try {
       res.cookie("Uauth_token","",{
        expires: new Date(0),
       })
       res.send()
    } catch (error) {
      console.error(" OOps ! error during resend otp service:", error);
      res.status(500).send("Internal server error");
    }
  }
}
