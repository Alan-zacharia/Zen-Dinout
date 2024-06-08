// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const RestaurantMangement: React.FC = () => {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {  
    const fetchData = async () => {
    
    await axios.get("http://localhost:3000/admin/restaurants-approval-lists").then((response)=>{
      setRestaurant(response.data.restaurants)
    }).catch((error)=>{
      console.log(error); 
    })
    }
    fetchData()
  }, []);

   

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
              <th className="text-left p-3 px-5">Contact</th>
              <th className="text-left p-3 px-5 flex justify-end">Action</th>
              <th></th>
            </tr>
            {restaurant && restaurant.length > 0 ? (

              restaurant.map((restaurant: any) => {
                return (
                  <tr className="border-b  bg-gray-100  text-orange-500 font-semibold">
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={restaurant.restaurantName}
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

                    
                    <td className="p-3 px-6"><input
                        type="text"
                        className="bg-transparent border-none focus:outline-none"
                        value={restaurant.contact}
                      /></td>
                    <td className="p-3 px-5 flex justify-end">
                      <Link to={`/restaurant/approval-restaurant:${restaurant._id}`}><button className="p-2 bg-green-500 text-white rounded-xl px-4 hover:bg-green-400">Veiw</button></Link>
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
