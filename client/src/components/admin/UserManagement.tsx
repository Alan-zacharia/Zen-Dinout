// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosActionsUser, axiosGetUser } from "../../services/adminApiClient";
import { HiOutlineSearch } from "react-icons/hi";
axios.defaults.withCredentials = true;
const Customer: React.FC = () => {
  const [users, setUser] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  interface UserType {
    _id: string;
    username: string;
    email: string;
    isBlocked: boolean;
  }
  useEffect(() => {
    const fetchData = async () => {
      const { users, message } = await axiosGetUser();
      setUser(users);
    };
    fetchData();
  }, []);

  const blockUser = (id: string, block: boolean) => {
    axiosActionsUser(id, block);
    setUser((prevUser: any) =>
      prevUser.map((user: any) =>
        user._id == id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };
  const filteredUsers = users.filter((datas: any) => {
    const { username, email } = datas;
    const searchTerm = searchItem.toLowerCase();
    return (
      username.toLowerCase().includes(searchTerm) ||
      email.toLowerCase().includes(searchTerm)
    );
  });
  return (
    <div className="text-gray-900  ">
      <div className="p-4 flex justify-between">
        <h1 className="text-3xl font-bold">User Mangement</h1>
        <div className="relative flex-shrink-0 w-52 md:w-auto ">
          <HiOutlineSearch
            fontSize={24}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Search Users....."
            className="text-sm focus:outline-none border active:outline-none border-gray-300 h-14 w-[400px] pl-10 pr-4 rounded-sm"
            value={searchItem}
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b bg-neutral-200 ">
              <th className="text-left p-3 px-5 text-lg">Name</th>
              <th className="text-left p-3 px-5 text-lg">Email</th>
              <th className="text-left p-3 px-5 text-lg">Phone</th>
              <th className="text-left p-3 px-5 flex justify-end text-lg">
                Status
              </th>
              <th></th>
            </tr>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: UserType) => {
                return (
                  <tr className="border-b hover:bg-orange-100 bg-gray-100">
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.username}
                        className="bg-transparent border-none focus:outline-none  text-black  font-bold text-base"
                        readOnly
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        className="bg-transparent border-none focus:outline-none  font-medium "
                        value={user.email}
                        readOnly
                      />
                    </td>

                    <td className="p-3 px-6">nill</td>
                    <td className="p-3 px-5 flex justify-end">
                      {user.isBlocked ? (
                        <button
                          onClick={() => blockUser(user._id, user.isBlocked)}
                          className="bg-red-500 p-2 rounded-xl hover:bg-red-600 text-white font-bold w-20"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => blockUser(user._id, user.isBlocked)}
                          className="bg-green-500 p-2 rounded-xl hover:bg-green-600 text-white font-bold w-20"
                        >
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
