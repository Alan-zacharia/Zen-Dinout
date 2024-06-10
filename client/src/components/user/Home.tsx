import React, { useState } from "react";


import Carousel from "../layouts/Carousel";
import Card from "../layouts/Card";
import { localStorageRemoveItem } from "../../utils/localStorageImpl";



const Home: React.FC = () => {
  localStorageRemoveItem("&reset%pas%%")
  return (
    <>
    <div className="h-[500px] pt-8 overflow-y-hidden">
      <div className="mx-auto items-center flex justify-center pb-10">
        <h1 className="text-3xl font-sans font-bold">Explore Restaurants</h1>
      </div>
      <div className="mx-auto text-center w-auto  xl:w-[1250px]  " >
        <Carousel />
      </div>
     
    </div>
   
    </>
  );
};

export default Home;

