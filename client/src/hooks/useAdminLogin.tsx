import { useState } from "react";
import { adminLogin } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

interface credentials {
  email: string;
  password: string;
}

interface LoginReturnType {
  login: (data: credentials) => void;
  loading: boolean;
  error: string | null;
}

const useAdminLogin = (): LoginReturnType => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (datas: credentials) => {
    setLoading(true);
    setError(null);
    try{    
        const {data} = await adminLogin(datas);
        console.log(data);
        setLoading(false)
        queryClient.invalidateQueries("validateToken");
        navigate('/admin/')
    }catch(error : any){
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        }
    }
    
  };
  return { login, loading, error };
};

export default useAdminLogin;
