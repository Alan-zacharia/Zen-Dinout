import {Router} from "express";
import { userController } from "../services/userController";
import { userInteractorImpl } from "../../application/usecases/userInteractor";
import { userRepositoryImpl } from "../../infrastructure/repositories/userRepositoryImpl";
import { MailerImpl } from "../../infrastructure/lib/Mailer";
import { loginSchema, registerSchema } from "../../functions/validation";
import validate from "../middlewares/Validate";
import { userExists } from "../middlewares/userExists";

const Mailer = new MailerImpl()
const repository = new userRepositoryImpl()
const interactor = new userInteractorImpl(repository , Mailer)
const controller = new userController(interactor)
const userRouter : Router = Router();


/** Post Methods  */
userRouter.post('/register',validate(registerSchema),userExists, controller.Register.bind(controller));
userRouter.post('/login',validate(loginSchema), controller.Login.bind(controller));



userRouter.get('/login', controller.Login.bind(controller));



export default userRouter;

