import React from "react";
import { IoHome } from "react-icons/io5";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BsArrowLeft } from "react-icons/bs";
import { setCurrentChat } from "../../redux/chat/currentChatSLice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

const ChatNamesListing = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const name = "alan";
  const lastMessage = "heloo i alan  forndsjas"
  return (
    <>
      
      <hr className="hidden md:flex" />
      <div className="overflow-y-scroll overflow-x-hidden no-scrollbar pb-3">
        <div className="flex items-center md:my-6 mx-5 mb-2 md:mx-10">
          <h3 className="text-[15px] font-bold text-black">Messages</h3>
        </div>
        {[1,2,3,4,5].map((conversation : any, index : number) => (
          <div
            key={index}
            className={`flex items-center  p-1 px-4 md:p-2 md:px-8 cursor-pointer relative  "hover:bg-slate-50`}
            // ${ selectedConversation?._id == conversation._id  ? "bg-gray-200 hover:bg-gray-200" : "hover:bg-slate-50"}`}
            onClick={() => {
              dispatch(setCurrentChat(true));
            }}
          >
            <div className="flex items-center">
              <div>
                <PiUserCircleDuotone className="size-16 md:size-14" />
              </div>
              <div className="ml-3">
                {role === "user" ? (
                  <h3 className="text-sm font-semibold">
                    {name.length > 13 ? name.substring(0, 13) : name}
                    {name.length > 13 && <span>...</span>}
                  </h3>
                ) : (
                  <h3 className="text-sm font-semibold">
                    {name.length > 13 ? name.substring(0, 13) : name}
                    {name.length > 13 && <span>...</span>}
                  </h3>
                )}
               
                <p className="text-sm w-[500px]">{lastMessage.length > 18 ? lastMessage.substring(0,18) + "..." : lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
};

export default ChatNamesListing;
