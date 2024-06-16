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
  const registerFn = async (datas: credentials | {}) => {
    setLoading(true);
    setError(null);
    try{    
        await register(datas).then((res)=>{
         console.log(res)
        }).catch((error)=>{
          setLoading(false);
          console.log(error)
        });
        setLoading(false);
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
