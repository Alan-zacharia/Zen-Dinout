import { NextFunction, Request, Response } from "express";
import { IRestaurantInteractor } from "../../domain/interface/use-cases/ISellerInteractor";




export class sellerController {
    constructor(private readonly interactor : IRestaurantInteractor){}

    async restaurant_registeration(req : Request , res : Response , next : NextFunction ){
        const {credentials} = req.body;
        console.log(req.body)
        try{
             const {message , restaurant } = await this.interactor.restaurantRegisteration(credentials);
             if(!restaurant){
                return res.status(401).json({message : "Restaurant Registeration Failed"})
             }
             return res.status(201).json({message : 'hjhjhjh'});

        }catch(error){
            console.log("!OOPS error in restaurant_registeration service !",error);
            res.status(500).send({message : "Internal server error"})
        }
    }
    async restaurant_Login(req : Request , res : Response , next : NextFunction ){
        console.log('restaurant_Login....')
        try {
          const { email, password } = req.body;
          const { restaurant, token, message } =
            await this.interactor.Login({ email, password });
          if (!restaurant) {
            return res.status(401).json({ message, token: null });
          }
            res.cookie('seller_auth',token, {
              httpOnly : true,
              secure : process.env.NODE_ENV === "production",
              maxAge : 86400000
            });
          
          return res.status(200).json({ message, restaurant, token });
        } catch (error) {
          console.error("OOps ! error during seller register:", error);
          res.status(500).send("Internal server error");
        }
    }
    async restuarnt_Details(req : Request , res : Response , next : NextFunction ){
      console.log("Seller profile ....")
      const email = req.userId;
       try{
         const { restaurant } = await this.interactor.sellerProfileInteractor(email);
         return res.status(201).json({restaurantDetails : restaurant});
       }catch(error){
        console.log("OOps ! error during register:" , error);
        res.status(500).send("Internal server error");
       }
    }
}