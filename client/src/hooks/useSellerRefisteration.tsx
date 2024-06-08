import React, { useState } from "react";
import { sellerRegisteration } from "../services/SellerApiClient";
import { credentials } from "../services/SellerApiClient";

interface LoginReturnType {
  registerFn: (data: credentials) => void;
  loading: boolean;
  error: string | null;
}

const useSellerRefisteration = (): LoginReturnType => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const registerFn = async (datas: credentials) => {
    setLoading(true);
    try {
      const { data } = await sellerRegisteration(datas);
      console.log(data.success , data.message)
      setLoading(false);
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

  return { error, loading, registerFn };
};

export default useSellerRefisteration;
