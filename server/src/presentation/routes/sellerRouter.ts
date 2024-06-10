import {Router} from "express";
import { sellerController } from "../services/sellerController";
import { sellerInteractor } from "../../application/usecases/sellerInteractor";
import { sellerRepository } from "../../infrastructure/repositories/sellerRepository";
import { sellerVerifyToken } from "../middlewares/sellerAuth";
import seller_Exists from "../middlewares/seller_Exists";
import configuredKeys from "../../configs/config";
import jwt,{ JwtPayload } from "jsonwebtoken";


const repository = new sellerRepository();
const interactor = new sellerInteractor(repository);
const controller = new sellerController(interactor);
const sellerRouter : Router = Router();



/** Post Methods  */
sellerRouter.post('/restaurant-regiseteration',seller_Exists,controller.restaurant_registeration.bind(controller));
sellerRouter.post('/restaurant-login',controller.restaurant_Login.bind(controller));

/** Get Methods  */
sellerRouter.get('/restaurant-details',sellerVerifyToken,controller.restuarnt_Details.bind(controller))
sellerRouter.get('/validate-token',sellerVerifyToken,(req,res)=>{
    res.status(200).send({userId : req.userId})
})



export default sellerRouter;

