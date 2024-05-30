import React, { useState } from "react";
import Img from '../../assets/Login-image.jpg'

const Card = () => {
  const [first, setfirst] = useState([]);

  return (
    <>
      {[1, 2, 3, 4, 5, 6].map(() => {
        return (
            <div className="flex cursor-pointer mb-5 rounded-xl bg-white w-full h-full md:w-1/2 lg:w-[400px] xl:w-[450px] shadow-lg shadow-gray-400 transform transition duration-200 hover:-translate-y-2 ease-in ">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-sm overflow-hidden ">
                <img src={Img} alt="image" className="lg:h-44 md:h-48  w-[460px]  rounded-t-lg object-cover object-center" />
                <div className="p-6">
                    <h1 className="text-2xl font-semibold mb-3">Restaurant Name</h1>
                    <p className="leading-relaxed mb-3">Address:</p>
                    <div className="flex items-center flex-wrap">
                        <a href="">Read more</a>
                    </div>
                </div>
            </div>
        </div>
        );
      })}
    </>
  );
};

export default Card;
