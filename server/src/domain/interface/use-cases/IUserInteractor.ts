import { UserType } from "../../entities/User";
import { RestaurantType } from "../../entities/restaurants";

export interface IUserInteractor{
    userRegisterInteractor(data:UserType):Promise<{user : UserType | null , message : string }>;
    userLoginInteractor(credentials:{email : string , password : string , role : string}):Promise<{ user: UserType | null, message: string, token: string | null ,refreshToken: string | null}>;
    resetPasswordInteractor(email : string):Promise<{message : string ; success: boolean}>
    resetPasswordChangeInteractor(id:string,password:string):Promise<{message : string ; status : boolean}>;
    generateOtpInteractor(email : string) : Promise<{message : string ; otp : number}>;
    googleLoginInteractor(credentials : {email : string , sub :  string , given_name : string}) : Promise<{message : string ; user : UserType , token : string}>;
    getListedRestaurantsInteractor() : Promise<{listedRestaurants : RestaurantType[]}>;
}