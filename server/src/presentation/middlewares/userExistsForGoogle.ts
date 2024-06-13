import { NextFunction, Request, Response } from "express";
import UserModel from "../../infrastructure/database/model.ts/userModel";
import { jwtGenerateToken } from "../../functions/auth/jwtTokenFunctions";

/**
 * Checking user already existed
 * @param email - email for checking
 * @returns if exist return exist message otherwise next()
 */
export const userExistGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
        console.log(user + "Middleware");
        const token =  jwtGenerateToken(user._id as string);
        res.cookie('Uauth_token',token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            maxAge : 86400000
          });
          return res.status(201).json({message : "Successfull.."});
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Internal server error", token: null });
    console.log("Oops Error in userExists middleware ", error);
  }
};
