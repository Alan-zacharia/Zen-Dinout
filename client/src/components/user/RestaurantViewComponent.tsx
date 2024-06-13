import React, { useEffect, useState } from "react";
import GoogleMap from "../GoogleMap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdTimer } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface RestaurantType {
  email: string;
  contact: string;
  restaurantName: string;
  address: string;
  location: {
    types: string;
    coordinates: [number, number];
  };
  description: string;
  closingTime: string;
  openingTime: string;
  TableRate: string;
  secondaryImages: string;
  featuredImage: string;
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const RestaurantViewComponent = () => {
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantType>();
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/restaurant-view/${restaurantId}`
        );
        setRestaurantDetails(response.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [restaurantId]);

  return (
    <div className="m-16 mt-36 h-[750px] w-full flex gap-3">
      {restaurantDetails && (
        <>
          <div className="h-full w-3/4 bg-white shadow-2xl shadow-neutral-400 rounded-xl">
            <div className="w-full h-[400px] flex ">
              <div className="bg-white w-[700px] h-[400px] border border-gray-200 ">
                <Slider {...settings}>
                  <img
                    src={restaurantDetails.featuredImage}
                    alt=""
                    className="w-[700px] h-[400px]"
                  />
                  {restaurantDetails.secondaryImages && (
                    <div className="bg-white">
                      <img
                        src={restaurantDetails.secondaryImages}
                        alt=""
                        className="w-full h-[400px]"
                      />
                    </div>   
                  )}

                </Slider>
                <p className="pt-8 pl-10 text-base font-bold pb-2">Menu</p>
                <div className="flex pl-8 ">
                  <a
                    href="#"
                    className="p-3 py-10 bg-local bg-gray-500 bg-center bg-no-repeat bg-cover rounded-lg bg-blend-multiply  hover:bg-blend-darken"
                    style={{
                      backgroundImage:
                        "url(https://im1.dineout.co.in/images/uploads/restaurant/sharpen/2/h/g/m23709-15549843245caf2d8465312.jpg?tr=tr:n-xlarge)",
                    }}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center px-2 py-1.5 text-xs font-medium text-center text-orange rounded-lg text-white  hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-700"
                    >
                      menu
                    </button>
                  </a>
                </div>

                <p className=" font-medium text-neutral-800 p-10">
                  Villagio restaurant is the one and only serving the best
                  cuisines
                </p>
              </div>

              <div className="flex px-5 pt-5 flex-col gap-5 border w-[500px] border-gray-200">
                <h1 className="text-4xl text-black font-bold">
                  {restaurantDetails.restaurantName}
                </h1>
                <p className=" font-medium text-neutral-800 flex gap-3">
                  <FaLocationDot size={20} />
                  {restaurantDetails.address}
                </p>
                <div className="font-medium text-neutral-800 items-center flex gap-2">
                  <IoMdTimer size={20} />
                  <span>{restaurantDetails.openingTime} AM</span> -{" "}
                  <span>{restaurantDetails.closingTime} PM</span>
                </div>
                <div className="flex items-center">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    4.5 out of 5
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-1/3 bg-white rounded-xl shadow-2xl shadow-neutral-400">
            <div className="w-[500px] p-5 flex flex-col">
              <h1 className="text-2xl font-bold pb-5">Here to find location</h1>

              <GoogleMap
                latitude={restaurantDetails.location.coordinates[1]}
                longitude={restaurantDetails.location.coordinates[0]}
              />

              <div className="flex flex-col justify-center pt-10">
                <p className="text-blue-500 font-semibold underline">
                  Get Direction
                </p>
                <p className="text-blue-500 font-semibold underline">
                  Contact : 66782618260
                </p>
                <p className="text-blue-500 font-semibold underline">
                  Email : ZenDinout@gmail.com
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantViewComponent;
