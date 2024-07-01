import React from "react";
import { Link } from "react-router-dom";
import { RestaurantType } from "../../types/restaurantTypes";
import Img from "../../assets/Screenshot_26-6-2024_155054_www.shutterstock.com.jpeg"
interface CardProps {
  restaurants: RestaurantType[];
}
const Card: React.FC<CardProps> = ({ restaurants }) => {
  return (
    <>
    { restaurants && restaurants.length > 0  ? (
      restaurants.map((details, index: number) => {
        
        return (
          <Link to={`/restaurant-view/${details._id}`} key={index}>
            <div
              key={index}
              className="flex cursor-pointer mb-5 rounded-xl bg-white w-full lg:w-[calc(25% - 18px)] max-w-[300px] shadow-lg shadow-gray-400 transform transition duration-200 hover:-translate-y-2 ease-in"
            >
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-xl overflow-hidden">
                <img
                  src={details.featuredImage}
                  alt="image"
                  className="h-48 md:h-44 lg:h-32 w-[300px] rounded-t-sm object-cover object-center"
                />
                <div className=" p-2">
                  <h1 className="text-base md:text-xl lg:text-base font-bold mb-1">
                    {details.restaurantName}
                  </h1>
                  <p className="text-sm md:text-sm lg:text-sm leading-relaxed mb-1">
                    {details.address}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })
    ) : (
      <div className="flex flex-col m-auto ">
      <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696455.jpg?w=826&t=st=1719397546~exp=1719398146~hmac=2d79e2207a4c81feb36f61a2df25e0150ae9f205e0bbc1d86ea05d171e1c7950" className="h-56 w-56  "></img>
      <p className="font-bold flex justify-center text-xl">No Restuarants found.....</p>
      </div>
    )}
    </>
  );
};

export default Card;
