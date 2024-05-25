// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";

const RestaurantMangement: React.FC = () => {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {  
    axios
      .get("http://localhost:3000/admin/restaurants-approval-lists")
      .then((res) => {
        setRestaurant(res.data.restaurants);
      })
      .catch((err) => {
        console.log(err);
      }); 
  }, [restaurant]);

   

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl font-bold">Restaurant  Mangement</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th className="text-left p-3 px-5">Phone</th>
              <th className="text-left p-3 px-5 flex justify-end">Status</th>
              <th></th>
            </tr>
            {restaurant && restaurant.length > 0 ? (

              restaurant.map((restaurant: any) => {
                return (
                  <tr className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={restaurant.username}
                        className="bg-transparent border-none focus:outline-none"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        className="bg-transparent border-none focus:outline-none"
                        value={restaurant.email}
                      />
                    </td>

                    <td className="p-3 px-5">
                      <select value="user.role" className="bg-transparent">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-3 px-6">nill</td>
                    <td className="p-3 px-5 flex justify-end">
                    
                    </td>
                  </tr>
                );
              })):(
                <tr className="border-b hover:bg-red-400 bg-gray-100">
                <td colSpan={5} className="p-3 text-center text-black font-bold text-2xl">
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
