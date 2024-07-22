import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { MessageType } from "../../types/chatTypes";
interface ConversationType {
  _id: string;
  members: string[];
}
interface CommunicatorType {
  restaurantName: string;
  email: string;
  username: string;
  _id: string;
}
const UserFeilds = ({
  conversation,
  currentUser,
  role,
  users,
}: {
  conversation: ConversationType;
  currentUser: string | null | undefined;
  role: string | null | undefined;
  users: { userId: string; online: boolean }[];
}) => {
  const [communicator, setCommunicator] = useState<
    CommunicatorType | undefined
  >(undefined);

  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);
  useEffect(() => {
    const user = users.find((user) => user.userId === communicator?._id);
    if (user) {
      setOnlineStatus(true);
    }else{
      setOnlineStatus(false)
    }
  }, [communicator, users  ]);

  useEffect(() => {
    const communicatorId = conversation.members.find((m) => m !== currentUser);
    if (role == "user") {
      const getRestaurant = async () => {
        try {
          const res = await axiosInstance.get(
            "/chat/get-restaurant/users?userId=" + communicatorId
          );
          setCommunicator(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getRestaurant();
    } else {
      const getUsers = async () => {
        try {
          const res = await axiosInstance.get(
            "/chat/get-user/users?userId=" + communicatorId
          );
          setCommunicator(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUsers();
    }
  }, [currentUser, conversation]);
  const getFirstLetter = () => {
    if (role === "user") {
      return communicator?.restaurantName.charAt(0).toUpperCase() || "";
    } else {
      return communicator?.username.charAt(0).toUpperCase() || "";
    }
  };
  return (
      <div className="flex items-center hover:bg-slate-100 px-10 py-4 relative">
        <div className="cursor-pointer flex items-center">
          <div>
            <div className="bg-black text-white w-10 h-10  text-center rounded-full text-2xl font-bold border border-b-8  border-blue-600">
              {getFirstLetter()}
            </div>
            {onlineStatus && (
              <p className="bg-green-500 absolute top-4 w-4 h-4 rounded-full"></p>
            )}
          </div>
          <div className="ml-6">
            {role == "user" ? (
              <h3 className="text-sm font-bold">
                {communicator?.restaurantName}
              </h3>
            ) : (
              <h3 className="text-sm font-bold">{communicator?.username}</h3>
            )}
            <p className="text-xs font-semibold text-gray-500">
              {communicator?.restaurantName}
            </p>
          </div>
        </div>
      </div>
  );
};

export default UserFeilds;
