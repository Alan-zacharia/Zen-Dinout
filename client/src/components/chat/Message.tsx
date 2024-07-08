import React from "react";
import { format } from "timeago.js";
import { MessageType } from "../../types/chatTypes";

const Message = ({
  message,
  owner,
}: {
  message: MessageType;
  owner: string | null | undefined;
}) => {
  const isOwnerMessage = message.sender === owner;
  const messageClass = `max-w-[20%] rounded-b-xl p-3  font-bold  text-white rounded-tl-xl ${
    isOwnerMessage ? "ml-auto bg-gray-700" : "bg-primary"
  }`;

  const timestampClass = `${
    isOwnerMessage ? "flex justify-end text-xs" : "flex justify-start text-xs"
  }`;

  return (
    <div className="p-2">
      <div className={messageClass}>{message.text}</div>
      <div className={timestampClass}>{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
