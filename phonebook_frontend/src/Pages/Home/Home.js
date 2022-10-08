import React, { useState, useEffect } from "react";
import "./Home.css";
import { Input, Button } from "../../Components";
import axios from "axios";
import { BASE_URL } from "../../APP_EXPORTS";

function Home() {
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  const [savedContacts, setSavedContacts] = useState([]);

  const [addApiTurnedOn, setaddApiTurnedOn] = useState(false);

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  useEffect(() => {
    // let userToken = window.localStorage.getItem("token");

    if (!token) {
      return;
    }

    const config = {
      headers: {
        "auth-token": token,
      },
    };

    axios
      .get(`${BASE_URL}/contacts/savedcontacts`, config)
      .then((res) => {
        console.log("Contact Fetched!", res.data.contacts);
        setSavedContacts(res.data.contacts);
        setaddApiTurnedOn(false);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, []);

  const handleContactAdd = (nameInput, numberInput) => {
    const newContact = {
      contactName: nameInput,
      contactNumber: numberInput,
    };

    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        "auth-token": token,
      },
    };

    axios
      .post(`${BASE_URL}/contacts/addcontact`, newContact, config)
      .then((res) => {
        console.log("Contact Added!", res.data);
        setNameInput("");
        setNumberInput("");
        setaddApiTurnedOn(true);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <section className="home">
      <div className="container grid">
        <div className="add-contact-form card">
          <p>Quick Contact Add</p>
          <div className="form-control">
            <Input
              type="text"
              name="contactName"
              placeholder="Contact Name"
              onChange={(e) => setNameInput(e.target.value)}
              value={nameInput}
              pattern="[A-Za-z]"
              title="Name should be only in words"
            />
          </div>
          <div className="form-control">
            <Input
              type="text"
              name="contactNumer"
              placeholder="Contact Number"
              value={numberInput}
              onChange={(e) => setNumberInput(e.target.value)}
              pattern="[0-9]{10}"
              title="Number should be only of 10 digits"
            />
          </div>
          <div className="form-control">
            <Button
              name="addcontact"
              type="submit"
              text="Add Contact"
              className="btn btn-home"
              onClick={() => handleContactAdd(nameInput, numberInput)}
            />
          </div>
        </div>

        <div className="my-contacts-form card">
          <p>Saved Contacts</p>
          <table border="2px">
            <tr>
              <th>Contact Name</th>
              <th>Contact Number</th>
            </tr>
            {savedContacts.map((contact, index) => {
              return (
                <tr key={index}>
                  <td>{contact.contactName}</td>
                  <td>{contact.contactNumber}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </section>
  );
}

export default Home;
