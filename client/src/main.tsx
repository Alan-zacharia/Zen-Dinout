import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="233308666436-717ghhr8afp7v0krbf0veqqndbgmiqqm.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
