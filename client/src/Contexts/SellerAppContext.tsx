import React, { useContext } from "react";
import { useQuery } from 'react-query';
import { validateToken } from "../services/SellerApiClient";



type AppContext = {
  isSellerLoggedIn :boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppSContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const { isError } = useQuery("validateSellerToken" ,validateToken , {
        retry : false
    });

  return (
    <AppContext.Provider
      value={{
     
        isSellerLoggedIn : !isError
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useSellerAppContext = () =>{
    const context = useContext(AppContext)
    return context as AppContext;
};