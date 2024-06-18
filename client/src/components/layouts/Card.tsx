import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
interface RestaurantType {
  _id : string;
  email : string ;
  contact : string ;
  restaurantName : string;
  address : string;
  location : {
    types : string;
    coordinates:[string,string]
  };
  description : string;
  closingTime:string;
  openingTime : string;
  TableRate:string;
  secondaryImages:string;
  featuredImage:string;
}
interface CardProps {
  restaurants: RestaurantType[];
}
const Card : React.FC<CardProps> = ({restaurants}) => {
 

  return (
    <>
      {restaurants.map((details , index : number) => {
        return (
          <Link to={`/restaurant-view/:${details._id}`} key={index}>
          <div key={index} className="flex cursor-pointer mb-5 rounded-sm bg-white w-full lg:w-[calc(25% - 18px)] max-w-[300px] shadow-lg shadow-gray-400 transform transition duration-200 hover:-translate-y-2 ease-in">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-sm overflow-hidden">
              <img
                src={details.featuredImage}
                alt="image"
                className="h-48 md:h-44 lg:h-32 w-[300px] rounded-t-sm object-cover object-center"
              />
              <div className="p-1">
                <h1 className="text-base md:text-xl lg:text-base font-bold mb-3">
                {details.restaurantName}
                </h1>
                <p className="text-sm md:text-sm lg:text-sm leading-relaxed mb-3">
                  {details.address}
                </p>
                
              </div>
            </div>
          </div>
          </Link>
        );
      })}
    </>
  );
};

export default Card;
