import { UserType } from "../../domain/entities/User";
import { restaurantTypes } from "../../domain/entities/restaurants";
import { IAdminRepositories } from "../../domain/interface/repositories/IAdminRepositories";

export class adminRepositoryImpl implements IAdminRepositories {

    loginAdminRepo(credentials: { email: string; password: string; }): Promise<{ admin: UserType; message: string; }> {
        throw new Error("Method not implemented.");
    }
    getUsersList(): Promise<{ users: UserType; message: string; }> {
        throw new Error("Method not implemented.");
    }
    getRestaurantsList(): Promise<{ restaurants: restaurantTypes; message: string; }> {
        throw new Error("Method not implemented.");
    }
}