import { useState } from "react"
import { OtpType } from "../utils/validations"
import { otpForm } from "../services/api";
import { useNavigate } from "react-router-dom";
import { localStorageGetItem } from "../utils/localStorageImpl";


interface ReturnType {
  OtpFn : (otp : OtpType)=> void;
  error : string | null;
  loading:boolean
}
function useOtpForm() : ReturnType {
    const navigate = useNavigate(); 
    const [error, setError] = useState<string | null>('');
    const [loading, setLoading] = useState<boolean>(false);
    const OtpFn = async(otp : OtpType )=>{
        setLoading(true);
        setError(null);
         try{
          const userId = localStorageGetItem("otpData");
          
          navigate('/login')
          return;
         }catch(error : any){
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
         }
    }
    return {error , loading , OtpFn};
}


export default useOtpForm;