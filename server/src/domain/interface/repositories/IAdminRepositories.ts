import { UserType } from "../../entities/User";



export interface IAdminRepositories{
    loginAdminRepo(credentials : {email : string , password : string}):Promise<{admin : UserType | null , message : string }>
    getUsersList():Promise<{users : object | null , message : string}>
    userBlockUnblock(id : string , block : string):Promise<{users : object | null , message : string}>
    getRestaurantsList():Promise<{restaurants : object | null , message : string}>
    approve():Promise<{restaurants : object | null , message : string}>
    getapprovalRestaurant(restaurantId : string):Promise<{restaurants : object | null , message : string}>
    confrimRestaurant(restaurantId : string):Promise<{success : boolean ; message : string}>
}