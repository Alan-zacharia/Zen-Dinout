import React from "react";
import BackGroundImage from "../../assets/HomeBackground.jpg";
import LoginButton from "../layouts/Button";
const About: React.FC = () => {
  return (
    <div className="pt-28 pl-2 pb-10  ">
    <h1 className='font-semibold text-4xl text-center lg:pt-16  pb-10'>About</h1>
    <div className=" flex flex-col lg:flex-row justify-center items-center lg:px-72 px-5">
      <img className="w-[300px] h-[220px]" src={BackGroundImage} alt="img" />
      <div className="space-y-4 px-7 lg:pt-0 pt-5">
        <h1 className="font-semibold text-4xl text-center md:text-start">WHy choose us?</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, earum
          saepe! Veritatis dolores earum amet recusandae reiciendis a, officia
          impedit, iure ipsa enim ex eaque, ipsum rerum nam numquam vitae.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          consequuntur ut nesciunt officia delectus minus ratione nihil tempore
          repudiandae facilis?
        </p>
        <div className="flex justify-center lg:justify-start">
            <LoginButton title="Learn more"/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
