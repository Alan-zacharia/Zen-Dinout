import {Request, Response, Router} from "express";
import { userController } from "../services/userController";
import { userInteractorImpl } from "../../application/usecases/userInteractor";
import { userRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";
import { MailerImpl } from "../../infrastructure/lib/Mailer";
import { loginSchema, registerSchema } from "../../functions/validation";
import validate from "../middlewares/Validate";
import { userExists } from "../middlewares/userExists";
import { check } from "express-validator";
import verifyToken from "../middlewares/auth";
import { userExistGoogle } from "../middlewares/userExistsForGoogle";
import { userBlocked } from "../middlewares/userBlocked";

const Mailer = new MailerImpl()
const repository = new userRepositoryImpl()
const interactor = new userInteractorImpl(repository)
const controller = new userController(interactor)
const userRouter : Router = Router();


/** Post Methods  */
userRouter.post('/google-login',userBlocked,userExistGoogle,controller.googleLoginService.bind(controller));

userRouter.post('/register',[
    check("username","Name is required").isString(),
    check("email","Email is required").isEmail(),
    check("password","Password with 8 or more charaters required").isLength({ min : 6}),
],userExists, controller.userRegister.bind(controller));
userRouter.post('/login',userBlocked,[check("email","Email is required").isEmail(),
    check("password","Password with 8 or more charaters required").isLength({ min : 8}),
    check("role","Role is required").isString()
    ], controller.userLogin.bind(controller));
    
 
    
    
    
    /** Put Methods  */
 
    
    
    
    
    
userRouter.get('/restaurant-view/:restaurantId',controller.restaurantDetails.bind(controller));
userRouter.get('/validate-token',verifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId : req.userId})
    })
    
    
userRouter.put('/reset-password/:id',controller.resetPasswordUpdate.bind(controller));
userRouter.post('/reset-password',controller.resetPasswordGetUser.bind(controller))
userRouter.get('/get-restaurants',controller.getRestaurants.bind(controller));
userRouter.post('/generate-otp',userExists,controller.generateOtp.bind(controller));
userRouter.post('/logout',controller.userLogout.bind(controller));

export default userRouter;

