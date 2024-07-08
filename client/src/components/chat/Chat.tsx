import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axiosInstance from "../../api/axios";
import UserFeilds from "../chat/UserFeilds";
import Message from "../chat/Message";
import NavBar from "../user/layouts/NavBar";
import { ConversationType, MessageType } from "../../types/chatTypes";
import SideBar from "../seller/shared/SideBar";
import { io, Socket } from "socket.io-client";
import ChatLabel from "./ChatLabel";

const Chat: React.FC = () => {
  const { id, role } = useSelector((state: RootState) => state.user);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(
    null
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket>();

  useEffect(() => {
    socket.current = io("http://localhost:3000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", id);
    socket.current?.on("getUsers", (users) => {
      setUsers(users);
    });
  }, [id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosInstance.get("/chat/" + id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axiosInstance.get(
          "/chat/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async (e: any) => {
    if (newMessage) {
      e.preventDefault();
      const message = {
        sender: id,
        text: newMessage,
        conversationId: currentChat?._id,
      };
      const receiverId = currentChat?.members.find((member) => member !== id);

      socket.current?.emit("sendMessage", {
        senderId: id,
        receiverId,
        text: newMessage,
      });
      try {
        setNewMessage("");
        const res = await axiosInstance.post(`/chat/messages/`, message);
        setMessages([...messages, res.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleChat = ()=>{
    setCurrentChat(null)
  }
  return (
    <div
      className={`${
        role == "seller"
          ? "flex flex-col md:flex-row h-screen overflow-x-hidden bg-slate-50"
          : ""
      }`}
    >
      {role == "user" ? (
        <div className="fixed z-50 top-0  left-0 w-full">
          <NavBar />
        </div>
      ) : (
        <>
          <div>
            <SideBar />
          </div>
        </>
      )}
      <div className="h-screen pt-20  overflow-hidden">
        <div
          className={`${
            role == "seller" ? "mx-auto w-screen lg:px-44 " : ""
          } hidden lg:flex `}
        >
          <div className="hidden lg:flex lg:absolute lg:top-10 lg:left-[50%] text-2xl font-bold">
            Enqueries
          </div>
          <div className=" lg:w-[20%]  h-[890px] bg-neutral-50 overflow-y-auto shadow-sm border-x border-x-gray-100">
            <div className="flex items-center my-8 mx-14 ">
              <div className="ml-8 ">
                <h3 className="text-[20px] font-bold">
                  {role == "user" ? "Restaurants" : "Customers"}
                </h3>
              </div>
            </div>
            <hr />
            <div className="mx-10">
              {conversations.map((conversation: ConversationType) => (
                <div
                  key={conversation._id}
                  onClick={() => setCurrentChat(conversation)}
                >
                  <UserFeilds
                    role={role}
                    conversation={conversation}
                    currentUser={id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-[900px] bg-neutral-50 flex flex-col items-center  ">
            {currentChat && (
              <ChatLabel
              handleChat={handleChat}
                currentChat={currentChat}
                role={role}
                currentUser={id}
              />
            )}
            <div
              className="h-[75%] w-full overflow-y-scroll shadow-sm "
              style={{}}
            >
              {currentChat ? (
                <>
                  {messages.map((m: MessageType, index: number) => (
                    <div ref={scrollRef}>
                      <Message message={m} owner={id} key={index} />
                    </div>
                  ))}
                </>
              ) : (
                <span className="absolute top-[40%] right-[32%] text-5xl text-[rgba(224,220,220)] text-center cursor-default">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
            <div className=" w-full flex justify-center p-4 items-center">
              <input
                placeholder="Type a message..."
                className="w-[75%] p-4 border border-gray-400 shadow-lg rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewMessage(e.target.value)
                }
                value={newMessage}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key == "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <div
                className={"ml-4 p-2 cursor-pointer bg-light rounded-full"}
                onClick={handleSubmit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-send"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </div>
              <div className={"ml-4 p-2 cursor-pointer bg-light rounded-full"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle-plus"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="12" y1="9" x2="12" y2="15" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
