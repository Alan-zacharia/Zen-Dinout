import React from "react";

const RestaurantReview: React.FC = () => {
  return (
    <div className="mx-16 max-h-auto w-[1200px] bg-white shadow-xl rounded-lg flex mb-10 flex-col ">
      <div className="p-5">
        <h4 className="text-xl font-bold pb-5 ">Reviews</h4>
        <div className="flex flex-col gap-1">
          {[1, 2, 3, 4, 5].map((data, index) => {
            return (
              <div className="max-h-auto max-w-auto p-2 border-b border-b-gray-300" key={index}>
                <p className="text-base font-bold text-gray-700">Vargheese</p>
                <span>++++++</span>
                <p>COuld be better </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laborum, eum.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantReview;
