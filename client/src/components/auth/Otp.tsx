import { useFormik } from "formik";
import React, {  useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { validateOtp } from "../../utils/validation";
// import { verifyOtp } from "../../helpers/helperRoute";
// import { getItemStorage, removeItemStorage } from "../../utils/localstorageimpl";
import OtpInput from "react-otp-input";
import OtpTimer from "../layouts/Timer";


const Otp: React.FC = () => {
  const [error, isOtpError] = useState<string>("");
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    // validate: validateOtp,
    onSubmit: async (res) => {
    //   const email =  getItemStorage("userId");
    //   console.log(email)
    //   try {
    //     console.log(email)
    //     if (email) {
    //       const response = await verifyOtp(email, res.otp);
    //       const { message } = response.data;
    //       console.log(message);
         
           
          
    //       navigate("/login");
    //     }
    //   } catch (error: any) {
    //     if (
    //       error.response &&
    //       error.response.data &&
    //       error.response.data.message
    //     ) {
    //       isOtpError(error.response.data.message);
    //     } else {
    //       isOtpError("An error occurred. Please try again later.");
    //     }
    //   }
    },
  });
  const handleOtpChange = (otp: string) => {
    console.log('sdfsdfsdf')
    formik.setFieldValue("otp", otp);
    console.log(otp);
  };
  const hanldeResendOtp = ()=>{
    // const email =  getItemStorage("userId");
      console.log('resend ') 
  }

  return (
    <>
      <div className="absolute px-32 pt-6">
        
      </div>
      <div className="m-auto h-[400px] shadow-lg shadow-gray-400 w-[400px]">
        <h1 className=" p-8 text-2xl font-bold pt-10">
          <Link to="/register">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          Enter OTP
        </h1>
        <div className="p-8 pt-10">
          <form onSubmit={formik.handleSubmit}>
            <div className="pb-5">
              <p className="font-bold text-lg pb-3">OTP</p>
              {error && <div className="text-red-500">{error}</div>}
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
                <OtpTimer handleResend={hanldeResendOtp} />
              {formik.touched.otp && formik.errors.otp && (
                <div className="text-red-500">{formik.errors.otp}</div>
              )}
            </div>
          
            <button
              className="shadow-lg shadow-gray-500 bg-orange-400 px-3 py-3 w-full"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Otp;




