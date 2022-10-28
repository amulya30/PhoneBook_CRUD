import React from "react";

function ReadOnlyRow({ index, contact, handleEditClick }) {
  return (
    <>
      <td>{index + 1}</td>
      <td>{contact.contactName}</td>
      <td>{contact.contactNumber}</td>
      <td>
        <i className="fa fa-pencil" aria-hidden="true" onClick={(event) => handleEditClick(event, index)}></i>
      </td>
    </>
  );
}

export default ReadOnlyRow;
