import React from "react";

const Reservation = () => {
  return (
    <div className="pt-32 ">
      <div className="">
        <h1 className="text-xl  font-bold ">Reservations</h1>
      </div>
      <div className="overflow-x-auto  shadow-black pt-10">
            <table className="table border-2  ">
              <thead >
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
              <tbody >
                <tr className="border-b-2 border-b-blue-200">
                  <td>name</td>
                  <td>Wyman-Ledner</td>
                  <td>2:00 PM</td>
                  <td>5/11/2024</td>
                  <td>2</td>
                  <td>Confrimed</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                <tr className="border-b-2 border-b-blue-200">
                  <td>name</td>
                  <td>Wyman-Ledner</td>
                  <td>2:00 PM</td>
                  <td>5/11/2024</td>
                  <td>2</td>
                  <td>Confrimed</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
    
    </div>
  );
};

export default Reservation;
