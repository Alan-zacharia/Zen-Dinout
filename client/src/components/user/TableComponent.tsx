import React from "react";
import TableCards from "./layouts/TableCards";
import Image from "../../assets/Login-image.jpg";
const TablesComponents: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <h1 className="text-4xl font-semibold text-center pt-24 pb-10">
        Restaurants
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        <TableCards title="hhhhh" image={Image} price="100" />
        <TableCards title="hhhhh" image={Image} price="100" />
        <TableCards title="hhhhh" image={Image} price="100" />
        <TableCards title="hhhhh" image={Image} price="100" />
        <TableCards title="hhhhh" image={Image} price="100" />
        <TableCards title="hhhhh" image={Image} price="100" />
      </div>
    </div>
  );
};

export default TablesComponents;
