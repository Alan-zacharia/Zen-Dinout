import React, { useState } from 'react';
import HomeBackGroundImg from '../../../assets/HomeBackground.jpg';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from '../../layouts/Button';


interface HeroProps {
  handleSearch: (query: string) => void;
}
const Hero : React.FC<HeroProps> = ({ handleSearch }) => {
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const searchItem = e.target.value;
    handleSearch(searchItem);
  };

  return (
    <div className='mx-auto '>
      <div className='max-h-[500px] relative'>
        <div className='absolute w-full h-full text-gray-200 max-h-[500px] flex flex-col justify-center p-4 sm:p-10 lg:p-20 xl:p-40'>
          <h1 className='text-xl  sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  xl:px-40'>
            Book Table
            at  Your<span className='text-blue-500'> Favourite Restaurants </span>
          </h1>
          <h1 className='text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-thin xl:px-40'>
            and get served instantly
          </h1>
          <div className='p-5 pt-6'>
          </div>
          <div className="bg-white  flex items-center px-2 xl:mx-40 mx-5  w-[300px] sm:w-[400px] lg:w-[400px] xl:w-[1000px]  rounded-xl">
            <AiOutlineSearch className='text-black' size={30} />
            <input
              type="text"
              placeholder="Search for Restaurants....."
              name='search'
              className="bg-transparent text-sm p-4 focus:outline-none w-full text-black placeholder-black" 
              onChange={handleChange}
            />
            <Button title='Search' classN=' bg-red-500 border-none h-10 w-28 hover:text-black hover:bg-red-600 text-white rounded-none rounded-xl hover:bg-red-600 ' />
          </div>
        </div>
        <img src={HomeBackGroundImg} alt="img" className='w-full max-h-[400px] object-cover ' />
      </div>
    </div>
  );
};

export default Hero;
