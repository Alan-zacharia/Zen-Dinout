import React, { useEffect, useState } from "react";
import { HiUsers } from "react-icons/hi";
import { RiCalendar2Fill } from "react-icons/ri";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IoTimeSharp } from "react-icons/io5";
import { MdTableRestaurant } from "react-icons/md";
interface userDatatype {
  email: string;
  username: string;
  _id: string;
}

const ReserveTableConfirmation = () => {
  const { id  } = useSelector((state: RootState) => state.user);
  const { bookingDetails } = useSelector((state: RootState) => state.booking);
  const [userData, setUser] = useState<userDatatype | null>(null);
  const [tableData, setTableData] = useState<{
    tableNumber : string;
    tableCapacity : number;
    restaurantId : string;
  }>();
  useEffect(() => {
    axios
      .get(`/api/user-details/${id}`)
      .then((res) => {
        console.log(res.data.userData);
        setUser(res.data.userData);
      })
      .catch(({ response }) => {
        console.log(response?.data?.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/restaurant-table-details/${bookingDetails?.tableId}`)
      .then((res) => {
        console.log(res.data.restaurantTable);
        setTableData(res.data.restaurantTable);
      })
      .catch(({ response }) => {
        console.log(response?.data?.message);
      });
  }, []);
  
  const restaurantDatas = {
    restaurantId: bookingDetails?.restaurantId,
    price: bookingDetails?.tableRate,
    Quantity: "1",
    table: tableData?.tableNumber,
  };
  const makePayment = async () => {
    const stripe = await loadStripe(
     import.meta.env.VITE_API_STRIPE_KEY 
    );
    await axios
      .post("/api/create-payment", {
        restaurantDatas,
        userEmail: userData?.email,
        userUsername: userData?.username,
        restaurantId : tableData?.restaurantId,
        tableSlotId  : bookingDetails?.timeSlotId 
      })
      .then((res) => {
        console.log(res);
        stripe?.redirectToCheckout({
          sessionId: res.data.sessionId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const calculatedAmount = () =>{
    let amount : number = 199;
    if(bookingDetails){
       amount = parseInt(bookingDetails.tableRate) * bookingDetails.guests
    }
    return amount;
  }
  return (
    <div className="h-screen flex">
      <div className="m-auto shadow-2xl h-auto w-[50%]">
        <div className="flex flex-col p-10 gap-7">
          <h1 className="text-2xl font-bold">Booking Summary</h1>

          <div className="h-[1px] w-full bg-gray-400" />
          <div className="flex items-center gap-2 font-semibold">
            <MdTableRestaurant/>
              <span className="text-lg font-bold">{bookingDetails?.restaurantName}</span>
            </div>
         
          <div className="flex flex-col  gap-1 ">
            
            <div className="flex items-center gap-2 font-semibold">
              <RiCalendar2Fill />
              <span>{bookingDetails?.date}</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <HiUsers />
              {bookingDetails?.guests} Guests
              
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <IoTimeSharp />
              {bookingDetails?.time}
            </div>
          </div>
          <div className="flex gap-60 ">
            <div className="w-[30%] flex flex-col gap-3 pt-7">
              <label
                htmlFor="Full_name"
                className="block font-bold text-sm text-gray-700"
              >
                Name
              </label>

              <input
                type="text"
                className="p-2 px-3  bg-gray-50 w-72 outline-none font-bold pointer-events-none"
                value={userData?.username}
              />
              <label
                htmlFor="Full_name"
                className="block font-bold text-sm text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                className="p-2  bg-gray-50 w-72 outline-none pointer-events-none font-bold"
                value={userData?.email}
              />
            </div>

            <div className="flex flex-col w-[40%] h-[200px] gap-3 shadow-xl shadow-gray-300 bg-gray-50">
              <div className="">
                <h1 className="text-center font-semibold text-gray-700 text-lg font-sans p-3 ">
                  Booking summary
                </h1>
                <div className="h-[0.2px]  bg-gray-400" />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className="flex justify-between">
                  <p className=" text-sm font-semibold">{bookingDetails?.guests} Person X {bookingDetails?.tableRate}</p>
                  <p className="text-sm">₹ {calculatedAmount()}</p>
                </div>
              
              </div>
              <div className="flex justify-between">
                <p className="px-5 font-bold">Total</p>
                <p className="px-5 font-bold">₹ {calculatedAmount()}</p>
              </div>
            </div>
          </div>
          <button
            className="bg-orange-400 p-2.5 rounded-lg text-white font-bold hover:bg-orange-500 m-auto w-44"
            onClick={makePayment}
          >
            Reserve now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveTableConfirmation;
