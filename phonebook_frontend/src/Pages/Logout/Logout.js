import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  let navigate = useNavigate();

  useEffect(() => {
    window.localStorage.removeItem("token");
    navigate("/login");
  });

  return <></>;
}

export default Logout;
