



export interface IRestaurantRepository {
    create(restaurant: object): Promise<{ restaurant : object | null, message : string}>;
    getProfile():Promise<{restaurant : object , message : string}>
}