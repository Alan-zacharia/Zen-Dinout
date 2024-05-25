


export interface IRestaurantInteractor{
    restaurantRegisteration(credentials : object):Promise<{restaurant : object | null , message : string }>;
    reservations():Promise<{restaurant:object | null}>;
    sellerProfile():Promise<{restaurant: object }>;
}