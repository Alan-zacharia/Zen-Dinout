import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { loginValidation } from "../../utils/validations";

const SellerLogin: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate : loginValidation,
    onSubmit: async (values) => {
       console.log(values)
    },
  });
  return (
    <section className="h-full flex justify-center items-center ">
      <div className="w-full max-w-md p-6 bg-black h-[500px] rounded-lg shadow-md opacity-70 ">
        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-3xl text-orange-500 ">
          Restaurant Login
        </h1>
        <form className="mt-32 space-y-6 pt-2" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-5 w-[400px] fixed ">
            <div className="relative">
              <input
                type="text"
                className="w-full px-10 py-3 bg-gray-200 outline-none font-semibold"
                placeholder="Email Address"
                {...formik.getFieldProps("email")}
              />
              <FaUser className="absolute top-3.5 left-3 " size={18} />
              {formik.touched.email && formik.submitCount > 0 && formik.errors.email && (
                <p className="text-red-500 font-semibold">{formik.errors.email}</p>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                className="w-full px-10 py-3 bg-gray-200  outline-none font-semibold"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              <FaLock className="absolute top-3.5 left-3 " size={17} />
              {formik.touched.password && formik.submitCount > 0 && formik.errors.password && (
                <p className="text-red-500 font-semibold">{formik.errors.password}</p>
              )}
            </div>
            
            <button
              className="w-full bg-blue-500 p-2 text-white font-semibold hover:bg-blue-600 text-lg"
              type="submit"
            >
              LOG IN
            </button>
            <div className="flex justify-between items-center">
              <Link to={"/Forgot-password"}>             
                <p className="text-xs font-semibold font-sans cursor-pointer text-white">
                  FORGOT PASSWORD ?
                </p>
              </Link>
              <Link to={"/restaurant/registeration"}>
                <p className="text-xs font-semibold font-sans cursor-pointer text-white  ">
                  NEW USER ? REGISTER
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellerLogin;
