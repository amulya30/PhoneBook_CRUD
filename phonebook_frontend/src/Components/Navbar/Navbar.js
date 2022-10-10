import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let tokenVal = window.localStorage.getItem("token");
    setToken(tokenVal);
  });

  return (
    <div className="navbar">
      <div className="container flex">
        <h1>PhoneBook</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              {token ? (
                <Link to="/logout">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
