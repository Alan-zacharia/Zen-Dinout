import { UserType } from "../../entities/User";
import { RestaurantType } from "../../entities/restaurants";




export interface IUserRepository {
    findByCredentials(email : string , password : string) : Promise <{user : UserType | null , message : string , token : string | null }>
    userCreate(user: UserType): Promise<{ user: UserType | null, message : string;}>;
    resetPassword(email : string):Promise<{message : string ; success : boolean}>
    resetPasswordConfirm(id:string , password:string) : Promise<{message : string ; status: boolean}>;
    generateOtp(email : string) : Promise<{message : string ; otp : number}>;
    getListedRestaurants() : Promise<{listedRestaurants : RestaurantType[]}>
    googleCredentialsCreate(credentials : {email : string , sub :  string , given_name : string}):Promise<{message : string , user : UserType , token : string}>;
}