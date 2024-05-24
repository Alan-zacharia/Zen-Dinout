import { UserType } from "../../entities/User";
import { restaurantTypes } from "../../entities/restaurants";



export interface IAdminInteractor {
    adminLogin(credentials : {email : string , password:string}):Promise<{message : string , token : string | null , admin : UserType | null}>,
    getUsers():Promise<{users : UserType | null , message : string}>, 
    getResataurants():Promise<{restaurants : restaurantTypes | null , message : string}>,
}