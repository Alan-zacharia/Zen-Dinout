import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const RestaurantMangement: React.FC = () => {
  const [restaurants, setRestaurant] = useState([]);
  const [searchItem , setSearchItem] = useState('');
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/restaurants-list")
      .then((res) => {
        setRestaurant(res.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSearchInput = (e : React.ChangeEvent<HTMLInputElement>)=>{
     const searchTerm = e.target.value;
     setSearchItem(searchTerm);
  }

  const filteredItems = restaurants.filter((data : any)=>{
      const { restaurantName , email , contact } = data;
      const searchTerm = searchItem.toLowerCase()
      return (
        restaurantName.toLowerCase().includes(searchTerm) ||
        email.toLowerCase().includes(searchTerm) ||
        contact.includes(searchTerm)
      )
  });

  return (
    <div className="text-gray-900 bg-gray-200 ">
      <div className="p-4 flex w-full justify-between">
        <h1 className="text-3xl font-bold">Restaurant Management</h1>
        <div className="relative flex-shrink-0 w-52 md:w-auto ">
          <HiOutlineSearch
            fontSize={24}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Search restaurants....."
            className="text-sm focus:outline-none border active:outline-none border-gray-300 h-14 w-[400px] pl-10 pr-4 rounded-sm"
            value={searchItem}
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Phone</th>
              <th className="text-left p-3 px-5 flex justify-end">Status</th>
              <th></th>
            </tr>
            {filteredItems.length > 0 ? (
              filteredItems.map((restaurant: any) => {
                return (
                  <tr
                    className="border-b text-orange-500 font-bold bg-gray-100"
                    key={restaurant._id}
                  >
                    <td className="p-3 px-5">
                    <input
                        type="text"
                        className="bg-transparent border-none focus:outline-none  font-medium "
                        value={restaurant.restaurantName}
                        readOnly
                      />
                    </td>
                    <td className="p-3 px-5">
                    <input
                        type="text"
                        className="bg-transparent border-none focus:outline-none  font-medium "
                        value={restaurant.email}
                        readOnly
                      />
                    </td>

                    <td className="p-3 px-6">{restaurant.contact}</td>
                    <td className="p-3 px-5 flex justify-end">
                      <button className="p-1 rounded-2xl px-5 bg-green-500 text-white">
                        block
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="border-b hover:bg-red-400 bg-gray-100">
                <td
                  colSpan={5}
                  className="p-3 text-center text-black font-bold text-2xl"
                >
                  Restaurants not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestaurantMangement;
