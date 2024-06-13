import { NextFunction, Request, Response } from "express";
import configuredKeys from "../../configs/config";
import jwt,{ JwtPayload } from "jsonwebtoken";
import UserModel from "../../infrastructure/database/model.ts/userModel";


declare global {
    namespace Express{
        interface Request {
            userId : string
        }
    }
};

const verifyToken = async(req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["Uauth_token"];
    if(!token){
        return res.status(401).json({message : "unautharized"});
    }
    try{
        const decodes = jwt.verify( token , configuredKeys.JWT_SECRET_KEY as string );
        req.userId = (decodes as JwtPayload).userId;
        console.log(req.userId)
        const user = await UserModel.findById(req.userId);
        console.log(user);
        if(user && user.isBlocked){
            return res.status(401).json({message : "User Blocked"});
        }
        next();
    }catch(error){
        return res.status(401).json({message : "unautharized"});
    }
};


export default verifyToken;