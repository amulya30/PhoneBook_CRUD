import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../APP_EXPORTS";
import { ContactsContext } from "../../Context/ContactsContext";

//Custom Components
import { Button, EditableRow, Input, MsgNotifier, ReadOnlyRow } from "../../Components";

//Styling
import "./Home.css";

//Images
import { avatar } from "../../../src/images";

function Home() {
  //Navigate
  const navigate = useNavigate();

  //Add-Contact Form
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [editContactId, setEditContactId] = useState(null);

  //Contacts Coming from Contacts Context
  const contacts = useContext(ContactsContext).savedContacts;

  const { setSavedContacts } = useContext(ContactsContext);

  //Notifier Visibility
  const [notifierVisible, setNotifierVisible] = useState(null);
  const [description, setDescription] = useState("");

  //Takes to login if not logged
  useEffect(() => {
    let token = window.localStorage.getItem("token");
    if (token === null) {
      navigate("/login");
    }
  }, []);

  //Fetches saved contacts
  const updateListHandler = () => {
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
        // console.log("Contact Fetched!", res.data);
        setSavedContacts(res.data.contacts);
        setNotifierVisible(true);
        setTimeout(() => {
          setNotifierVisible(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("Error in fetching", err);
      });
  };

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

        setDescription("Contact Added !");
        updateListHandler();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  //Edit-Contact
  const handleRowEditClick = (event, elementId) => {
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
        setDescription(res.data.msg);
        setNameInput("");
        setNumberInput("");
        setEditContactId(null);
        updateListHandler();
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  //Deletes Contact
  const deleteRecord = (index) => {
    let token = window.localStorage.getItem("token");
    let contactNumber = contacts[index].contactNumber;
    axios
      .delete(`${BASE_URL}/contacts/deleteContact`, {
        data: { contact: contactNumber },
        headers: { "auth-token": token },
      })
      .then((res) => {
        console.log("Contact Deleted!", res.data);
        setDescription("Contact Deleted!");
        updateListHandler();
        setEditContactId(null);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  const handleCancel = () => {
    setEditContactId(null);
  };

  return (
    <>
      <section className="home" id="addContact">
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
            </div>
            <div className="form-control-button">
              <Button
                name="addcontact"
                type="submit"
                text={"+ Create New Contact"}
                className="btn btn-home"
                onClick={() => handleContactAdd(nameInput, numberInput)}
              />
            </div>
          </div>

          <div className="my-contacts-form grid card">
            <div className="profileInfo ">
              <h2>Your Info</h2>
              <p>Name: {}</p>
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
      <section className="home" id="editContact">
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
                  {contacts.length !== 0 ? (
                    contacts.map((contactObj, index) => {
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
                            <ReadOnlyRow index={index} contact={contactObj} handleEditClick={handleRowEditClick} />
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
        <MsgNotifier show={notifierVisible} text={description} />
      </section>
    </>
  );
}

export default Home;
