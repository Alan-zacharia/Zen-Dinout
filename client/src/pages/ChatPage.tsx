import React, { useEffect, useState } from "react";
import ChatIcon from "../assets/chat-chat-svgrepo-com.svg";
import ChatSideBar from "../components/chat/ChatSideBar";
import ChatNamesListing from "../components/chat/ChatNamesListing";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import ChatMobileViewSlide from "../components/chat/ChatMobileViewSlider";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import { setCurrentChat } from "../redux/chat/currentChatSLice";
import axiosInstance from "../api/axios";
import { AxiosError } from "axios";
import { Box, Flex, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import { IoHome } from "react-icons/io5";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BsArrowLeft } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { ConversationType } from "../types/chatTypes";

const ChatPage: React.FC = () => {
  const { currentChat } = useSelector((state: RootState) => state.currentChat);
  // const { role, id } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const [loadingConversations, setLoadingConversations] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(setCurrentChat(false));
  }, [dispatch]);
  useEffect(()=>{
    if(conversationId){
      const selectedChat = conversations.find
    }
  },[conversationId])

  const name = "alan";
  return (
    <div className="flex h-screen">
      <ChatSideBar />
      <section className="hidden w-full md:w-[300px] shadow-sm border-r border-l border-gray-200 md:flex flex-col relative ">
        {/* {loadingConversations && (
          <div>
            <div className="mb-8 mt-3">
              <Flex
                gap={4}
                alignItems={"center"}
                flexDirection={"row"}
                p={"3"}
                borderRadius={"md"}
              >
                <SkeletonCircle size="10" />
                <div className="w-[80%] flex flex-col gap-2">
                  <Skeleton h={"10px"} w={"90%"} />
                  <Skeleton h={"10px"} w={"90%"} />
                </div>
              </Flex>
              <Skeleton h={"1px"} w={"100%"} />
            </div>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13].map((_, i) => (
              <Flex
                key={i}
                gap={4}
                alignItems={"center"}
                flexDirection={"row"}
                p={"3"}
                borderRadius={"md"}
              >
                <SkeletonCircle size="10" />
                <div className="w-[80%] flex flex-col gap-2">
                  <Skeleton h={"15px"} w={"90%"} />
                  <Skeleton h={"10px"} w={"90%"} />
                </div>
              </Flex>
            ))}
          </div>
        )} */}
        {!loadingConversations && (
          <>
            <div className="sticky top-0 bg-white z-10 md:relative">
              <div className="text-base font-bold p-2 px-4 md:px-10  md:border-b flex gap-5 items-center">
                <BsArrowLeft
                  size={27}
                  className="md:hidden text-black flex mr-auto"
                />
                <div className="flex gap-2">
                  <PiUserCircleDuotone className="size-10 md:size-12" />
                  {name && (
                    <p className="px-1 pt-2">
                      {name.length > 13 ? name.substring(0, 13) : name}
                      <span>{name.length > 13 && <span>...</span>}</span>
                    </p>
                  )}
                </div>
                <div className="flex md:hidden ml-auto">
                  <IoHome />
                </div>
              </div>
            </div>

            <ChatNamesListing />
          </>
        )}
      </section>
      {!currentChat && <ChatMobileViewSlide />}
      <section className="hidden flex-1 md:flex flex-col bg-neutral-50 relative">
        {currentChat && <ChatMessages />}
        {!currentChat && (
          <div className=" absolute md:flex md:flex-col items-center top-[30%] right-[45%] text-center text-gray-400 p-6">
            <img
              src={ChatIcon}
              alt="Chat Icon"
              className="w-52 h-52 opacity-85 mb-4"
            />
            <div className="text-lg font-bold">Your messages.</div>
            <div className="text-sm">Open a conversation to start a chat.</div>
          </div>
        )}
        {currentChat && <ChatInput />}
      </section>
      {currentChat && (
        <section className="flex flex-1 md:hidden flex-col bg-neutral-50 relative">
          <ChatMessages />
          <ChatInput />
        </section>
      )}
    </div>
  );
};

export default ChatPage;
