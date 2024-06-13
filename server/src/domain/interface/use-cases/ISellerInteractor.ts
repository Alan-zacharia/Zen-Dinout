import { RestaurantType } from "../../entities/restaurants";



export interface IRestaurantInteractor{
    restaurantRegisteration(credentials : RestaurantType):Promise<{restaurant : object | null , message : string }>;
    reservations():Promise<{restaurant:object | null}>;
    Login(data : Partial<RestaurantType>):Promise<{restaurant : Partial<RestaurantType> | null ; message : string ; token:string | null}>;
    restaurantDetailsUpdateInteractor( credentials : RestaurantType):Promise<{restaurant : Partial<RestaurantType> , message : string }>;
    sellerProfileInteractor(email : string ):Promise<{restaurant: object }>;
    
}