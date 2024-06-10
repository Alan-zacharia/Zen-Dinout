import {Request, Response, Router} from "express";
import { adminRepositoryImpl } from "../../infrastructure/repositories/adminRepositoryImpl";
import { adminInteractorImpl } from "../../application/usecases/adminInteractor";
import { adminController } from "../services/adminController";
import { adminVerifyToken } from "../middlewares/adminAuth";



const repository = new adminRepositoryImpl();
const interactor = new adminInteractorImpl(repository);
const controller = new adminController(interactor);


const adminRouter : Router = Router();


/** Get Methods  */
adminRouter.get('/users-list',controller.getUsers.bind(controller));
adminRouter.get('/restaurants-list',controller.getRestaurants.bind(controller));
adminRouter.get('/restaurants-approval-lists',controller.approveRestaurant.bind(controller));
adminRouter.get('/restaurant-approval/:id',controller.approval_restaurant.bind(controller));
adminRouter.get('/validate-token',adminVerifyToken,(req:Request,res:Response)=>{res.status(200).send({userId : req.userId})});

/** Post Methods  */
adminRouter.post('/login',controller.loginAdmin.bind(controller));
adminRouter.post('/logout',controller.Logout.bind(controller));



/** Put Methods */
adminRouter.put('/user-actions/:id/:block',controller.userActions.bind(controller));
adminRouter.put('/restaurant-approval/:id',controller.confirmRestaurant_Approval.bind(controller));



export default adminRouter;

