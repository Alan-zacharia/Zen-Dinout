import React, { useState } from "react";
import { sellerRegisteration } from "../services/SellerApiClient";
import { credentials } from "../services/SellerApiClient";

interface LoginReturnType {
  registerFn: (data: credentials) => void;
  
  error: string | null;
}

const useSellerRegisteration = (): LoginReturnType => {
  const [error, setError] = useState<string | null>(null);

  const registerFn = async (datas: credentials) => {
    
    try {
      const { data } = await sellerRegisteration(datas);
      console.log(data.message)
      
    } catch (error: any) {
   
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return { error, registerFn };
};

export default useSellerRegisteration;
