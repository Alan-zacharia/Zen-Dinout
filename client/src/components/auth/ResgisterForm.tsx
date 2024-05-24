import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
// import { validateRegister } from "../../utils/validation";
import signupLogo from "../../assets/SignupPage.jpg";
// import { registerUser } from "../../helpers/helperRoute";
// import { setItemStorage } from "../../utils/localstorageimpl";

const SignupForm: React.FC = () => {
  const [exist, isExist] = useState<string | null>(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    // validate: validateRegister,
    onSubmit: async (credentials) => {
    //   console.log(credentials);
    //       setItemStorage("userId", credentials.email);
    //   await registerUser(credentials)
    //     .then((res) => {
    //       const user = res.data.user;
           
    //       navigate("/otp");
    //       window.location.reload()
    //     })
    //     .catch((error) => {
    //       if (error.response && error.response.data.message) {
    //         isExist(error.response.data.message);
    //       }
    //       console.log(error.message);
    //     });
    },
  });

  return (
    <>
      <div className="w-full lg:w-1/2 bg-white flex flex-col p-8 lg:p-20 justify-between">
        <h1 className="text-xl text-black font-semibold mb-8">Zen Dinout</h1>

        <div className="w-full flex flex-col max-w-md mx-auto lg:mx-32 ">
          <div className="mb-10">
            <h3 className="text-3xl font-semibold mb-2">Register</h3>
            <p className="text-base mb-2">
              Welcome User! Please Enter your details.
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              {exist && <div className="text-red-500">{exist}</div>}
              <input
                type="text"
                placeholder="Name"
                className="w-full py-2 px-2 my-2 bg-transparent text-black border-black border-b outline-none focus:outline-none"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
              <input
                type="text"
                placeholder="Email"
                className="w-full py-2 px-2 my-2 bg-transparent text-black border-black border-b outline-none focus:outline-none"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
              <input
                type="password"
                placeholder="Password"
                className="w-full py-2 px-2 my-2 bg-transparent text-black border-black border-b outline-none focus:outline-none"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
              <input
                type="password"
                placeholder="confirm password"
                className="w-full py-2 px-2 my-2 bg-transparent text-black border-black border-b outline-none focus:outline-none"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <div className="flex items-center mb-6">
              {formik.errors.role && formik.touched.role ? (
                <select
                  {...formik.getFieldProps("role")}
                  className="font-bold focus:outline-none text-red-500"
                >
                  <option value="choose">Please choose role</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              ) : (
                <select
                  {...formik.getFieldProps("role")}
                  className="font-bold focus:outline-none text-gray-700"
                >
                  <option value="choose">Choose user or seller</option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              )}
              <p className="ml-auto text-sm cursor-pointer underline">
                Forgot password?
              </p>
            </div>

            <div className="flex flex-col mb-4">
              <button
                className="w-full bg-black text-white rounded-md py-3 text-center font-bold cursor-pointer mb-2"
                type="submit"
              >
                Register
              </button>

              <Link to={"/login"}>
                <button className="w-full bg-white border border-black rounded-md py-3 text-center font-semibold cursor-pointer">
                  Login
                </button>
              </Link>
            </div>
          </form>
        </div>

        <div className="flex justify-center">
          <p className="text-sm font-normal text-black">
            Don't have an account?
            <span className="font-semibold underline cursor-pointer">
              Sign up for free
            </span>
          </p>
        </div>
      </div>
      <div className="relative w-full lg:w-1/2 h-96 lg:h-screen lg:block  hidden md:block">
        <div className="absolute top-1/4 left-10 flex flex-col">
          <h1 className="text-4xl text-white font-semibold mb-4">
            Please register you details
          </h1>
          <p className="text-xl text-white font-semibold">free forth </p>
        </div>
        <img src={signupLogo} className="w-full h-full object-cover" />
      </div>
    </>
  );
};

export default SignupForm;
