import React, { useState, useEffect } from "react";
import "./Home.css";
import { Input, Button } from "../../Components";
import axios from "axios";
import { BASE_URL } from "../../APP_EXPORTS";
import { useNavigate } from "react-router-dom";
import { ReadOnlyRow, EditableRow } from "../../Components";

function Home() {
  //Add-Contact Form
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [savedContacts, setSavedContacts] = useState([]);
  const [addApiTurnedOn, setaddApiTurnedOn] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const navigate = useNavigate();
  const [editContactId, setEditContactId] = useState(null);

  //Takes to login if not logged
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    } else {
      setToken(token);
    }
  }, []);

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
        console.log("Contact Fetched!", res.data);
        setaddApiTurnedOn(false);
        setSavedContacts(res.data.contacts);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, [addApiTurnedOn]);

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

  const handleEditClick = (event, elementId) => {
    event.preventDefault();
    console.log(elementId);
    setEditContactId(elementId);
  };

  const saveRecord = (updatedContact, id) => {
    console.log(id, updatedContact);

    const contactToUpdate = {
      contactName: updatedContact.NameInput,
      contactNumber: updatedContact.NumberInput,
    };

    const token = window.localStorage.getItem("token");

    const config = {
      headers: {
        "auth-token": token,
      },
    };

    axios
      .put(`${BASE_URL}/contacts/updateContact`, contactToUpdate, config)
      .then((res) => {
        alert(res.data.msg);
        setNameInput("");
        setNumberInput("");
        setaddApiTurnedOn(true);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setEditContactId(null);
  };

  const deleteRecord = (index) => {
    const token = window.localStorage.getItem("token");

    let contactNumber = savedContacts[index].contactNumber;

    axios
      .delete(`${BASE_URL}/contacts/deleteContact`, {
        data: { contact: contactNumber },
        headers: { "auth-token": token },
      })
      .then((res) => {
        setaddApiTurnedOn(true);
        console.log("Contact Deleted!", res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setEditContactId(null);
  };

  const handleCancel = () => {
    setEditContactId(null);
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
              text={
                <i className="fa fa-phone" aria-hidden="true">
                  Add Contact
                </i>
              }
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedContacts.map((contactObj, index) => {
                return (
                  <tr key={index}>
                    {index === editContactId ? (
                      <EditableRow
                        index={editContactId}
                        contact={contactObj}
                        handleSave={saveRecord}
                        handleDelete={deleteRecord}
                        handleCancel={handleCancel}
                      />
                    ) : (
                      <ReadOnlyRow
                        index={index}
                        contact={contactObj}
                        handleEditClick={handleEditClick}
                      />
                    )}
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
