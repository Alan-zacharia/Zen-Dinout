import { UserType } from "../../entities/User";




export interface IAdminInteractor {
    adminLogin(credentials : {email : string , password:string}):Promise<{message : string , token : string | null , admin : UserType | null}>,
    getUsers():Promise<{users : UserType | null , message : string}>, 
    getResataurants():Promise<{restaurants : object | null , message : string}>,
    restaurantApprove():Promise<{restaurants : object | null , message : string}>,
}