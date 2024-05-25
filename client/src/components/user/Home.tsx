import React from "react";
import LoginButton from "../layouts/Button";
import BackGroundImage from '../../assets/HomeBackground.jpg'
import { localStorageRemoveItem } from "../../utils/localStorageImpl";

const Home: React.FC = () => {
  localStorageRemoveItem("otpSession")
  return (
    <div className="h-[600px] flex flex-row justify-between items-center lg:px-32 px-5 bg-cover bg-no-repeat" style={{backgroundImage: `url(${BackGroundImage})`}}>
      <div className="w-full lg:w-2/4 space-y-5">
        <h1 className="text-white font-semibold text-6xl">ELevate your tables</h1>
        <p className="text-white font-bold ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias
          magnam quia asperiores odit unde aliquam? Nihil minus harum rerum
          totam consectetur hic nobis tempore facere deserunt. Iste accusantium
          consectetur nemo?
        </p>
   
        <div>
          <LoginButton title="Learn more"/> 
        </div>
        
      </div>
    </div>
  );
};

export default Home;
