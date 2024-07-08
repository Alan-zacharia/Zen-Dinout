import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { textColours } from "../../utils/dateValidateFunctions";

interface Booking {
  _id: string;
  bookingId: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  tableSlotId: string;
  restaurantId: {
    _id: string;
    restaurantName: string;
  };
  bookingTime: string;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  totalAmount: number;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Reservation: React.FC = () => {
  const [bookingDetails, setBookingDetails] = useState<Booking[]>([]);
  useEffect(() => {
    const fetchReservations = () => {
      axiosInstance
        .get("/restaurant/reservations/")
        .then((res) => {
          console.log(res.data.Reservations);
          setBookingDetails(res.data.Reservations);
        })
        .catch(({ response }) => {
          console.log(response);
        });
    };
    fetchReservations();
    // const intervalId = setInterval(fetchReservations, 3000);
    // return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="pt-32 ">
      <div className="">
        <h1 className="text-xl  font-bold ">Reservations</h1>
      </div>
      <div className="overflow-x-auto  shadow-black pt-10">
        <table className="table border-2  ">
          <thead>
            <tr className="font-bold text-sm text-orange-500">
              <th>Booking Id</th>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
              <th>Table size</th>
              <th>status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails && bookingDetails.length > 0 ? (
              bookingDetails.map((bookingDetails) => {
                return (
                  <tr className="border-b-2 border-b-blue-200">
                    <td>
                      <p>{bookingDetails.bookingId.substring(0, 12)}...</p>
                    </td>
                    <td>{bookingDetails.userId.username}</td>
                    <td>{bookingDetails.bookingTime}</td>
                    <td>
                      {
                        new Date(bookingDetails.bookingDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </td>
                    <td>{bookingDetails.restaurantId.restaurantName}</td>
                    <td
                      className={`font-bold ${textColours(
                        bookingDetails.bookingStatus
                      )}`}
                    >
                      {bookingDetails.bookingStatus.toLocaleLowerCase()}
                    </td>
                    <th>
                      <Link
                        to={`/restaurant/reservations/view/${bookingDetails.bookingId}`}
                      >
                        <button className="btn btn-ghost btn-xs">
                          details
                        </button>
                      </Link>
                    </th>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  <h1 className="text-xl font-bold text-gray-600">
                    No Reservations Available
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
