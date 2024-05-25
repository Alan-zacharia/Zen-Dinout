import { useState } from "react";
import { adminLogin, login, register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { localStorageSetItem } from "../utils/localStorageImpl";

interface credentials {
  username:string;
  email: string;
  password: string;
  role:string;
}

interface LoginReturnType {
  registerFn: (data: credentials) => void;
  loading: boolean;
  error: string | null;
}

const useRegister = (): LoginReturnType => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const registerFn = async (datas: credentials) => {
    setLoading(true);
    setError(null);
    try{    
        const {data} = await register(datas);  
        localStorageSetItem("otpSession",'jj-544jj'+data.user._id+'jjk2hhg' as string)
        localStorageSetItem("otpData" , data.user._id as string);
        localStorage.setItem("remainingSeconds", "30");
        alert('kazhinu')
        setLoading(false)
        navigate('/otp');
    }catch(error : any){
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);  
        }
    }
    
  };
  return { registerFn , loading, error };
};

export default useRegister;
