import { RestaurantType } from "../../entities/restaurants";




export interface IRestaurantRepository {
    create(restaurant: RestaurantType): Promise<{ restaurant : RestaurantType | null, message : string}>;
    findCredentials(data : object):Promise<{restaurant : Partial<RestaurantType> | null , message : string ; token : string | null}>
    createRestaurantDetails(restaurant: RestaurantType): Promise<{ restaurant : Partial<RestaurantType> , message : string}>;
    getProfile(email : string):Promise<{restaurant : any , message : string}>
}