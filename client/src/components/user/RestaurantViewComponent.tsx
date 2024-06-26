import React, { ChangeEvent, useEffect, useState } from "react";
import GoogleMap from "../GoogleMap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
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
import { tableTimeSlots } from "../../types/restaurantTypes";
import { getTodayDate } from "../../utils/dateValidateFunctions";

interface RestaurantType {
  email: string;
  contact: string;
  restaurantName: string;
  address: string;
  location: {
    types: string;
    coordinates: [number, number];
  };
  description: string;
  closingTime: string;
  openingTime: string;
  TableRate: string;
  secondaryImages: string;
  featuredImage: string;
  _id?: string;
}
const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const RestaurantViewComponent = () => {
  const [restaurantDetails, setRestaurantDetails] = useState<RestaurantType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSaved, setIsSave] = useState<boolean>(true);
  const [selectedGuests, setSelectedGuests] = useState<string>("");
  const [timeSlot, setTimeSlots] = useState<tableTimeSlots[]>([]);
  const [tableId, setTableId] = useState<string>();
  const [timeSlotId, setTImeSlotId] = useState<string>();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/restaurant-view/${restaurantId}`
        );
        setRestaurantDetails(response.data.restaurant);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [restaurantId]);
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
  const handleGuests = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedGuests(e.target.value);
  };

  useEffect(() => {
    if (selectedGuests && date) {
      getRestaurantTableSlot(restaurantId, date, selectedGuests)
        .then((res) => {
          console.log(res.TimeSlots);

          setTimeSlots(res.TimeSlots);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [date, selectedGuests, restaurantId]);

  return (
    <>
      <div className="mx-16 mt-16 mb-4  h-[750px] w-full flex flex-row gap-3 ">
        <div>
          <SlotConfrimationModal
            setShowModal={toggleModal}
            isModalOpen={isModalOpen}
            restaurantDetails={restaurantDetails}
            time={time}
            selectedGuests={selectedGuests}
            date={date}
            tableId={tableId}
            timeSlotId={timeSlotId}
          />
        </div>
        {restaurantDetails && (
          <>
            <div className="h-full w-[70%] bg-white shadow-lg  rounded-xl">
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
                      <div className="flex flex-col gap-2 w-80">
                        <p className="text-sm font-semibold text-gray-600">
                          No of Guests
                        </p>
                        <div className="flex">
                          <select
                            id="table-slots"
                            className="bg-gray-50 border border-gray-300  font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                            value={selectedGuests}
                            onChange={handleGuests}
                          >
                            <option selected disabled value="">
                              No of Guests
                            </option>
                            <option value="2">2 Guests</option>
                            <option value="4"> 4 Guests</option>
                            <option value="6">6 Guests</option>
                            <option value="8">8 Guests</option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                              onClick={() =>
                                toggleModal(
                                  value.slotStartTime,
                                  value.tableId,
                                  value._id
                                )
                              }
                            >
                              {value.slotStartTime}
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
