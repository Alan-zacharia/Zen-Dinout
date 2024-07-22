import { useFormik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { tableSlotTypes } from "../../../types/restaurantTypes";
import {validateTableSlot} from "../../../utils/validations"
import { tablesSlotCreationApi } from "../../../services/SellerApiClient";
import  { toast , Toaster} from "react-hot-toast";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const TableCreateModal = ({MountAfterUpdate , tableDatas} : {MountAfterUpdate : ()=>void ; tableDatas : tableSlotTypes[]}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const inputElement = useRef<HTMLInputElement | null>(null);
  const {id} = useSelector((state : RootState)=>state.user)
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    inputElement.current?.focus();
  }, [showModal]);

  const formik = useFormik<tableSlotTypes>({
    initialValues: {
      tableId:"",
      tableNumber: "",
      tableCapacity: 2,
      tableLocation: "",
    },
    validationSchema:validateTableSlot,
    onSubmit: async (tableAddingDatas: tableSlotTypes, {resetForm}) => {
     const isDuplicateTableNumber = tableDatas.some(
        (table)=> table.tableNumber === tableAddingDatas.tableNumber && table.tableLocation === tableAddingDatas.tableLocation
     );
     if(isDuplicateTableNumber){
        toast.error("Table name already exists.")
        return;
     }
     await tablesSlotCreationApi(tableAddingDatas , id as string).then((res)=>{
        toast.success(res.data.message);
        setShowModal(false);
        resetForm()
        MountAfterUpdate()
     }).catch((error : any)=>{
      console.log(error.response.data.message); 
     });
    },
  });
  return (
    <>
    <Toaster position="top-center"/>
      <button
        onClick={toggleModal}
        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none  focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
      >
        <span className="font-bold text-lg">+</span>Add Table
      </button>
      {showModal && (
        <div
          id="table-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-gray-200 bg-opacity-45 flex justify-center items-center"
        >
          <div className="m-auto bg-white rounded-xl max-h-md flex shadow-xl flex-col">
            <div className="p-5 flex justify-between">
              <h4 className=" font-bold text-blue-500 font-sans">
                Add Table
              </h4>
              <div>
                <button
                  className=" hover:bg-gray-300 text-black p-1"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3  h-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="h-[0.1px] bg-gray-300 w-full" />
            <div className="p-4">
              <form
                className="flex gap-3 flex-col"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex flex-row gap-36">
                  <label htmlFor="Tabel_number" className="block font-bold ">
                    Table
                  </label>
                  <label htmlFor="Tabel_number" className="block font-bold">
                    Capacity
                  </label>
                </div>
                <div className="flex  gap-2">
                  <input
                    type="text"
                    ref={inputElement}
                    placeholder="Table number"
                    className="input input-bordered outline-none focus:border-none  w-full max-w-xs"
                    {...formik.getFieldProps("tableNumber")}
                  />
                 
                  <select
                  className="select select-bordered outline-none focus:border-none  w-full max-w-xs font-semibold"
                  {...formik.getFieldProps("tableCapacity")}
                >
                
                <option disabled selected>
                    Table Capacity
                  </option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                </select>
                
                </div>
                {formik.touched.tableNumber && formik.submitCount > 0 && formik.errors.tableNumber &&(
                <div className="text-red-500 font-semibold">{formik.errors.tableNumber}</div>
                )}
                <label htmlFor="Location" className="font-bold ">
                  Location
                </label>
                <select
                  className="select select-bordered outline-none focus:border-none  w-full font-semibold"
                  {...formik.getFieldProps("tableLocation")}
                >
                  <option disabled value="" >
                    Location
                  </option>
                  <option value="In">Indoor</option>
                  <option value="Out">Out door</option>
                </select>
                {formik.touched.tableLocation && formik.submitCount > 0 && formik.errors.tableLocation &&(
                <div className="text-red-500 font-semibold">{formik.errors.tableLocation}</div>
                )}
                <button
                  className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 text-white font-bold"
                  type="submit"
                >
                  Add Table
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableCreateModal;
