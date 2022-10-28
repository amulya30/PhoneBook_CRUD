import React from "react";
import { Input, Button } from "../index";
import { useState, useEffect } from "react";

function EditableRow({ index, contact, handleSave, handleDelete, handleCancel }) {
  //   const [nameInput, setNameInput] = useState("");
  //   const [numberInput, setNumberInput] = useState("");

  const [listData, setListData] = useState({
    NameInput: "",
    NumberInput: "",
  });

  useEffect(() => {
    setListData({
      NameInput: contact.contactName,
      NumberInput: contact.contactNumber,
    });
  }, []);

  return (
    <>
      <td>{index + 1}</td>
      <td>
        <Input
          type="text"
          name="contactName"
          className="contact-name"
          placeholder="Contact Name"
          value={listData.NameInput}
          onChange={(e) => {
            setListData({
              ...listData,
              NameInput: e.target.value,
            });
          }}
        />
      </td>
      <td>
        <Input
          type="text"
          name="contactNumber"
          className="contact-number"
          placeholder="Contact Number"
          value={listData.NumberInput}
          onChange={(e) => {
            if (isNaN(e.target.value)) {
              alert("Please enter a valid contact number");
              return;
            } else if (e.target.value.length > 10) {
              alert("Phone Number can be only of 10 digits");
            } else {
              setListData({
                ...listData,
                NumberInput: e.target.value,
              });
            }
          }}
        />
      </td>
      <td>
        <div className="modify-section">
          <Button
            name="edit-contact"
            text="Save"
            className="btn btn-save"
            onClick={() => handleSave(listData, contact._id)}
          />

          <Button name="edit-contact" text="Cancel" className="btn btn-cancel" onClick={() => handleCancel()} />

          <Button name="delete-contact" className="btn btn-del" text="Delete" onClick={() => handleDelete(index)} />
        </div>
      </td>
    </>
  );
}

export default EditableRow;
