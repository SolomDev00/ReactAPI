import axios from "axios";
import Cookies from "universal-cookie";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/NavBar";
import React, { useContext, useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accept, setAccept] = useState(false);
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const cookie = new Cookies();
  const nav = useNavigate();
  const userNow = useContext(User);

  async function Submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });
      const token = res.data.data.token;
      cookie.remove("remove");
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;
      userNow.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
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
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name.length < 2 && accept && (
                <p className="error">Name Must be more 2 letters!</p>
              )}
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {accept && emailError && (
                <p className="error">Email is been Taken</p>
              )}
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
              <label htmlFor="re-pass">Repeat Password</label>
              <input
                id="re-pass"
                type="password"
                placeholder="Repeat your password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              {setPasswordConfirmation !== password && accept && (
                <p className="error">Password don't Matching!</p>
              )}
            </div>
            <button id="btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
