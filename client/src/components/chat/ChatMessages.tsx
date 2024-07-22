import React from "react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BsArrowLeft } from "react-icons/bs";
import { PiInfoBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { setCurrentChat } from "../../redux/chat/currentChatSLice";

const ChatMessages: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const name = "alan";
  return (
    <>
      <div className="w-full h-[66px] border-b-2  bg-white flex relative">
        <div className="p-3  flex items-center gap-2 font-bold">
          <PiUserCircleDuotone className="hidden md:flex size-10" />
          <div className="md:hidden  p-3 flex items-center gap-3 font-bold ">
            <BsArrowLeft
              size={25}
              className="md:hidden text-black mr-5"
              onClick={() => dispatch(setCurrentChat(false))}
            />
            <PiUserCircleDuotone className="size-8 " />
            <h5 className="text-sm">{name}</h5>
            <PiInfoBold size={20} className="absolute right-6" />
          </div>

          <h5 className="hidden md:flex">{name}</h5>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        {[
          1,
          2,
          3,
          5,
          6,
          16237234,
          ,
          23423,
          4234,
          324,
          234,
          234,
          234,
          234,
          32,
          2,
          2,
          22,
          2,
          22,
          ,
        ].map(() => (
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map(() => (
              <div className="max-w-[80%] xl:max-w-[13%] flex flex-col rounded-t-xl p-2 rounded-bl-xl ml-auto bg-gray-300 text-black break-words">
                <p className="px-5">Hai</p>
              </div>
            ))}

            {[1, 2, 3, 4, 5].map(() => (
              <div className="max-w-[80%] xl:max-w-[13%] rounded-t-xl p-2 rounded-br-xl bg-blue-500 mr-auto text-white break-words">
                <p className="px-5">Hai</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatMessages;
