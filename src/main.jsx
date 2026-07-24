import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { HashRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import { AuthProvider } from "./context/AuthContext";
import VisitorTracker from "./components/VisitorTracker";
import { HelmetProvider } from "react-helmet-async";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <HelmetProvider>
    <AuthProvider>
      
      <VisitorTracker />
      <App />
      <Toaster position="top-center" richColors closeButton />
    </AuthProvider>
    </HelmetProvider>
  </BrowserRouter>
);
