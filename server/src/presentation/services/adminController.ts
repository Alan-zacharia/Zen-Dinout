import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { IAdminInteractor } from "../../domain/interface/use-cases/IAdminInteractor";

export class adminController {
  constructor(private readonly interactor: IAdminInteractor) {}

  /**
   * Login verification service
   * @param credentials - Object containing email and password for login
   * @returns Object containing admin data, message, token
   */
  async loginAdmin(req: Request, res: Response, next: NextFunction) {
    console.log("Admin login service");
    try {
       const {email , password} = req.body;
      const { admin, message, token } = await this.interactor.adminLogin(
        {email , password}
      );
      if(!admin){
        return res.status(401).json({message: message});
      }
      return res.status(201).json({message , token});
    } catch (error) {
      console.error(" OOps ! error during  admin login service:", error);
      res.status(500).send("Internal server error");
    }
  }

  /**
   * get users list service
   * @returns Object containing users data, message
   */
  async getUsers(req: Request, res: Response, next: NextFunction) {
    console.log("Get User service");
    try {
      const { message, users } = await this.interactor.getUsers();
      return { message, users };
    } catch (error) {
      console.error(" OOps ! error during  admin get user service:", error);
      res.status(500).send("Internal server error");
    }
  }

  /**
   * get restaurants list service
   * @returns Object containing restaurants is approved data, message
   */
  async getRestaurants(req: Request, res: Response, next: NextFunction) {
    console.log("Get restaurants service");
    try {
      const { message, restaurants } = await this.interactor.getResataurants();
      return { message, restaurants };
    } catch (error) {
      console.error(
        " OOps ! error during  admin get restaurant service:",
        error
      );
      res.status(500).send("Internal server error");
    }
  }
  /**
   * get restaurants list service
   * @returns Object containing restaurants data, message
   */
  async approveRestaurant(req: Request, res: Response, next: NextFunction) {
    console.log("Get restaurants service");
    try {
      const { message, restaurants } = await this.interactor.restaurantApprove();
      return { message, restaurants };
    } catch (error) {
      console.error(
        " OOps ! error during  admin get restaurant service:",
        error
      );
      res.status(500).send("Internal server error");
    }
  }

}
