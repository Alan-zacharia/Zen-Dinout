// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosActionsUser, axiosGetUser } from "../../services/adminApiClient";
axios.defaults.withCredentials = true;
const Customer: React.FC = () => {
  const [user, setUser] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { users, message } = await axiosGetUser();
      setUser(users);
    };
    fetchData();
  }, []);

    const blockUser = (id : string , block:boolean) => {
      axiosActionsUser(id,block)
       setUser((prevUser : any)=>
        prevUser.map((user:any)=>
          user._id == id ? {...user , isBlocked : !user.isBlocked} : user
        )
        )
    };

  return (
    <div className="text-gray-900  ">
      <div className="p-4 flex">
        <h1 className="text-3xl font-bold">User Mangement</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b bg-neutral-200 ">
              <th className="text-left p-3 px-5 text-lg">Name</th>
              <th className="text-left p-3 px-5 text-lg">Email</th>
              <th className="text-left p-3 px-5 text-lg">Phone</th>
              <th className="text-left p-3 px-5 flex justify-end text-lg">Status</th>
              <th></th>
            </tr>
            {user && user.length > 0 ? (
              user.map((user: any) => {
                return (
                  <tr className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.username}
                        className="bg-transparent border-none focus:outline-none  text-black  font-bold text-base"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        className="bg-transparent border-none focus:outline-none  font-medium "
                        value={user.email}
                      />
                    </td>

                    <td className="p-3 px-6">nill</td>
                    <td className="p-3 px-5 flex justify-end">
                      {user.isBlocked ? (
                        <button onClick={()=>blockUser(user._id , user.isBlocked)} className="bg-red-500 p-2 rounded-xl hover:bg-red-600 text-white font-bold w-20">
                          Unblock
                        </button>
                      ) : (
                        <button onClick={()=>blockUser(user._id , user.isBlocked)} className="bg-green-500 p-2 rounded-xl hover:bg-green-600 text-white font-bold w-20">
                          Block
                        </button>
                      )}
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
                  Users not found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customer;
