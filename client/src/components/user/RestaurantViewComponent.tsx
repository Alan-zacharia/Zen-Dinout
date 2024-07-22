import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoogleMap from "../GoogleMap";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdTimer } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { BsBookmarkCheckFill } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SiGooglecalendar } from "react-icons/si";
import SlotConfrimationModal from "./shared/SlotConfrimationModal";
import { getRestaurantTableSlot } from "../../services/api";
import { RestaurantType, TimeSlots } from "../../types/restaurantTypes";
import { getTodayDate } from "../../utils/dateValidateFunctions";
import { BsChatDotsFill } from "react-icons/bs";
import axiosInstance from "../../api/axios";
import { RootState } from "../../redux/store";

const formatTime = (time: string): string => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// interface RestaurantType {
//   email: string;
//   contact: string;
//   restaurantName: string;
//   address: string;
//   location: {
//     types: string;
//     coordinates: [number, number];
//   };
//   description: string;
//   closingTime: string;
//   openingTime: string;
//   TableRate: string;
//   secondaryImages: string;
//   featuredImage: string;
//   _id?: string;
// }
const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const RestaurantViewComponent = ({
  restaurantDetails,
}: {
  restaurantDetails: RestaurantType | undefined;
}) => {
  const { id, isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSave] = useState<boolean>(true);
  const [selectedGuests, setSelectedGuests] = useState<string>("");
  const [timeSlot, setTimeSlots] = useState<TimeSlots[]>([]);
  const [tableId, setTableId] = useState<string>();
  const [timeSlotId, setTImeSlotId] = useState<string>();
  const [time, setTime] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(0);
  const [timeSlotSelect, setTimeSlotSelect] = useState<string>("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const { restaurantId } = useParams();

  const toggleSave = () => {
    setIsSave(!isSaved);
  };

  const toggleModal = (
    slotStartTime: string,
    tableId: string,
    slotId: string
  ) => {
    setTime(slotStartTime);
    setTableId(tableId);
    setIsModalOpen(!isModalOpen);
    setTImeSlotId(slotId);
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleGuestCount = () => {
    if(guestCount < 15){
      setGuestCount((count)=>count + 1);
    }
  };
  const handleGuestsCountReduce = () => {
    if(guestCount > 0){
      setGuestCount((count)=>count - 1);
    }

  };

  useEffect(() => {
    if (date) {
      getRestaurantTableSlot(restaurantId, date)
        .then((res) => {
          setTimeSlots(res.data.TimeSlots);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [date, restaurantId]);
  const handleChatSetup = async (restaurantId: string) => {
    try {
      const res = await axiosInstance.post("/chat/", {
        senderId: id,
        receiverId: restaurantId,
      });
      const conversationId = res.data.savedConversation._id;
      navigate(`/chat?conversation=${conversationId}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTimeSlot = (time : string)=>{
    setTimeSlotSelect(formatTime(time));
  }
  return (
    <>
      <div className="mx-16 mt-16 mb-4  h-[750px] w-full flex flex-row gap-3 ">
        <div>
          <SlotConfrimationModal
            setShowModal={toggleModal}
            isModalOpen={isModalOpen}
            restaurantDetails={restaurantDetails}
            time={time}
            selectedGuests={guestCount}
            date={date}
            tableId={tableId}
            timeSlotId={timeSlotId}
          />
        </div>
        {restaurantDetails && (
          <>
            <div className="h-full w-[70%] bg-white shadow-lg  rounded-xl relative">
              <div className="w-full h-[400px] flex gap-7">
                <div className="bg-white w-[800px] h-[400px] border border-gray-200 ">
                  <Slider {...settings}>
                    <img
                      src={restaurantDetails.featuredImage}
                      alt="restaurantImage"
                      className="w-[700px] h-[400px]  transition duration-500 ease-in-out hover:scale-105  cursor-pointer"
                    />

                    {restaurantDetails.secondaryImages && (
                      <div className="bg-white">
                        <img
                          src={restaurantDetails.secondaryImages}
                          alt=""
                          className="w-full h-[400px] transition duration-500 ease-in-out hover:scale-105  cursor-pointer"
                        />
                      </div>
                    )}
                  </Slider>

                  <div className="flex pl-10 pt-5 flex-col gap-2">
                    <div className="relative">
                      <h1 className="text-4xl text-black font-bold pb-2">
                        {restaurantDetails.restaurantName}
                      </h1>
                      <button
                        className="cursor-pointer absolute right-5 top-3"
                        onClick={toggleSave}
                      >
                        {isSaved ? (
                          <FaRegBookmark size={25} />
                        ) : (
                          <BsBookmarkCheckFill size={25} />
                        )}
                      </button>
                    </div>
                    <p className=" font-medium text-neutral-800 flex gap-2">
                      <FaLocationDot size={20} />
                      {restaurantDetails.address}
                    </p>
                    <div className="font-medium text-neutral-800 items-center flex gap-2">
                      <IoMdTimer size={20} />
                      <span>{restaurantDetails.openingTime} AM</span> -{" "}
                      <span>{restaurantDetails.closingTime} PM</span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(4)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-300 me-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        4.5 out of 5
                      </p>
                    </div>
                  </div>
                  <p className="font-bold text-neutral-800 pl-10 text-base p-3 pt-10">
                    {" "}
                    Description{" "}
                  </p>

                  <p className=" font-medium text-neutral-700 pl-10">
                    {restaurantDetails.description}
                  </p>
                  {isAuthenticated && (
                    <div
                      className="tooltip absolute right-[37%] bottom-[28%]  border border-gray-200 shadow-lg bg-blue-400 rounded-full p-2.5 font-bold  flex items-center gap-2 cursor-pointer"
                      data-tip="Chat with restaurant"
                      onClick={() =>
                        handleChatSetup(restaurantDetails?._id as string)
                      }
                    >
                      <BsChatDotsFill
                        size={18}
                        className="font-bold text-white"
                      />
                    </div>
                  )}
                </div>

                <form>
                  <div className="flex px-5 pt-5 flex-col gap-5 border w-[380px] max-h-auto  rounded-xl bg-white shadow-2xl">
                    <div>
                      <h4 className="text-xl font-bold pb-2">Select a Deal</h4>
                      <div className="flex flex-col gap-2 w-80">
                        <p className="text-sm font-semibold text-gray-600">
                          Select Date
                        </p>
                        <div className="flex">
                          <p className="bg-blue-500 h-14 w-14 items-center flex justify-center shadow-xl  rounded-l-lg shadow-neutral-200">
                            <SiGooglecalendar
                              className="text-white "
                              size={30}
                            />
                          </p>
                          <input
                            type="date"
                            className="w-full rounded-r-lg h-14 p-5 bg-white-300 shadow-xl shadow-neutral-300 outline-none"
                            value={date}
                            onChange={handleDate}
                            min={getTodayDate()}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                     
                    </div>
                        {!timeSlotSelect ? (
                    <div className="flex flex-col gap-3 pb-5">
                      <p className="text-sm font-semibold text-gray-600">
                        Select Time
                      </p>
                      <div className="flex flex-wrap gap-5 w-80 h-36 overflow-auto ">

                      
                        {timeSlot && timeSlot.length > 0 ? (
                          timeSlot.map((value, index: number) => (
                            <p
                              key={index}
                              className="bg-blue-500 p-1 h-8 w-20 text-center font-bold cursor-pointer text-white rounded-md"
                              onClick={() =>handleTimeSlot(value.startTime) }
                            >
                              {formatTime(value.startTime)}
                            </p>
                          ))
                        ) : (
                          <div className="flex flex-col">
                            <div className="mx-16 m-6">
                              <p className="text-center text-xl font-bold">
                                No slots available
                              </p>
                              <span className="text-gray-500 text-sm px-4">
                                Please try again later
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                        ):(
                    <div className="flex flex-col gap-3 pb-5 ">
                      <p className=" text-gray-700 text-base font-bold ">
                        Selected Time &nbsp;&nbsp;:&nbsp; &nbsp;<span className="text-white bg-blue-500 p-1 text-sm rounded-md">{timeSlotSelect}</span>
                      </p>
                      <div className="flex flex-wrap gap-5 w-80 h-[220px] overflow-auto ">

                      {timeSlotSelect && (
                      <div className="flex flex-col gap-2 w-80">
                        <p className="text-sm font-semibold text-gray-600">
                          No of Guests
                        </p>
                        <div className="flex  items-center border shadow-lg h-10 gap-3  rounded-lg p-5">
                          <p className="text-gray-600 font-semibold">Guests :</p>
                          <button
                            className="border border-blue-500  rounded-full  w-5 h-5 flex items-center  justify-center focus:outline-none"
                            onClick={handleGuestCount}
                            type="button"
                          >
                            <span className="text-xl pb-1 text-blue-500 font-bold">
                            +
                            </span>
                          </button>
                          <p className="text-base font-medium ">{guestCount}</p>
                          <button
                            className="border border-blue-500  rounded-full pb-0.5  w-5 h-5 flex items-center  justify-center focus:outline-none"
                            onClick={handleGuestsCountReduce}
                            type="button"
                            
                          >
                            <span className="text-xl pb-1 text-blue-500 font-bold">
                            -
                            </span>
                          </button>
                        </div>
                        <label htmlFor="GuestName" className="text-gray-700 font-bold">Guest name</label>
                        <input type="text" className="shadow-lg p-2 border border-gray-300 rounded-md outline-none" placeholder="Enter guest name..."/>

                      </div>
                      )}
                      {guestCount >0 && (
                        <button className="w-full btn bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                        type="button"
                        onClick={()=>toggleModal(timeSlotSelect,"T1","sdf")}>Continue</button>
                      )}
                      </div>
                    </div>
                        )}
                  </div>
                </form>
              </div>
            </div>
            <div className="max-h-auto  bg-white rounded-xl shadow-lg flex flex-col">
              <div className="w-[400px] p-5 flex flex-col">
                <h1 className="text-2xl font-bold pb-5">
                  Here to find location
                </h1>

                <GoogleMap
                  latitude={restaurantDetails.location.coordinates[1]}
                  longitude={restaurantDetails.location.coordinates[0]}
                />

                <div className="flex flex-col  justify-center pt-10">
                  <p className="text-blue-500 font-semibold underline">
                    Get Direction
                  </p>
                  <p className="text-blue-500 font-semibold underline">
                    Contact : {restaurantDetails.contact}
                  </p>
                  <p className="text-blue-500 font-semibold underline">
                    Email : {restaurantDetails.email}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantViewComponent;
