import {Request, Response, Router} from "express";
import { adminRepositoryImpl } from "../../infrastructure/repositories/adminRepositoryImpl";
import { adminInteractorImpl } from "../../application/usecases/adminInteractor";
import { adminController } from "../services/adminController";
import { adminVerifyToken } from "../middlewares/adminAuth";



const repository = new adminRepositoryImpl();
const interactor = new adminInteractorImpl(repository);
const controller = new adminController(interactor);


const adminRouter : Router = Router();



/** Post Methods  */
adminRouter.post('/login',controller.loginAdmin.bind(controller));
adminRouter.get('/users-list',controller.getUsers.bind(controller));
adminRouter.get('/restaurants-list',controller.getRestaurants.bind(controller));
adminRouter.get('/restaurants-approval-lists',controller.getRestaurants.bind(controller));


adminRouter.put('/user-actions/:id/:block',controller.userActions.bind(controller));

adminRouter.get('/validate-token',adminVerifyToken,(req:Request,res:Response)=>{
    res.status(200).send({userId : req.userId})
 });
adminRouter.post('/logout',controller.Logout.bind(controller));

export default adminRouter;

