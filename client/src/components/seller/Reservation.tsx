import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { BookingDetailsType } from "../../types/restaurantTypes";

const Reservation: React.FC = () => {
  const bookingId = "1234555566";
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType[]>(
    []
  );
  useEffect(() => {
    axiosInstance
      .get(`/restaurant/reservations/${bookingId}`)
      .then((res) => {
        console.log(res);
        setBookingDetails(res.data.bookingDetails);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, [bookingId]);
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
                    <td>{bookingDetails.bookingId}</td>
                    <td>{bookingDetails.email}</td>
                    <td>{bookingDetails.bookingTime}</td>
                    <td>{bookingDetails.bookingDate}</td>
                    <td>{bookingDetails.tableSize}</td>
                    <td>{bookingDetails.bookingStatus}</td>
                    <th>
                      <Link to={`/restaurant/reservations/view/${bookingDetails.bookingId}`}>
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
