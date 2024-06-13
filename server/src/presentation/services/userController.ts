import { Response, Request, NextFunction } from "express";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { UserType } from "../../domain/entities/User";
import { validationResult } from "express-validator";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import restaurantModel from "../../infrastructure/database/model.ts/restaurantModel";
import { setAuthTokenCookie } from "../../functions/auth/cookieFunctions";
import logger from "../../infrastructure/lib/Wintson";

export class userController {
  constructor(private readonly interactor: IUserInteractor) {};
  
  /**
  * User Login service
  * @param credentials - Object containing email and password for login
  * @method - POST METHOD
  * @returns Object containing user data, message, token, and refreshToken
  */
  async userLogin(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    console.log("User Login Service..........");
    try {
        const { email, password, role } = req.body;
        const { user, token, message, refreshToken } =
        await this.interactor.userLoginInteractor({ email, password, role });
        if (!user) {
        logger.info("User Login failed......");
        return res.status(401).json({ message : "Failed to Login user", token: null });
        }
        if(token) setAuthTokenCookie(res,"Uauth_token",token);
        logger.info("User Login successfull....");
        return res.status(200).json({ message, user, token });
    } catch (error) {
        logger.error(` OOps ! error during register: ${(error as Error).message}`);
        return res.status(500).send("Internal server error");
    }
  };

  /**
  * User Registeration service
  * @param credentials - Object containing username , email and
  * password  for registeration.
  * @method - POST METHOD
  * @returns Object containing message, token , and refreshToken
  */
  async userRegister(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
    };
    console.log("User Register service..........");
    try {
        let credentials: UserType = req.body;
        const { user, message } = await this.interactor.userRegisterInteractor(credentials);
        if (!user) {
        logger.error("User regestration failed....");
        return res.status(500).json({ message : "Failed to register user" });
        };
        logger.info("User regestration success....");
        return res.status(201).json({ message, user });
    }catch (error) {
        console.error("Oops an error during in register service .........! : ", (error as Error).message);
        return res.status(500).json({message : "Internal server error"});
    };
  };

  /**
  * Genrate otp service
  * @param data - email for otp generation
  * @method - POST METHOD
  * @return  otp to users mail
  */
  async generateOtp(req: Request, res: Response, next: NextFunction) {
    console.log("Generate otp service.....");
    try {
        const { email } = req.body;
        const {message , otp } = await this.interactor.generateOtpInteractor(email);
        return res.status(200).json({ otp , message });
    }catch(error) {
        logger.error("Oops an error during in otp service ! :", (error as Error).message);
        return res.status(500).json({message : "Internal server error"});
    }
  }

  /**
  * Get Restaurants service
  * @method - GET METHOD
  * @return  All approved restaurants List
  */
  async getRestaurants(req: Request, res: Response, next: NextFunction) {
    console.log("Get Restaurants service.....");
    try {
        const {listedRestaurants} = await this.interactor.getListedRestaurantsInteractor();
        logger.info("Get restaurants....")
        return res.status(200).json({ restaurant : listedRestaurants, message: "succesfull" });
    } catch (error) {
        logger.error("Oops an error during get restaurants list service:", (error as Error).message);
        return res.status(500).send("Internal server error");
    }
  };

  /**
  * Restaurant Detail service
  * @params - restaurantId 
  * @method - Get METHOD
  * @return  restaurant details
  */
  async restaurantDetails(req: Request, res: Response, next: NextFunction) {
    console.log("Restaurants service.....");
    const { restaurantId } = req.params;
    const _id = restaurantId.split(":");
    try {
        const restaurant = await restaurantModel.findById(_id[1]);
        return res.status(200).json({ restaurant, message: "succesfull" });
    } catch (error) {
        logger.error("Oops an error during in restaurant detail service:", (error as Error).message);
        return res.status(500).json({message  : "Internal server error"});
    }
  };

  /**
  * Reset password service for get email
  * @body   -  User Email address
  * @method - POST METHOD
  * @return  message and success
  */
  async resetPasswordGetUser(req: Request, res: Response, next: NextFunction) {
    console.log("Reset password service.........");
    const { email } = req.body;
    try {
        const { message, success } = await this.interactor.resetPasswordInteractor(email);
        if (!success) return res.status(401).json({ message, success });
        return res.status(200).json({ message: "Reset Link sent to your email", success });
    } catch (error) {
        logger.error("Oops an error during in reset password data getting service:", (error as Error).message);
        return res.status(500).json({message : "Internal server error"});
    }
  };

  /**
  * Reset password Updation service
  * @body   - credential contain password
  * @method - PUT METHOD
  * @return  message and status
  */
  async resetPasswordUpdate(req: Request, res: Response, next: NextFunction) {
    console.log("Reset Password Updation service......");
    const { credentials } = req.body;
    const { id } = req.params;
    const userId = id.split(":");
    try {
        console.log(userId[1]);
        const { message, status } = await this.interactor.resetPasswordChangeInteractor(userId[1],credentials.password);
        if (!status) return res.status(401).json({ message, status });
        return res.status(200).json({ message, status });
    } catch (error) {
        logger.error("Oops an error during in reset password service:", error);
        return res.status(500).json({ message : "Internal server error"});
    }
  }

  /**
  * Google login service
  * @body   - credential contain user data
  * @method - POST METHOD
  * @return   message and status
  */
  async googleLoginService(req: Request, res: Response, next: NextFunction) {
    console.log("Google login user");
    const { credentials } = req.body;
    try {
          console.log(credentials);
          const { user, message, token } =
          await this.interactor.googleLoginInteractor(credentials);
          if (user) {
          setAuthTokenCookie(res , "Uauth_token" , token);
          }
          return res.status(201).json({ message, token });
    } catch (error) {
          logger.error("Oops an error during in google Login service .......!", (error as Error).message);
          return res.status(500).json({message  : "Internal server error"});
    }
  }

  /**
  * Logout service
  * @method - POST METHOD
  * @return 
  */
  async userLogout(req: Request, res: Response, next: NextFunction) {
    console.log("User Logout service........");
    try {
      res.cookie("Uauth_token", "", {
      expires: new Date(0),
      });
      return res.status(200).json({message : "Logout successfull"});
    } catch (error) {
      logger.error("Oops an error during in Logout service ........! :", (error  as Error).message);
      return res.status(500).send("Internal server error");
    }
  }
}
