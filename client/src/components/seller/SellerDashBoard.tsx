import React from "react";
import SellerChartOne from "./SellerChartOne";
import ChartTwo from "./ChartTwo";

const SellerDashBoard = () => {
  return (
    <div className="container px-4 py-8 mt-10 lg:mt-20">
      <div className="overflow-hidden">
        <div className="pt-10 text-center">
          <h1 className="text-xl font-bold flex justify-start">Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          <div className="bg-white shadow-lg shadow-gray-400 rounded-lg">
            <SellerChartOne />
            <h5 className="text-center font-bold text-blue-500">Revenue</h5>
          </div>
          <div className="bg-white shadow-lg shadow-gray-400">
            <ChartTwo />
            <h5 className="text-center font-bold text-blue-500 pt-10">
              Booking statistics
            </h5>
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-xl font-bold text-center flex justify-start pt-5">Recent bookings</h1>
          <div className="pt-4 overflow-x-auto shadow- shadow-black">
            <table className="table border-2 mx-auto">
              <thead>
                <tr className="font-bold text-sm text-black">
                  <th>Booking Id</th>
                  <th>Name</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Table size</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-2 border-b-blue-200">
                  <td>name</td>
                  <td>Wyman-Ledner</td>
                  <td>2:00 PM</td>
                  <td>5/11/2024</td>
                  <td>2</td>
                  <td>Confirmed</td>
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
                  <td>Confirmed</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashBoard;
