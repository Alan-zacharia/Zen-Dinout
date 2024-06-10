import { useState } from "react";
import {  login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { sellerLogin } from "../services/SellerApiClient";

interface credentials {
  email: string;
  password: string;
  role: string;
}

interface LoginReturnType {
  loginFn: (data: credentials , role : string) => void;
  loading: boolean;
  error: string | null;
}

const useLogin = (): LoginReturnType => {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginFn = async (datas: credentials , role : string) => {
    setLoading(true);
    setError(null);
    try {
    
      if (role == "user") {
        const { data } = await login(datas);
        console.log(data.user) 
        setLoading(false);
        queryClient.invalidateQueries("validateToken");
        navigate("/");
      } else {
        console.log('Restaurant')
        const { data } = await sellerLogin(datas);
        console.log(data.user) 
        setLoading(false);
        queryClient.invalidateQueries("validateSellerToken");
        navigate("/restaurant/");
      }
    } catch (error: any) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return { loginFn, loading, error };
};

export default useLogin;
