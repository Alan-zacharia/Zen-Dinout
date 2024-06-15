import React, { useState } from "react";


import Carousel from "../layouts/Carousel";
import Card from "../layouts/Card";
import { localStorageRemoveItem } from "../../utils/localStorageImpl";



const Home: React.FC = () => {
  localStorageRemoveItem("&reset%pas%%")
  return (
    <>
    <div className="h-[300px] pt-8 overflow-y-hidden">
      <div className="mx-auto items-center flex justify-center pb-10">
        <h1 className="text-3xl font-sans font-bold">Explore Restaurants</h1>
      </div>
    </div>
   
    </>
  );
};

export default Home;

