import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../APP_EXPORTS";
import { useNavigate, useLocation, redirect } from "react-router-dom";

//Custom Components
import { Input, Button, ReadOnlyRow, EditableRow } from "../../Components";

//Styling
import "./Home.css";

//Images
import { avatar } from "../../../src/images";

function Home() {
  //Add-Contact Form
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [savedContacts, setSavedContacts] = useState([]);
  const [addApiTurnedOn, setaddApiTurnedOn] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [token, setToken] = useState();

  const navigate = useNavigate();

  //Takes to login if not logged
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }, []);

  //Fetches saved contacts
  useEffect(() => {
    let token = window.localStorage.getItem("token");

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
        setSavedContacts(res.data.contacts);
        setaddApiTurnedOn(false);
      })
      .catch((err) => {
        console.log("nkjn", err);
      });
  }, [addApiTurnedOn]);

  //Add-Contact
  const handleContactAdd = (nameInput, numberInput) => {
    let token = window.localStorage.getItem("token");

    if (nameInput === "" || numberInput === "") {
      alert("Please fill all the information properly.");
      return;
    }

    const newContact = {
      contactName: nameInput,
      contactNumber: numberInput,
    };

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

  //Edit-Contact
  const handleEditClick = (event, elementId) => {
    event.preventDefault();
    console.log(elementId);
    setEditContactId(elementId);
  };

  //Updates Record
  const updateRecord = (updatedContact, id) => {
    let token = window.localStorage.getItem("token");

    const contactToUpdate = {
      contactId: id,
      contactName: updatedContact.NameInput,
      contactNumber: updatedContact.NumberInput,
    };

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

  //Deletes Contact
  const deleteRecord = (index) => {
    let token = window.localStorage.getItem("token");

    let contactNumber = savedContacts[index].contactNumber;
    console.log(token);
    axios
      .delete(`${BASE_URL}/contacts/deleteContact`, {
        data: { contact: contactNumber },
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log("Contact Deleted!", res.data);
        setaddApiTurnedOn(true);
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
    <>
      <section className="home">
        <div className="container grid">
          <div className="add-contact-form card">
            <p>Quick Contact Add</p>

            <div className="form-control">
              <i className="fa fa-user"></i>
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
              <i className="fa fa-mobile"></i>
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
              <Button
                name="addcontact"
                type="submit"
                text={"+ Create New Contact"}
                className="btn btn-home"
                onClick={() => handleContactAdd(nameInput, numberInput)}
              />
            </div>
            {/* <div className="form-control">
              
            </div> */}
          </div>

          <div className="my-contacts-form grid card">
            <div className="profileInfo ">
              <h2>Your Info</h2>
              <p>Name:</p>
              <p>Role: </p>
              <p>Department: </p>
              <p>Email-Id:</p>
              <p>Stack: MERN</p>
            </div>

            <div className="profilePic">
              <img src={avatar} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="home" id="contacts">
        <div className="container">
          <div className="card my-contact-list">
            <h2>Your Saved Contacts</h2>
            <div className="table">
              <table id="my-contacts">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Contact Name</th>
                    <th>Contact Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedContacts != 0 ? (
                    savedContacts.map((contactObj, index) => {
                      return (
                        <tr key={index}>
                          {index === editContactId ? (
                            <EditableRow
                              index={editContactId}
                              contact={contactObj}
                              handleSave={updateRecord}
                              handleDelete={deleteRecord}
                              handleCancel={handleCancel}
                            />
                          ) : (
                            <ReadOnlyRow index={index} contact={contactObj} handleEditClick={handleEditClick} />
                          )}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={4}>You have not saved any contact yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
