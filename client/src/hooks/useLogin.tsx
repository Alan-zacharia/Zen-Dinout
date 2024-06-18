import { useState } from "react";
import {  login } from "../services/api";
import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "react-query";
import { sellerLogin } from "../services/SellerApiClient";
import { localStorageSetItem } from "../utils/localStorageImpl";

interface credentials {
  email: string;
  password: string;
};

interface LoginReturnType {
  loginFn: (data: credentials) => void;
  loading: boolean;
  error: string | null;
};

const useLogin = (): LoginReturnType => {
  // const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const loginFn = async (datas: credentials) => {
    setLoading(true);
    try{
      await login(datas).then((res)=>{
      console.log(res.data.user);
      setLoading(false);
      localStorageSetItem("%%register%%","true");
      // queryClient.invalidateQueries("validateToken");
      navigate("/");
      }).catch((error : any)=>{
      console.log(error)
      setLoading(false);
      setError(error.response.data.message)
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
