import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import "./i18n";
import { CardsDataProvider } from "./pages/Context/CardsContext.jsx";
import { AuthorizationProvider } from "./pages/Context/AuthorizationContext.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(

  <AuthorizationProvider>
    <CardsDataProvider>
      <App />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },

          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "black",
            color: "white",
          },
        }}
      />
    </CardsDataProvider>
  </AuthorizationProvider>

  <CardsDataProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },

        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "black",
          color: "white",
        },
      }}
    />
  </CardsDataProvider>

);
