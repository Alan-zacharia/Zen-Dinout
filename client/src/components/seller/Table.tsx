import React, { useEffect, useState } from "react";
import TableCreateModal from "./shared/TableCreateModal";
import { getTablesSlots } from "../../services/SellerApiClient";
import { tableSlotTypes } from "../../types/restaurantTypes";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {RootState} from "../../redux/store";

const Table = () => {
  const [tableDatas, setTableDatas] = useState<tableSlotTypes[]>([]);
  const {isAuthenticated , role , id} = useSelector((state : RootState) => state.user)
  const fetchTableData = async () => {
    try {
        const res = await getTablesSlots(id as string);
        console.log(res , id)
        setTableDatas(res.data.tableSlotDatas);
    
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <div className="h-full mt-32 ">
      <div className="pt-10 flex  justify-between">
        <h1 className="text-xl font-bold ">Table Management</h1>
        <TableCreateModal MountAfterUpdate={fetchTableData} tableDatas={tableDatas} />
      </div>
      <div className="overflow-x-auto shadow-sm shadow-orange-200  mt-14">
        <table className="table">
          <thead>
            <tr className="font-bold text-sm text-red-500">
              <th>SL NO</th>
              <th>Table No</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          {tableDatas && tableDatas.length > 0 ? (
            tableDatas.map((data: tableSlotTypes, index: number) => {
              return (
                <tbody>
                  <tr className=" border-red-500 font-bold text-gray-500 text-base" key={index}>
                    <td className="text-black font-semibold">{index + 1}</td>
                    <td className="text-black font-semibold">{data.tableNumber}</td>
                    <td className="text-black font-semibold">{data.tableCapacity}</td>
                    { data.tableLocation == "In" ? (
                    <td className="font-bold text-green-700">{data.tableLocation}</td>
                    ):(
                      <td className="font-bold text-blue-600">{data.tableLocation}</td>
                    )}
                    <th>
                      <Link to={`/restaurant/view-table/${data._id}`}>
                      <button className="btn btn-primary btn-sm text-white hover:bg-blue-500">
                         view
                      </button>
                      </Link>
                    </th>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <div />
          )}
        </table>
      </div>
      {tableDatas && tableDatas.length < 1 && (
        <div className="text-xl font-bold flex justify-center p-10">
          No Slots available
        </div>
      )}
    </div>
  );
};

export default Table;
