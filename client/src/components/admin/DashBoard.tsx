import React from "react";
import DashBoardStat from "./DashBoardStats";
import TransactionChart from "./TransactionChart";
import RecentRestaurants from "./RecentRestaurants";
import ChartTwo from "./ChartTwo";
import RecentUsers from "./RecentUsers";

const Dashboard: React.FC = () => {
  return (
    <div className=" flex flex-col gap-4 h-full ">
      <DashBoardStat />
      <div className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/2">
          <TransactionChart />
        </div>
        <div className="md:w-1/2 ">
          <ChartTwo />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="md:w-1/2">
          <RecentUsers />
        </div>
        <div className="md:w-1/2">
          <RecentRestaurants />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
