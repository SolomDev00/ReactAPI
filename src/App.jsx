import React from "react";
import { Route, Routes } from "react-router-dom";
// Website
import Home from "./Pages/Home";
// Auth
import Login from "./Pages/Website/Auth/Login";
import Sign from "./Pages/Website/Auth/Register";
// Dashboard
import Users from "./Pages/Dashboard/Users/Users";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/Persist";
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import UpdateProduct from "./Pages/Dashboard/Products/UpdateProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Sign />}></Route>
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="users/:id" element={<UpdateUser />}></Route>
              <Route path="user/create" element={<CreateUser />}></Route>
              <Route path="products/" element={<Products />}></Route>
              <Route path="products/create" element={<NewProduct />}></Route>
              <Route path="products/update" element={<UpdateProduct />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
