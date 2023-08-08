import { useState } from "react";
import Login from "../login/Login.js";
import Register from "../register/Register.js";

export default function FormContent({ pages, onClickPage }) {
  const [cusInfo, setCusInfo] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });

  return (
    <>
      <Login
        showLogin={pages.showLogin}
        onClickPage={onClickPage}
        cusInfo={cusInfo}
      />
      <Register
        showRegister={pages.showRegister}
        onClickPage={onClickPage}
        cusInfo={cusInfo}
      />
    </>
  );
}
