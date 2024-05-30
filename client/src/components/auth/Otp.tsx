import { useFormik } from "formik";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import OtpTimer from "../layouts/Timer";
import { OtpType, validateOtp } from "../../utils/validations";
import useOtpForm from "../../hooks/useOtpForm";
import { useSelector } from "react-redux";


const Otp: React.FC = () => {

  const {error ,OtpFn ,loading} = useOtpForm();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: validateOtp,
    onSubmit: async (res : OtpType) => {   
      try {
       OtpFn(res);
      } catch (error) {
       console.log(error)
      }
    },
  });

  const handleOtpChange = (otp: string) => {
    formik.setFieldValue("otp", otp);
  };

  return (
    <>
      <div className="m-auto h-[400px] shadow-lg shadow-gray-400 w-[400px]">
        <h1 className=" p-8 text-2xl font-bold pt-10">
          <Link to="/register">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          Enter OTP
        </h1>
        <div className="p-8 pt-10">
          
          <form onSubmit={formik.handleSubmit}>
            { error && (
              <div  className="text-red-600">{error}</div>
            )}
            <div className="pb-5">
              <p className="font-bold text-sm text-purple-400 pb-3">Your Verification code has been sent to your email, please enter it here to update.</p>   
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500 pb-3">{formik.errors.otp}</div>
              )}         
              <OtpInput
                value={formik.values.otp}
                onChange={handleOtpChange}
                numInputs={6}
                renderInput={(props) => (
                <input {...props}
                type="number"
               
                style={{
                  width: '40px', 
                  height: '40px',
                  fontSize: '1.5rem', 
                  textAlign: 'center', 
                  marginRight: '13px', 
                  border: '1px solid #ccc', 
                  borderRadius: '2px', 
                  borderColor:"green",
                  boxSizing: 'border-box',     
                }} 
               
                />)}
                />
                <OtpTimer/>
            
            </div>
          
            <button
              className="shadow-lg shadow-gray-500 bg-orange-400 px-3 py-3 w-full"
              type="submit"
              disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;




