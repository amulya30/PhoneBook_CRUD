import React, { useState, useEffect } from "react";
import "./Home.css";
import { Input, Button } from "../../Components";
import axios from "axios";
import { BASE_URL } from "../../APP_EXPORTS";
import { useNavigate } from "react-router-dom";

function Home() {
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  const [savedContacts, setSavedContacts] = useState([]);

  const [addApiTurnedOn, setaddApiTurnedOn] = useState(false);

  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const navigate = useNavigate();

  //Takes to login if not logged
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  });

  //Fetches saved contacts
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
  }, [addApiTurnedOn, token]);

  const handleContactAdd = (nameInput, numberInput) => {
    if (nameInput === "" || numberInput === "") {
      alert("Please fill all the information properly.");
      return;
    }

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

  const updateRecord = (index) => {
    console.log(index);
  };

  const deleteRecord = (index) => {
    const token = window.localStorage.getItem("token");
    // console.log(token);

    const config = {
      headers: {
        "auth-token": token,
      },
    };

    let contactNumber = savedContacts[index].contactNumber;

    const dataToDelete = {
      data: {
        contact: contactNumber,
      },
    };

    axios
      .delete(`${BASE_URL}/contacts/deleteContact`, dataToDelete, config)
      .then((res) => {
        // console.log("Contact Added!", res.data);
        // setNameInput("");
        // setNumberInput("");
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
              onChange={(e) => {
                setNameInput(e.target.value);
              }}
              value={nameInput}
            />
          </div>
          <div className="form-control">
            <Input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={numberInput}
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  alert("Please enter a valid contact number");
                  return;
                } else if (e.target.value.length > 10) {
                  alert("Phone Number can be only of 10 digits");
                } else {
                  setNumberInput(e.target.value);
                }
              }}
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
          <p>Saved Contacts List</p>
          <table border="2px">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Contact Name</th>
                <th>Contact Number</th>
                <th colSpan={2}>Modify Contacts</th>
              </tr>
            </thead>
            <tbody>
              {savedContacts.map((contact, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td id={index}>{contact.contactName}</td>
                    <td id={index}>{contact.contactNumber}</td>
                    <td>
                      <Button
                        id={index}
                        name="edit"
                        type="submit"
                        text="Edit"
                        className="btn-edit"
                        onClick={() => updateRecord(index)}
                      />
                    </td>
                    <td>
                      <Button
                        name="delete"
                        type="submit"
                        text="Delete"
                        className="btn-del"
                        onClick={() => deleteRecord(index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Home;
