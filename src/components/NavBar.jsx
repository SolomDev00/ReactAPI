import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function HandleLogout() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer", { path: "/" });
    window.location.pathname = "/";
  }
  return (
    <div className="container shadow">
      <nav>
        <div className="d-flex">
          <Link to={"/"} className="router">
            Home
          </Link>
        </div>
        <div className="d-flex">
          {!token ? (
            <>
              <Link to={"/login"} className="btn-nav">
                Login
              </Link>
              <Link to={"/register"} className="btn-nav">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to={"/dashboard"} className="btn-nav">
                Dashboard
              </Link>
              <div className="btn-nav" onClick={HandleLogout}>
                Logout
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
