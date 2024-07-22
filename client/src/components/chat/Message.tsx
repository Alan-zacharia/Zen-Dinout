import { BsCheck2All } from "react-icons/bs";
import { MessageType } from "../../types/chatTypes";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Message = ({
  message,
  owner,
}: {
  message: MessageType;
  owner: string | null | undefined;
}) => {
  const isOwnerMessage = message.sender === owner;
  const messageClass = `max-w-[15%] rounded-b-xl p-2 rounded-tl-xl ${
    isOwnerMessage
      ? "ml-auto bg-gray-300  text-black"
      : "bg-blue-500  text-white"
  }`;

  const timestampClass = `${
    isOwnerMessage
      ? "flex justify-end text-[11px]"
      : "flex justify-start text-[11px] "
  }`;
  const formatTime = (createdAt: Date) => {
    const date = new Date(createdAt);
    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }; 
         
  return (
    <div className="p-2 ">
      <div className={messageClass}>{message.text}
      {isOwnerMessage &&
          (message.isRead ? (
            <p className="text-base text-blue-500 flex justify-end">
              <BsCheck2All size={16} />
            </p>
          ) : (
            <p className="text-base flex justify-end">
              <BsCheck2All size={16} />
            </p>
          ))}
      </div>

      <div className={`${timestampClass} gap-2 items-center `}>
        <p>{formatTime(message.createdAt)}</p>
        
      </div>
    </div>
  );
};

export default Message;
