import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./Contexts/AppContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppAContextProvider } from "./Contexts/AdminAppContext.tsx";
import { AppSContextProvider } from "./Contexts/SellerAppContext.tsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

const GoogleAPI = import.meta.env.VITE_API_CLOUD_URL;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={GoogleAPI}>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </PersistGate>
  </GoogleOAuthProvider>
);
