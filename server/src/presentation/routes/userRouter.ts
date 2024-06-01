import {Request, Response, Router} from "express";
import { userController } from "../services/userController";
import { userInteractorImpl } from "../../application/usecases/userInteractor";
import { userRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";
import { MailerImpl } from "../../infrastructure/lib/Mailer";
import { loginSchema, registerSchema } from "../../functions/validation";
import validate from "../middlewares/Validate";
import { userExists } from "../middlewares/userExists";
import { otpGenerator } from "../../functions/OtpSetup";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import { check } from "express-validator";
import verifyToken from "../middlewares/auth";

const Mailer = new MailerImpl()
const repository = new userRepositoryImpl()
const interactor = new userInteractorImpl(repository , Mailer)
const controller = new userController(interactor)
const userRouter : Router = Router();


/** Post Methods  */
userRouter.post('/register',[
    check("username","Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 8 or more charaters required").isLength({ min : 6}),
    check("role","role is required").isString(),
],userExists, controller.Register.bind(controller));


userRouter.post('/login',[check("email","Email is required").isEmail(),
    check("password","Password with 8 or more charaters required").isLength({ min : 8}),
    check("role","Role is required").isString()
], controller.Login.bind(controller));





userRouter.post('/otp', controller.OtpVerify.bind(controller));
userRouter.post('/resend-otp', controller.ResendOtp.bind(controller));
userRouter.post('/send-otp',(req,res)=>{
    console.log(req.body)
    const {email} = req.body
    const otp = otpGenerator.generateOtp();
    nodemailerCreateOtp(email as string, otp);
    return res.status(200).json({otp});
});


userRouter.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
   res.status(200).send({userId : req.userId})
})

userRouter.post('/logout',controller.Logout.bind(controller));



export default userRouter;

