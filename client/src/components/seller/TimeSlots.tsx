import React from "react";

const TimeSlots = () => {
  return (
    <div className="h-full lg:w-[800px] w-screen mx-10 mt-24 fixed">
      <div className="pt-10 ">
        <h1 className="text-xl font-bold ">Time Slots</h1>
        <form >
          <div className="flex flex-col gap-4 mt-7">
              <h1 className="text-base font-bold text-orange-500 ">Add new slots</h1>
            <div className="flex flex-row gap-4 pb-5">
              
          
                <div>
                  <label className="text-sm font-semibold block p-2">Start Time</label>
                  <input type="time" className="border border-gray-300 rounded-md p-2"/>  
                </div>
                <div>
                <label className="text-sm block font-semibold p-2">End Time</label>
                <input type="time" className="border border-gray-300 rounded-md p-2"/>  
                </div>
              </div>
           
          </div>
        </form>
        <div className="overflow-x-auto  h-[500px]">
          <table className="table table-pin-rows">
            <thead>
              <tr>
                <th className="text-base font-bold">Time</th>
                <th className="text-base font-bold ">Actions</th>
              </tr>
            </thead>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
            <tbody>
              <td>2:00 - 3:00</td>
              <td><button className="btn btn-error btn-sm text-white">Delete</button></td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;
