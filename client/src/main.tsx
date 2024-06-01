import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./Contexts/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppAContextProvider } from "./Contexts/AdminAppContext.tsx";


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry : 0,
    }
  }
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="233308666436-717ghhr8afp7v0krbf0veqqndbgmiqqm.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppAContextProvider>
        <App />
        </AppAContextProvider>
      </AppContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
