import React from "react";
import { useState } from "react";

import { Input, Button } from "../../Components";
import axios from "axios";
import { BASE_URL } from "../../APP_EXPORTS";
import "./Signup.css";

function Signup() {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmaiInput] = useState("");
  const [passInput, setPassInput] = useState("");

  const BASE_API_URL = BASE_URL;

  const handleSubmit = (nameInput, emailInput, passInput) => {
    console.log("Called");
    const newUser = {
      name: nameInput,
      email: emailInput,
      pass: passInput,
    };

    console.log(newUser);
    axios
      .post(`${BASE_API_URL}/users/register`, newUser)
      .then((res) => {
        console.log("Sign Up Success!", res.data);
        setEmaiInput("");
        setNameInput("");
        setPassInput("");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <section className="signup">
      <div className="container grid">
        <div className="signup-text">
          <h1>Saving Contacts Eased</h1>
          <p>
            Quickly Signup to Explore
          </p>
        </div>
        <div className="signup-form">
          <div className="form-control">
            <h5>Full Name</h5>
            <Input
              type="text"
              name="userName"
              onChange={(event) => {
                setNameInput(event.target.value);
              }}
            />
          </div>
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
            text="Sign Up"
            type="submit"
            className="btn btn-signup"
            onClick={(event) => {
              handleSubmit(nameInput, emailInput, passInput);
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Signup;
