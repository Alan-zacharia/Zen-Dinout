import { RestaurantType } from "../../domain/entities/restaurants";
import { IRestaurantRepository } from "../../domain/interface/repositories/ISellerRepositories";
import { IRestaurantInteractor } from "../../domain/interface/use-cases/ISellerInteractor";
import restaurantModel from "../../infrastructure/database/model.ts/restaurantModel";



export class sellerInteractor implements IRestaurantInteractor{
    constructor( private readonly repository : IRestaurantRepository) {}

    async restaurantRegisteration(credentials: RestaurantType): Promise<{ restaurant: object | null; message: string; }> {
        try{
            console.log(credentials)
            const {message , restaurant} = await this.repository.create(credentials);
            return {message , restaurant}
        }catch(error){
            console.log("Error from the Restaurant registeration Intercator ........." + error)
            throw error
        }
    };
    async Login(data: Partial<RestaurantType>): Promise<{ restaurant: Partial<RestaurantType> | null; message: string; token: string | null; }> {
        console.log("Seller Login interactor .......................")
        try{
            console.log(data)
            const {message , restaurant , token } = await this.repository.findCredentials(data);
            return {message , restaurant , token}
        }catch(error){
            console.log("Error from the Restaurant registeration Intercator ........." + error)
            throw error
        }
    }
;


async sellerProfileInteractor(email:string): Promise<{ restaurant: object; }> {
    try{
          const {restaurant , message} = await this.repository.getProfile(email)
          return {restaurant}
    }catch(error){
        console.log(error);
        throw error;
    }
}
    reservations(): Promise<{ restaurant: object | null; }> {
        throw new Error("Method not implemented.");
    }
    
}