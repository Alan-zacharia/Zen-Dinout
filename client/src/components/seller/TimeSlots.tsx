import React, { useState, useEffect } from "react";
import TimeSlotAddModal from "./shared/TimeSlotAddModal";
import ConfrimationModal from "./shared/ConfirmationDeleteModal";
import axiosInstance from "../../api/axios";
interface TimeSlotType {
  startTime: string;
  endTime: string;
  _id: string;
}
const TimeSlots: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlotType[]>([]);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [timeSlotId, setTimeSlotId] = useState<string>("");
  useEffect(() => {
    axiosInstance
      .get("/restaurant/get-time-slots")
      .then((res) => {
        setTimeSlots(res.data.timeSlots);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  }, []);

  const formatTime = (time: string): string => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  const addTimeSlot = (newSlot: TimeSlotType) => {
    setTimeSlots((prevSlots) => [...prevSlots, newSlot]);
  };

  const handleOpenConfirmation = (timeSlotId : string) => {
    setOpenConfirmation(true);
    setTimeSlotId(timeSlotId)
  };

  return (
    <>
      <ConfrimationModal
        onClose={() => setOpenConfirmation(false)}
        onConfirm={() => {
          setOpenConfirmation(false);
        }}
        openConfirmation={openConfirmation}
        timeSlotId={timeSlotId}
        setTimeSlots={setTimeSlots}
      />
      <div className=" lg:w-[700px] w-screen mx-10 mt-24 relative">
        <div className="pt-10">
          <h1 className="text-xl font-bold">Time Slots</h1>
          <div className="flex justify-end">
            <TimeSlotAddModal addTimeSlot={addTimeSlot} timeSlots={timeSlots} />
          </div>
          <div className="px-4 flex gap-[360px] w-[550px] p-3 border">
            <h5 className="text-black font-bold text-lg ">Time</h5>
            <h5 className="text-black font-bold text-lg ">Action</h5>
          </div>
          <div className="overflow-x-auto h-[500px] w-[550px]  shadow-xl border border-gray-200">
            {timeSlots && timeSlots.length > 0 ? (
              <table className="table-fixed w-full font-bold text-gray-600">
                <tbody>
                  {timeSlots.map((slot, index) => (
                    <tr key={index} className="border-b h-14">
                      <td className="text-base px-4 py-2  w-1/2">
                        {formatTime(slot.startTime)} -{" "}
                        {formatTime(slot.endTime)}{" "}
                      </td>
                      <td className="px-36 py-2 w-1/2">
                        <button className="btn btn-error btn-sm text-white"
                      onClick={()=>handleOpenConfirmation(slot._id)}>
                        Delete
                      </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="flex px-40  text-black font-bold text-lg p-5">
                No time slots added
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSlots;
