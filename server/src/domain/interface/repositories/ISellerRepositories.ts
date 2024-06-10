import { RestaurantType } from "../../entities/restaurants";




export interface IRestaurantRepository {
    create(restaurant: RestaurantType): Promise<{ restaurant : RestaurantType | null, message : string}>;
    findCredentials(data : object):Promise<{restaurant : Partial<RestaurantType> | null , message : string ; token : string | null}>
    getProfile(email : string):Promise<{restaurant : any , message : string}>
}