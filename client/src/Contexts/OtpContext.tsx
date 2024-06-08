import React, { createContext, useContext, useState } from 'react';

interface AuthContextValue {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export const AuthProvider  = ({ children } : {children : React.ReactNode} ) => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext)
    return context as AuthContextValue;
};
