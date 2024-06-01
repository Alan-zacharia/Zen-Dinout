import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { localStorageSetItem } from "../utils/localStorageImpl";



interface credentials {
  username:string;
  email: string;
  password: string;
  role:string;
}

interface LoginReturnType {
  registerFn: (data: credentials | {}) => void;
  loadings: boolean;
  errors: string | null;
}

const useRegister = (): LoginReturnType => {
  const [errors, setError] = useState<string | null>(null);
  const [loadings, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const registerFn = async (datas: credentials | {}) => {
    setLoading(true);
    setError(null);
    try{    
        const {data} = await register(datas);  
        localStorageSetItem("otpData" , data.user._id as string);
        localStorageSetItem("remainingSeconds", "30");
        setLoading(false);
        navigate('/login');
    }catch(error : any){
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);  
        }
    }
    
  };
  return { registerFn , loadings, errors };
};

export default useRegister;
