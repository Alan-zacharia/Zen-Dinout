import { UserType } from "../../domain/entities/User";
import { restaurantTypes } from "../../domain/entities/restaurants";
import { IAdminRepositories } from "../../domain/interface/repositories/IAdminRepositories";
import { IAdminInteractor } from "../../domain/interface/use-cases/IAdminInteractor";





export class adminInteractorImpl implements IAdminInteractor  {
    constructor(private readonly repository : IAdminRepositories){};
    
    adminLogin(credentials: { email: string; password: string; }): Promise<{ message: string; token: string | null; admin: UserType | null; }> {
        throw new Error("Method not implemented.");
    }
    getUsers(): Promise<{ users: UserType | null; message: string; }> {
        throw new Error("Method not implemented.");
    }
    getResataurants(): Promise<{ restaurants: restaurantTypes | null; message: string; }> {
        throw new Error("Method not implemented.");
    }
}