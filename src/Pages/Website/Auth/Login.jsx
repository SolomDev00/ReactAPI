import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/NavBar";
import React, { useContext, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [accept, setAccept] = useState(false);
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState(false);

  const cookie = new Cookies();
  const nav = useNavigate();
  const userNow = useContext(User);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.remove("remove");
      cookie.set("Bearer ", token);
      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="parent">
        <div className="form-light">
          <form onSubmit={Submit}>
            <div className="inputs">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="pass">Password</label>
              <input
                id="pass"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 8 && accept && (
                <p className="error">Password must been 8 letters!</p>
              )}
            </div>
            {accept && Err && <p className="error">Wrong Email or Password!</p>}
            <button id="btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
