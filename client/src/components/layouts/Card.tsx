import React, { useState } from "react";
import Img from "../../assets/Login-image.jpg";

const Card = () => {
  const [first, setfirst] = useState([]);

  return (
    <>
      {[1, 2, 3, 4, 5].map((key) => {
        return (
          <div key={key} className="flex cursor-pointer mb-5 rounded-sm bg-white w-full lg:w-[calc(25% - 20px)] max-w-[420px] shadow-lg shadow-gray-400 transform transition duration-200 hover:-translate-y-2 ease-in">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-sm overflow-hidden">
              <img
                src={Img}
                alt="image"
                className="h-48 md:h-44 lg:h-44 w-[420px] rounded-t-sm object-cover object-center"
              />
              <div className="p-2">
                <h1 className="text-xl md:text-xl lg:text-xl font-semibold mb-3">
                  Restaurant Name
                </h1>
                <p className="text-sm md:text-base lg:text-base leading-relaxed mb-3">
                  Address:
                </p>
                <div className="flex items-center">
                 
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
