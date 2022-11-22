import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../APP_EXPORTS";

export const ContactsContext = createContext(null);

export const ContactsProvider = ({ children }) => {
  const [savedContacts, setSavedContacts] = useState([]);

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

    //Initial Contacts Data
    axios
      .get(`${BASE_URL}/contacts/savedcontacts`, config)
      .then((res) => {
        setSavedContacts(res.data.contacts);
        // console.log("Contact Fetched!", res.data);
      })
      .catch((err) => {
        console.log("Error in fetching", err);
      });
  }, []);

  return <ContactsContext.Provider value={{ savedContacts, setSavedContacts }}>{children}</ContactsContext.Provider>;
};
