import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SearchContextProvider from "./context/ImageContext.tsx";
import LikedContextProvider from "./context/LikedContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SearchContextProvider>
      <LikedContextProvider>
        <App />
      </LikedContextProvider>
    </SearchContextProvider>
  </React.StrictMode>
);
