import { UserType } from "../../entities/User";



export interface IUserInteractor{
    register(data:UserType):Promise<{user : UserType | null , message : string , token:string}>;
    login(credentials:{email : string , password : string , role : string}):Promise<{ user: UserType | null, message: string, token: string | null ,refreshToken: string | null}>;
    verify(otp:string , userId : string):Promise<{ message : string , status : boolean}>;
    resendOtp(userId : string):Promise<{ message : string , status : boolean}>;
}