import { useState } from "react";
import {  login } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

interface credentials {
  email: string;
  password: string;
  role: string;
}

interface LoginReturnType {
  loginFn: (data: credentials) => void;
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
    try {
      const { data } = await login(datas);
      setLoading(false);
      queryClient.invalidateQueries("validateToken");
      if (data.user?.role == "user") {
        navigate("/");
      } else {
        navigate("/restaurant");
      }
      return;
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
