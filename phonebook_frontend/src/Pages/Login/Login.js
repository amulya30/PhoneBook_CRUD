import React from "react";
import { Input, Button } from "../../Components";
import { useState} from "react";
import axios from "axios";
import { BASE_URL } from "../../APP_EXPORTS";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [emailInput, setEmaiInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const BASE_API_URL = BASE_URL;

  let navigate = useNavigate();

  const handleSubmit = (emailInput, passInput) => {
    const userData = {
      email: emailInput,
      pass: passInput,
    };

    axios
      .post(`${BASE_API_URL}/users/login`, userData)
      .then((res) => {
        console.log("Sign In Success!");
        window.localStorage.setItem("token", res.data.respData);
        setEmaiInput("");
        setPassInput("");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="login">
      <div className="container">
        <div className="login-form card">
          <div className="form-control">
            <h5>Email</h5>
            <Input
              type="email"
              name="userEmail"
              onChange={(event) => {
                setEmaiInput(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <h5>Password</h5>
            <Input
              type="password"
              name="userPass"
              onChange={(event) => {
                setPassInput(event.target.value);
              }}
            />
          </div>
          <Button
            text="Login"
            type="submit"
            className="btn btn-login"
            onClick={() => {
              handleSubmit(emailInput, passInput);
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Login;
