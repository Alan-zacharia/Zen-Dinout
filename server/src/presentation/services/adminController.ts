import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../../domain/interface/use-cases/IUserInteractor";
import { IAdminInteractor } from "../../domain/interface/use-cases/IAdminInteractor";



export class adminController {
    constructor(private readonly interactor : IAdminInteractor) {};

    async loginAdmin(req:Request , res : Response , next : NextFunction){
        try{
            console.log(req.body)
            const {admin , message , token} = await this.interactor.adminLogin(req.body);
            
        }catch(error){

        }
    };
    async getUsers(req:Request , res : Response , next : NextFunction){
        try{

            const {message,users} = await this.interactor.getUsers();
        }catch(error){

        }
    };
    async getRestaurants(req:Request , res : Response , next : NextFunction){
        try{

            const {message,restaurants} = await this.interactor.getResataurants();
        }catch(error){

        }
    };
}