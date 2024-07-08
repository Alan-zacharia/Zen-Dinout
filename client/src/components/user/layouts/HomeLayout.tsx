import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, updateSearchQuery, filterRestaurants } from '../../../redux/restaurant/restaurantSearchSlice';
import Home from "../Home";
import Card from "../../layouts/Card";
import Hero from "./Hero";
import { RootState , useAppDispatch } from '../../../redux/store';
import SectionHomeDetails from './SectionHomeDetails';


const HomeLayout = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useSelector((state : RootState) => state.restaurant.searchQuery);
  const restaurants = useSelector((state :  RootState) => state.restaurant.restaurants);
  const filteredRestaurants = useSelector((state :  RootState) => state.restaurant.filteredRestaurants);

  useEffect(() => {
       dispatch(fetchRestaurants()); 
  }, []);

  const handleSearch = (query: string) => {
    dispatch(updateSearchQuery(query));
  };

  useEffect(() => {
    dispatch(filterRestaurants());
  }, [searchQuery, restaurants]);

  return (
    <>
      <Hero handleSearch={handleSearch}  />
      <Home />
      <div className="flex flex-wrap lg:justify-normal lg:ml-20 mb-20 justify-center sm:px-20  xl:px-60 gap-5 lg:gap-5 ">
        <Card restaurants={filteredRestaurants} />
      </div>
      <div className=" hidden  lg:flex lg:flex-col lg:h-[300px]">
       <SectionHomeDetails/>
      </div>
    </>
  );
};

export default HomeLayout;