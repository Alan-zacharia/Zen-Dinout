import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./Contexts/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppAContextProvider } from "./Contexts/AdminAppContext.tsx";
import { AppSContextProvider } from "./Contexts/SellerAppContext.tsx";
import { useAuth } from "./Contexts/OtpContext.tsx";

const GoogleAPI = import.meta.env.VITE_API_CLOUD_URL 
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry : 0,
    }
  }
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GoogleAPI}>
      <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppAContextProvider>
          <AppSContextProvider>
            <useAuth>
              <App />
            </useAuth>
        </AppSContextProvider>
        </AppAContextProvider>
      </AppContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
