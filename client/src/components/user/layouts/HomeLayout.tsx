import React, { useEffect, useState } from "react";
import Home from "../Home";
import Card from "../../layouts/Card";
import Hero from "./Hero";
import axios from "axios";
import Footer from "./Footer";
import SectionHomeDetails from "./SectionHomeDetails";

interface RestaurantType {
  _id: string;
  email: string;
  contact: string;
  restaurantName: string;
  address: string;
  location: {
    types: string;
    coordinates: [string, string];
  };
  description: string;
  closingTime: string;
  openingTime: string;
  TableRate: string;
  secondaryImages: string;
  featuredImage: string;
}

const HomeLayout = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<RestaurantType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-restaurants");
        setRestaurants(response.data.restaurant);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = restaurants.filter((restaurant) => {
      const { restaurantName  } = restaurant;
      const searchTerm = searchQuery.toLowerCase();

      return (
        restaurantName.toLowerCase().includes(searchTerm) 
      );
    });
    setFilteredRestaurants(filtered);
  }, [searchQuery, restaurants]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Hero handleSearch={handleSearch} />
      <Home />
      <div className="flex flex-wrap lg:justify-normal lg:ml-20 mb-20 xl:px-60 gap-5 lg:gap-5">
        <Card restaurants={filteredRestaurants} />
      </div>
      <div className="h-[200px]">
        <SectionHomeDetails/>
      </div>
    </>
  );
};

export default HomeLayout;
