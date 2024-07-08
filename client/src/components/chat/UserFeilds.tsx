import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
interface ConversationType {
  _id: string;
  members: string[];
}
interface CommunicatorType {
  restaurantName: string;
  email: string;
  username : string
}
const UserFeilds = ({
  conversation,
  currentUser,
  role 
}: {
  conversation: ConversationType;
  currentUser: string | null | undefined;
  role : string | null | undefined
}) => {
  const [communicator, setCommunicator] = useState<
    CommunicatorType | undefined
  >(undefined);
  useEffect(() => {
    const communicatorId = conversation.members.find((m) => m !== currentUser);
    if(role == "user"){
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
    }else{
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
  return (
    <div>
      <div className="flex items-center py-8 border-b border-b-gray-300">
        <div className="cursor-pointer flex items-center">
          <div>
            <img
              src={
                "https://static.vecteezy.com/system/resources/previews/000/574/512/large_2x/vector-sign-of-user-icon.jpg"
              }
              className="w-[30px] h-[30px] rounded-full p-[2px] border border-primary"
            />
          </div>
          <div className="ml-6">
            {role == "user" ? (
              <h3 className="text-[20px] font-bold">
                {communicator?.restaurantName}
            </h3>
            ):(
              <h3 className="text-[16px] font-bold">
              {communicator?.username}
               </h3>
            )}
            <p className="text-sm font-semibold text-gray-500">Hello</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeilds;
