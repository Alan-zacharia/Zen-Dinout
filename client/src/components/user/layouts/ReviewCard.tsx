import React from "react";
interface propsPassers {
  name: string;
  image: string;
}
const ReviewCard: React.FC<propsPassers> = (props) => {
  return (
    <div className="w-full md:w-3/4  bg-white border-2 border-gray-300 md:border-none p-5 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div>
        <p className="text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          impedit exercitationem similique ea minima optio qui placeat, modi
          doloribus sint accusamus. Aperiam quasi fugit, sapiente excepturi
          officia vel voluptas at eius commodi nobis ut rerum! Voluptates
          assumenda dolore facere rerum?
        </p>
      </div>
      <div className="flex flex-row justify-center items-center mt-4 gap-4">
        <img className="rounded-full w-1/4" src={props.image} alt="img" />
        <h1 className="font-semibold ">{props.name}</h1>
      </div>
    </div>
  );
};

export default ReviewCard;
