import React from "react";
import { localStorageRemoveItem } from "../../utils/localStorageImpl";



const Home: React.FC = () => {
  localStorageRemoveItem("&reset%pas%%")
  return (
    <>
    <div className="h-[150px] pt-8 overflow-y-hidden">
      <div className="items-center flex px-10 xl:px-80 pb-10">
        <h1 className="text-3xl font-sans font-bold">Explore Restaurants</h1>
      </div>
    </div>
   
    </>
  );
};

export default Home;

