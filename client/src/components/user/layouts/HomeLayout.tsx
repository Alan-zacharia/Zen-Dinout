import React from "react";
import Home from "../Home";
import Card from "../../layouts/Card";
import Hero from "./Hero";

const HomeLayout = () => {
  return (
    <>
      <Hero />
      <Home />
      <div className="flex flex-wrap lg:justify-normal lg:ml-20 mb-20 justify-center gap-5 lg:gap-5">
        <Card />
      </div>
    </>
  );
};

export default HomeLayout;
