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
  handleChat
}: {
  currentChat: ConversationType;
  role: string | null;
  currentUser: string | null | undefined;
  handleChat : ()=> void
}) => {
  const [label, setLabel] = useState<labelType>();
  useEffect(() => {
    const communicatorId = currentChat.members.find((m) => m !== currentUser);
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
  return (
    <div className="w-[40%] bg-neutral-200 h-[70px] mt-20 rounded-full flex items-center px-14 py-2">
      <div className="cursor-pointer">
        <img
          src={
            "https://static.vecteezy.com/system/resources/previews/000/574/512/large_2x/vector-sign-of-user-icon.jpg"
          }
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <div className="ml-6 mr-auto">
        {role == "user" ? (
          <h3 className="text-[17px] font-bold">{label?.restaurantName}</h3>
        ) : (
          <h3 className="text-[17px] font-bold">{label?.username}</h3>
        )}
        <p className="text-sm font-bold text-gray-500">{label?.email}</p>
      </div>
      <div className="cursor-pointer" onClick={handleChat}>
        <ImCross size={20}/>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-phone-outgoing"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
          <line x1="15" y1="9" x2="20" y2="4" />
          <polyline points="16 4 20 4 20 8" />
        </svg> */}
      </div>
    </div>
  );
};

export default ChatLabel;
