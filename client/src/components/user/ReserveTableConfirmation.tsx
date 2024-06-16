import React from "react";
import { HiUsers } from "react-icons/hi";
import { RiCalendar2Fill } from "react-icons/ri";
import {loadStripe} from "@stripe/stripe-js";
import axios from "axios";


const ReserveTableConfirmation = () => {
    const restaurantDatas = {
        "restaurantName" :  "SeaFood",
        "price" :  "399",
        "Quantity" :  "2",
        "table" :  "T1"
    }
    const makePayment = async ()=>{
      const stripe = await loadStripe("pk_test_51PRupYRoW6edqj51Z5AjX7Tw6iv3ozvQN1w2fCz9EN0bEMo0X5eEXJklPi69uPvSyYQogfPiqdHaqvxAoGWN7kdL00PObwguXK");
      await axios.post("http://localhost:3000/api/create-payment" , {restaurantDatas}).then((res)=>{
       console.log(res)  
        stripe?.redirectToCheckout({
            sessionId : res.data.sessionId
        })
      }).catch((error)=>{
        console.log(error);     
      }) 
    }
  return (
    <div className="h-screen flex">
      <div className="m-auto shadow-2xl h-[60%] w-[50%]">
        <div className="flex flex-col p-10 gap-10">
          <h1 className="text-2xl font-bold">Booking Summary</h1>
          <div className="h-[1px] w-full bg-gray-400"/>
          <div className="flex flex-col  gap-2 ">
            <div className="flex items-center gap-2 font-semibold">
              <RiCalendar2Fill />
              <span>1 May 2024</span>
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <HiUsers />
              Guests
            </div>
          </div>
        <div className="flex gap-60 ">
          <div className="w-[30%] flex flex-col gap-3 pt-7">
            <label htmlFor="Full_name" className="block font-bold text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              className="p-2 px-3 shadow-xl bg-gray-50 w-72 outline-none"
            />
            <label htmlFor="Full_name" className="block font-bold text-sm text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className="p-2 shadow-xl bg-gray-50 w-72 outline-none"
            />
          </div>
          <div className="flex flex-col w-[40%] h-[200px] gap-3 shadow-xl shadow-gray-300 bg-gray-50">
             <div className="">
                <h1 className="text-center font-semibold text-gray-700 text-lg font-sans p-3 ">Booking summary</h1>
                <div className="h-[0.2px]  bg-gray-400"/>
             </div>
             <div className="p-5 flex flex-col gap-2">
             <div className="flex justify-between">
             <p className=" text-sm">2 Person * 399</p>
             <p className="text-sm">$999</p>
             </div>
             <div className="flex justify-between">
             <p className="text-sm">GST</p>
             <p className="text-sm">$72</p>
             </div>
             </div>
             <div className="flex justify-between">
             <p className="px-5 font-bold">Total</p>
             <p className="px-5 font-bold">$999</p>
             </div>
          </div>
          </div>
          <button className="bg-orange-400 p-2.5 rounded-lg text-white font-bold hover:bg-orange-500 m-auto w-44" onClick={makePayment}>Reserve now</button>
        </div>
      </div>
    </div>
  );
};

export default ReserveTableConfirmation;
