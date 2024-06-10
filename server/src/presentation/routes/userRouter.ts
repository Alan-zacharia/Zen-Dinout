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
],userExists, controller.Register.bind(controller));


userRouter.post('/login',[check("email","Email is required").isEmail(),
    check("password","Password with 8 or more charaters required").isLength({ min : 8}),
    check("role","Role is required").isString()
    ], controller.Login.bind(controller));
    
userRouter.post('/logout',controller.Logout.bind(controller));
userRouter.post('/generate-otp',userExists,controller.GenerateOtp.bind(controller));

/** Put Methods  */
userRouter.post('/reset-password',controller.reset_password.bind(controller))
userRouter.put('/reset-password/:id',controller.resetPasswordPut.bind(controller))




userRouter.post('/otp', controller.OtpVerify.bind(controller));
userRouter.post('/resend-otp', controller.ResendOtp.bind(controller));





userRouter.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
   res.status(200).send({userId : req.userId})
})




export default userRouter;

