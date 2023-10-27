import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Views/Home";
import Number from "./Views/Number";
import Cash from "./Views/Cash";
import CEP from "./Views/CEP";
import Vechile from "./Views/Vechile";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/number" element={<Number />} />
        <Route path="/cash" element={<Cash />} />
        <Route path="/cep" element={<CEP />} />
        <Route path="/vechile" element={<Vechile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
