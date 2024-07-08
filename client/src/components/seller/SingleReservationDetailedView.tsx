import React, { ChangeEvent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { toast } from "react-hot-toast";
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
const SingleReservationDetailedView: React.FC = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<Booking>();
  const { bookingId } = useParams();
  useEffect(() => {
    axiosInstance
      .get(`/restaurant/reservations/view/${bookingId}`)
      .then((res) => {
        setBookingDetails(res.data.bookingDetails);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }, []);
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const updateStatus = e.target.value;
    console.log(updateStatus);
    setStatusChange(updateStatus);
  };
  const [statusData, setStatusChange] = useState<string | undefined>(
    bookingDetails?.bookingStatus
  );
  const handleUpdate = () => {
    axiosInstance
      .patch(`/restaurant/reservation/update-status/${bookingId}`, {
        statusData,
      })
      .then((res) => {
        console.log(res.data);
        setBookingDetails(res.data.bookingDetails);
        toast.success("Booking status updated successfully");
        navigate("/restaurant/reservations")
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  return (
    <div className="flex justify-center mt-32">
      {bookingDetails && (
        <div className="h-[500px] shadow-lg w-[700px] p-5">
          <div className="text-left ">
            <h3 className=" text-xl font-bold">Update Reservation</h3>
            <div className="bg-black w-full h-[.5px] mt-3" />
          </div>
          <div>
            <div className="flex gap-32 p-10">
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-bold">Booking Details</h4>
                <div className="grid  gap-2">
                  <p className="font-bold text-gray-600">
                    Booking ID &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :
                  </p>
                  <p className="text-gray-800">{bookingDetails.bookingId}</p>
                  <p className="font-bold text-gray-600">
                    Booking Status &nbsp;&nbsp; &nbsp; :
                  </p>
                  <select
                    className="select select-warning font-bold text-gray-600"
                    onChange={handleStatusChange}
                  >
                    <option
                      disabled
                      selected
                      className="text-gray-500 font-semibold"
                    >
                      {bookingDetails.bookingStatus.toLowerCase()}
                    </option>
                    {bookingDetails.bookingStatus !== "CANCELLED" && (
                      <>
                        {bookingDetails.bookingStatus !== "PENDING" && (
                          <option value={"PENDING"}>Pending</option>
                        )}
                        {bookingDetails.bookingStatus !== "COMPLETED" && (
                          <option value={"COMPLETED"}>Completed</option>
                        )}
                        {bookingDetails.bookingStatus !== "CONFIRMED" && (
                          <option value={"CONFIRMED"}>Confirmed</option>
                        )}
                        {bookingDetails.bookingStatus !== "CANCELLED" && (
                          <option value={"CANCELLED"}>Cancel</option>
                        )}
                        {bookingDetails.bookingStatus !== "CHECKED" && (
                          <option value={"CHECKED"}>Checked</option>
                        )}
                      </>
                    )}
                  </select>
                  <p className="font-bold text-gray-600">
                    Payment Method &nbsp;:
                  </p>
                  <p className="text-gray-500 font-semibold">
                    {bookingDetails?.paymentMethod} -{" "}
                    <span className="">{bookingDetails?.paymentStatus}</span>
                  </p>
                  <p className="font-bold text-gray-600">
                    Total Amount &nbsp;&nbsp; &nbsp; &nbsp; :
                  </p>
                  <p className="text-gray-800">
                    ₹ {bookingDetails.totalAmount}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-bold">Customer Details</h4>
                <div className="grid  gap-2">
                  <p className="font-bold text-gray-600">
                    Name &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp; &nbsp; &nbsp;&nbsp;:
                  </p>
                  <p className="text-gray-800">
                    {bookingDetails.userId.username}
                  </p>
                  <p className="font-bold text-gray-600">
                    Email &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp;:
                  </p>
                  <p className={"text-gray-800"}>
                    {bookingDetails.userId.email}
                  </p>
                  <p className="font-bold text-gray-600">
                    Table &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
                    &nbsp; &nbsp; &nbsp;&nbsp; :
                  </p>
                  <p className="font-bold text-gray-600">
                    Date &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp;&nbsp; &nbsp;:
                  </p>
                  <p className="font-bold text-gray-600">
                    Guest &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; :
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="font-bold bg-green-500 p-2 rounded-lg px-3 text-white hover:bg-green-600"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleReservationDetailedView;
