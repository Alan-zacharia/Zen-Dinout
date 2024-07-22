import React, { useEffect, useState } from "react";
import { ConversationType } from "../../types/chatTypes";
import axiosInstance from "../../api/axios";
import { ImCross } from "react-icons/im";
interface labelType {
  username: string;
  email: string;
  restaurantName: string;
}
const ChatLabel = ({
  currentChat,
  role,
  currentUser,
  handleChat,
  isTyping,
  users,
  socket
}: {
  currentChat: ConversationType;
  role: string | null;
  currentUser: string | null | undefined;
  handleChat: () => void;
  isTyping: boolean;
  users: { userId: string; online: boolean }[];
  socket : any
}) => {
  const [label, setLabel] = useState<labelType>();
  const communicatorId = currentChat.members.find((m) => m !== currentUser);
  useEffect(() => {
    if (role == "user") {
      const getRestaurant = async () => {
        try {
          const res = await axiosInstance.get(
            "/chat/get-restaurant/users?userId=" + communicatorId
          );
          setLabel(res.data);
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
          setLabel(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUsers();
    }
  }, [currentUser, currentChat]);

  const [onlineStatus, setOnlineStatus] = useState<boolean>(false);

  useEffect(() => {
    const user = users.find((user) => user.userId === communicatorId);
    if (user) {
      setOnlineStatus(true);
    } else {
      setOnlineStatus(false);
    }
  }, [users, communicatorId]);

  return (
    <div className="w-[100%] bg-white  shadow-sm border border-b-slate-400 h-[70px]  flex items-center px-14 py-2">
      <div className="cursor-pointer">
        {role == "user" ? (
          <div className="bg-black text-white w-10 h-10  text-center rounded-full text-2xl font-bold border border-b-8  border-blue-600">
            {label?.restaurantName.charAt(0)}
          </div>
        ) : (
          <div className="bg-black text-white w-10 h-10  text-center rounded-full text-2xl font-bold border border-b-8  border-blue-600">
            {label?.username.charAt(0)}
          </div>
        )}
      </div>

      <div className="ml-6 mr-auto">
        {role == "user" ? (
          <h3 className="text-[17px] font-bold">{label?.restaurantName}</h3>
        ) : (
          <h3 className="text-[17px] font-bold">{label?.username}</h3>
        )}
        {isTyping ? (
          <div className="text-sm font-bold text-green-500">Typing...</div>
        ) : (
          onlineStatus && (
            <p className="text-sm font-bold text-green-500">Online</p>
          )
        )}
      </div>
      <div className="cursor-pointer" onClick={handleChat}>
        <ImCross size={20} />
      </div>
    </div>
  );
};

export default ChatLabel;

