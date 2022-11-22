import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
//Material Components

const MsgNotifier = ({ show, text }) => {
  //Snackbar Position
  const [notifier, setNotifier] = useState({
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal } = notifier;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={show}
      // onClose={handleClose}
      message={text}
      key={vertical + horizontal}
    />
  );
};

export default MsgNotifier;
