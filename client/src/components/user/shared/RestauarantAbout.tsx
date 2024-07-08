import React from "react";
import { RestaurantType } from "../../../types/restaurantTypes";
interface RestauarantAboutProps{
  restaurantDetails : RestaurantType | undefined;
}

const RestauarantAbout : React.FC<RestauarantAboutProps> = ({restaurantDetails}) => {
  return (
    
    <div className="max-h-auto mx-16 w-[1200px] rounded-lg bg-white shadow-lg">
    {restaurantDetails && (
      <>
      <h5 className="p-5 text-lg font-bold text-black">About</h5>
      <div className="px-5 pb-4">
      
      <p className="text-sm font-bold text-gray-700">Cuisine</p>
      <span className="text-xs font-semibold text-gray600">North Indian , Chineese ,Kerala</span>
      
      <p className="text-sm font-bold text-gray-700">Type</p>
      <span className="text-xs font-semibold text-gray-600">Fine DIning , Dinout pay</span>
      <p className="text-sm font-bold text-gray-700">Average Cost</p>
      <span className="text-xs font-semibold text-gray-600"><span className="font-extrabold">{parseInt(restaurantDetails?.TableRate)*2}</span> for two  people</span>
      <p className="text-sm font-bold text-gray-700">Facilities and Features</p>
      <span className="text-xs font-semibold text-gray-600">399 for two people</span>
      </div>
      </>
    )}
      </div>
  );
};

export default RestauarantAbout;
