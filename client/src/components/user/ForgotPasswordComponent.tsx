import React from "react";

const ForgotPasswordComponent = () => {
  return (
    <div className="m-auto h-[400px] shadow-lg shadow-gray-400  w-[400px] flex justify-center">
      <form className="flex flex-col gap-5 justify-center">
        <div className="text-start pb-5 ">
          <h1 className="text-xl font-bold text-black">x Forgot Password</h1>
        </div>

        <label htmlFor="password" className="text-base font-bold text-blue-500">
          New Password
        </label>
        <input
          type="password"
          className="p-3 outline-none border border-b-neutral-700 text-sm  w-80 "
        />
        <label htmlFor="password" className="text-base font-bold text-blue-500">
          Confirm Password
        </label>
        <input
          type="password"
          className="p-3 outline-none border border-b-neutral-700 text-sm  w-80 "
        />
        <button className="w-full bg-red-600 p-3 rounded-full text-white font-bold hover:bg-red-500">
          confirm
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordComponent;
