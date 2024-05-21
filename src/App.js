import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./features/product/Products";
import UserProfile from "./features/user/UserProfile";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Signup />} />
            <Route path="products" element={<Products />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
