import { UserType } from "../../entities/User";



export interface IUserInteractor{
    register(data:UserType):Promise<{user : UserType | null , message : string}>;
    login(credentials:{email : string , password : string , role : string}):Promise<{ user: UserType | null, message: string, token: string | null ,refreshToken: string | null}>;
}