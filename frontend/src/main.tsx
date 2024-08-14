import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import SocketContextProvider from "./context/SocketContext.tsx"
import useConversation from "./store/useConversation.tsx";

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  (window as any).useConversation = useConversation;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
