import { useState } from "react";
import {  login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { sellerLogin } from "../services/SellerApiClient";
import { localStorageSetItem } from "../utils/localStorageImpl";

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
  const loginFn = async (datas: credentials) => {
    setLoading(true);
    setError(null);
    try{
      await login(datas).then((res)=>{
      console.log(res.data.user);
      setLoading(false);
      localStorageSetItem("%%register%%","true");
      queryClient.invalidateQueries("validateToken");
      navigate("/");
      }).catch((error)=>{
      console.log(error)
      });
    }catch(error: any) {
      setLoading(false);
      if (error.response && error.response.data &&
          error.response.data.message ) {
        setError(error.response.data.message);
      }
    }
  };
  return { loginFn, loading, error };
};

export default useLogin;
