import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./Contexts/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppAContextProvider } from "./Contexts/AdminAppContext.tsx";
import { AppSContextProvider } from "./Contexts/SellerAppContext.tsx";
import {store} from "./app/store.ts"
import { Provider } from "react-redux";

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
    <Provider store={store}>
    <GoogleOAuthProvider clientId={GoogleAPI}>
      <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppAContextProvider>
          <AppSContextProvider>
              <App />
        </AppSContextProvider>
        </AppAContextProvider>
      </AppContextProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
