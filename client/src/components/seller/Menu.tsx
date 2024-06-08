import React from "react";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import IMg from "../../assets/Login-image.jpg";
import Form from "../layouts/Form";

const Menu: React.FC = () => {
  return (
    <div className="h-full pt-32 px-10 z-50">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-orange-500">Menu</h1>
        <div className="flex justify-end ">
          <Form />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="pt-10 flex lg:flex-row flex-col gap-5 ">
          <select className="select select-warning w-full max-w-[200px] font-semibold text-orange-500">
            <option disabled selected>
              Categories
            </option>
            <option className="text-sm font-bold text-orange-500">
              Starter
            </option>
            <option className="text-sm font-bold text-orange-500">
              Break Fast
            </option>
            <option className="text-sm font-bold text-orange-500">
              Main Course
            </option>
            <option className="text-sm font-bold text-orange-500">
              Drinks
            </option>
            <option className="text-sm font-bold text-orange-500">
              Dessert
            </option>
          </select>
          <div >
            <input
              type="text"
              placeholder="Search"
              className=" border border-orange-400 p-[10px] outline-none rounded-xl w-full lg:w-[500px] max-w-xs"
            />
          </div>
          <div className="form-control w-24">
            <label className="cursor-pointer label">
              <input type="checkbox" className="toggle toggle-accent " />
              <span className="label-text text-orange-400 font-bold text-lg">
                Veg
              </span>
            </label>
          </div>
        </div>
        <div></div>
        <h1 className="text-2xl font-bold text-orange-400 ">Starters</h1>
        <div className="flex flex-wrap gap-5 overflow-x-auto  h-[280px] lg:h-[570px] shadow-xl  rounded-md ">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
            return (
              <div className=" w-full max-w-[250px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition transform duration-200 hover:-translate-y-1">
                <a href="#">
                  <img
                    className="p-8 rounded-t-lg"
                    src={IMg}
                    alt="product image"
                  />
                </a>
                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      Chicken popper
                    </h5>
                  </a>
                  <div className="flex items-center mt-2.5 mb-3"></div>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      $599
                    </span>
                    <div className="flex gap-2">
                      <FaEdit
                        size={18}
                        className="text-red-600 cursor-pointer"
                      />
                      <FaTrash
                        size={14}
                        className="text-red-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
