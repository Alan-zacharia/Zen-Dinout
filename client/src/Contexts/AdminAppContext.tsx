import { useQuery } from "react-query";
import { validateToken_admin } from "../services/adminApiClient";
import React, { useContext } from "react";

type AppContext = {
  isAdminLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppAContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateAToken", validateToken_admin, {
    retry: false,
  });
  return (
    <AppContext.Provider value={{ isAdminLoggedIn: !isError }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAdminAppContext = () =>{
    const context = useContext(AppContext)
    return context as AppContext;
};
