import { RestaurantType } from "../../domain/entities/restaurants";
import { IRestaurantRepository } from "../../domain/interface/repositories/ISellerRepositories";
import nodemaileMailSeller from "../../functions/MaileGenSeller";
import nodemailerCreateOtp from "../../functions/MailerGenrator";
import { jwtGenerateToken } from "../../functions/auth/jwtTokenFunctions";
import restaurantModel from "../database/model.ts/restaurantModel";
import bcrypt from 'bcryptjs';

export class sellerRepository implements IRestaurantRepository {

  async findCredentials(data: Partial<RestaurantType>): Promise<{ restaurant: Partial<RestaurantType> | null; message: string; token : string | null}> {
    console.log("Seller Respository . . . . . . . . . . . . . .");
    const {email , password } = data
    try{
      const restaurant = await restaurantModel.findOne({ email: email});
      console.log(restaurant , email)
      let token = null, message = '';
      if(!restaurant){
          message = 'User not found';
      }else{
        if(restaurant.isApproved){
          const hashedPassword = await bcrypt.compare(password  as string, restaurant.password);
           if(!hashedPassword){
             console.log('password is not match');
             message = 'Invalid password';
           }else{
            
              token =  jwtGenerateToken(restaurant.email as string);
              console.log(token);
           }
          }else{
            message = 'User Not Found';
          }
      } 
      if(restaurant && !message ){
          return { restaurant : restaurant.toObject() , message :"Login Successfull" , token };
      }
          console.log(message);
          return {restaurant : null , message , token };
    }catch(error){
      console.log("!OOps Error in seller Reposiitory",error);
      throw error;
    }
  }
  async create(
    restaurant: RestaurantType
  ): Promise<{ restaurant: RestaurantType | null; message: string }> {
    try{
        const { restaurantName , email , password , contact } = restaurant;
        const newRestuarnt = new restaurantModel({
            restaurantName , 
            email ,
            contact,
            password
        });
        await newRestuarnt.save();
        if(newRestuarnt){
          nodemaileMailSeller(restaurant.email );
          return {restaurant : newRestuarnt.toObject() , message : "Restaurant registeration successfull."}
        }
        return {restaurant : null , message : "Restaurant registeration successfull."}
    }catch(error){
        console.log("!OOps Error in seller Reposiitory" + error);
        throw error;
    }
  };

  async createRestaurantDetails(
    restaurant: RestaurantType
  ): Promise<{ restaurant: Partial<RestaurantType> ; message: string }> {
    try{
        const { restaurantName , email , contact , address , description , location,
          openingTime , closingTime , TableRate , featuredImage , secondaryImages
         } = restaurant;

         const coordinates : [number , number ] = [
          parseFloat(location.coordinates[0]),
          parseFloat(location.coordinates[1]),
         ]
         console.log(restaurant)
        const restaurantDetails = await restaurantModel.findOneAndUpdate({email},
        {
          restaurantName,
          contact,
          address,
          description,
          location : { type : location.type , coordinates},
          openingTime,
          closingTime,
          TableRate,
          featuredImage,
          secondaryImages
        },{upsert : true , new : true});
        return {restaurant : restaurantDetails.toObject() , message : "Restaurant details updated."}
    }catch(error){
        console.log("!OOps Error in seller Reposiitory" + error);
        throw error;
    }
  };


  async getProfile(email : string): Promise<{ restaurant: any; message: string }> {
    try{
      const restaurant = await restaurantModel.findOne({email});
      console.log(restaurant)
      return { restaurant  , message : ""};
    }catch(error){
      console.log("OOps an error occured in get restaurant profile : ", error);
      throw error;
    }
  }
}
