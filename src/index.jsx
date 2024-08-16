import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./Pages/login.jsx";
import Dashboard from "./Pages/menu/Dashboard.jsx";
import Category from "./Pages/menu/Category.jsx";
import Products from "./Pages/menu/Products.jsx";
import Articles from "./Pages/menu/Articles.jsx";
import Users from "./Pages/menu/Users.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Category" element={<Category />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Articles" element={<Articles />} />
      <Route path="/Users" element={<Users />} />
    </Routes>
  </Router>
);
