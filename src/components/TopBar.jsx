import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function TopBar() {
  return (
    <div className="container d-row shadow">
      <h1>AstroStore</h1>
      <Link to="/" className="btn-nav">
        Go To Website!
      </Link>
    </div>
  );
}
