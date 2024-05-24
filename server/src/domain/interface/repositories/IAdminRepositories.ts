import { UserType } from "../../entities/User";
import { restaurantTypes } from "../../entities/restaurants";


export interface IAdminRepositories{
    loginAdminRepo(credentials : {email : string , password : string}):Promise<{admin : UserType , message : string }>
    getUsersList():Promise<{users : UserType , message : string}>
    getRestaurantsList():Promise<{restaurants : restaurantTypes , message : string}>
}