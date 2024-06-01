import { UserType } from "../../entities/User";




export interface IUserRepository {
    findByCredentials(email : string , password : string) : Promise <{user : UserType | null , message : string , token : string | null }>
    create(user: UserType): Promise<{ user: UserType | null, message : string; token : string}>;
    OtpCheking(otp: string , userId : string): Promise<{ message : string , status : boolean}>;
    resend(userId : string): Promise<{ message : string , status : boolean}>;
}