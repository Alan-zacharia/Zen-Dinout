import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axiosInstance from "../../api/axios";
import UserFeilds from "../chat/UserFeilds";
import Message from "../chat/Message";
import { ConversationType, MessageType } from "../../types/chatTypes";
import { IoHome } from "react-icons/io5";
import { io, Socket } from "socket.io-client";
import ChatLabel from "./ChatLabel";
import { Link, useSearchParams } from "react-router-dom";
import { MdTableRestaurant } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { SiImessage } from "react-icons/si";
import { RiFolderUserFill } from "react-icons/ri";
import ChatIcon from "../../assets/chat-chat-svgrepo-com.svg";

const Chat: React.FC = () => {
  const { id, role, name } = useSelector((state: RootState) => state.user);
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [currentChat, setCurrentChat] = useState<ConversationType | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [users, setUsers] = useState<{ userId: string; online: boolean }[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<MessageType | null>(
    null
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const socket = useRef<Socket>();
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get("conversation");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);
  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_API_BASE_URL}`);

    socket.current.on("getMessage", (data) => {
      setIsTyping(false);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
      });
      setConversations((prevConversations) => {
        const conversationIndex = prevConversations.findIndex((conversation) =>
          conversation.members.includes(data.senderId)
        );
        if (conversationIndex !== -1) {
          const updatedConversations = [...prevConversations];
          const [movedConversation] = updatedConversations.splice(
            conversationIndex,
            1
          );
          return [movedConversation, ...updatedConversations];
        }
        return prevConversations;
      });
    });
 

    socket.current?.on("getMessageReadStatus", (data) => {
      console.log(data);
      setMessages((prev) =>
        prev.map((m) => {
          m.isRead = true;
          return m;
        })
      );
    });

    socket.current.on("senderTyping", ({ receiverId, isTyping }) => {
      if (receiverId === id) {
        setIsTyping(isTyping);
      }
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (conversationId) {
      const selectedChat = conversations.find(
        (chat) => chat._id === conversationId
      );
      if (selectedChat) {
        setCurrentChat(selectedChat);
      }
    }
    window.history.replaceState({}, "", window.location.pathname);
  }, [conversationId, conversations]);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
      socket.current?.emit("messageRead", {
        status: true,
        recieverId: arrivalMessage?.sender,
      });
    }
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
        const sortedConversations = res.data.sort(
          (a: ConversationType, b: ConversationType) => {
            const lastMessageA = new Date(a.updatedAt).getTime();
            const lastMessageB = new Date(b.updatedAt).getTime();
            return lastMessageB - lastMessageA;
          }
        );
        setConversations(sortedConversations);
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
    setIsTyping(false);
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
      socket.current?.emit("typing", { receiverId, isTyping: false });
      try {
        setNewMessage("");
        const res = await axiosInstance.post(`/chat/messages/`, message);
        setMessages([...messages, res.data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log("hjh");  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleChat = () => {
    setCurrentChat(null);
  };

  const handleTyping = () => {
    const receiverId = currentChat?.members.find((member) => member !== id);
    if (receiverId) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      socket.current?.emit("typing", { receiverId, isTyping: true });
      setTypingTimeout(
        setTimeout(() => {
          socket.current?.emit("typing", { receiverId, isTyping: false });
          setTypingTimeout(null);
        }, 2000)
      );
    }
  };

  return (
    <div
      className={`${
        role == "seller"
          ? "flex flex-col md:flex-row h-screen overflow-x-hidden "
          : " "
      }`}
    >
      <div className="h-screen  overflow-hidden relative">
        <div
          className={`${
            role == "seller" ? "mx-auto w-screen  " : ""
          }  lg:flex `}
        >
          <div className="m-2 mt-8">
            <div className="p-3">
              <span className="text-black font-extrabold text-2xl cursor-pointer">
                Z
              </span>
              <span className="text-orange-500 font-extrabold text-2xl cursor-pointer">
                D
              </span>
            </div>

            <ul className=" pt-10 text-2xl cursor-pointer  flex flex-col  gap-5 ">
              {role == "user" ? (
                <Link to="/">
                  <li
                    className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip "
                    data-tip="Home"
                  >
                    <IoHome />
                  </li>
                </Link>
              ) : (
                <Link to="/restaurant">
                  <li
                    className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip "
                    data-tip="Home"
                  >
                    <IoHome />
                  </li>
                </Link>
              )}
              {role == "user" && (
                <Link to="/">
                  <li
                    className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip"
                    data-tip="Restaurants"
                  >
                    <MdTableRestaurant />
                  </li>
                </Link>
              )}

              <Link to="#">
                <li
                  className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip"
                  data-tip="Search"
                >
                  <FaSearch />
                </li>
              </Link>
              <Link to="#">
                <li
                  className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip"
                  data-tip="Chat"
                >
                  <SiImessage />
                </li>
              </Link>
              {role == "user" ? (
                <Link to="/account">
                  <li
                    className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip"
                    data-tip="Profile"
                  >
                    <RiFolderUserFill />
                  </li>
                </Link>
              ) : (
                <Link to="/restaurant/restaurant-details">
                  <li
                    className="hover:bg-slate-200 rounded-lg w-14 h-14 p-4 tooltip"
                    data-tip="Profile"
                  >
                    <RiFolderUserFill />
                  </li>
                </Link>
              )}
            </ul>
          </div>
          <div className=" lg:w-[20%]    h-[900px] overflow-y-auto shadow-sm border-x-2 border-x-gray-200">
            <div className="text-lg font-bold  px-10 p-10 border-b flex gap-5 items-center ">
              <div className="bg-black text-white w-10 h-10  text-center rounded-full text-2xl font-bold border border-b-8  border-blue-600">
                {name?.charAt(0)}
              </div>
              {name}
            </div>

            <div className="flex items-center my-6 mx-10 ">
              <h3 className="text-sm font-extrabold">Messages</h3>
            </div>
            <hr />
            <div>
              {conversations.map((conversation: ConversationType) => (
                <div
                  key={conversation._id}
                  onClick={() => setCurrentChat(conversation)}
                >
                  <UserFeilds
                    role={role}
                    conversation={conversation}
                    currentUser={id}
                    users={users}
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
                isTyping={isTyping}
                users={users}
                socket={socket}
              />
            )}
            <div
              className="h-[85%] w-full p-5 overflow-y-scroll shadow-sm "
              style={{}}
            >
              {currentChat ? (
                <>
                  {messages.map((m: MessageType, index: number) => (
                    <div ref={scrollRef} key={index}>
                      <Message message={m} owner={id} key={index} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="absolute top-[30%] right-[34%] text-5xl  text-center cursor-default">
                  <div>
                    <img
                      src={ChatIcon}
                      alt=""
                      className="w-52 h-52 opacity-85 mx-5"
                    />
                  </div>
                  <div className="w-72 text-lg flex flex-wrap">
                    <p className="px-16 font-bold">Your messages.</p>
                    <p className="font-medium text-sm px-5">
                      Open a conversation to start a chat.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {currentChat && (
              <div className=" w-full flex justify-center p-3 items-center">
                <input
                  placeholder="Type a message..."
                  className="w-[75%] p-3 border border-gray-400 shadow-lg rounded-full bg-light   outline-none"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
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
                <div
                  className={"ml-4 p-2 cursor-pointer bg-light rounded-full"}
                >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
