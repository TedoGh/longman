import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import "./i18n";
import { CardsDataProvider } from "./pages/Context/CardsContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
    <CardsDataProvider>
    <App />
    <Toaster position="top-center" gutter={12} containerStyle={{margin: '8px'}} toastOptions={{
        success: {
            duration: 3000,
        },

        error: {
            duration: 5000,
        },
        style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'black',
            color: 'white',
        }
        
    }} />
    </CardsDataProvider>
 
);
