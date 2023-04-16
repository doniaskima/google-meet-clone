import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/globals.scss"

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      
        <App />
    
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);