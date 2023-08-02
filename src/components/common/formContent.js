import { useState } from "react";
import MainBtn from "./btn.js";
import FormInput from "./input.js";
import Login from "../login/login.js";
import Register from "../register/register.js";

export default function FormContent() {
  let initialization = {
    showLogin: true,
    showRegister: false,
    showCusToDoList: false,
  };
  const [pages, setPages] = useState(initialization);

  function onClickPage(e) {
    const value = e.target.value;
    let nextPage;

    if (value === "showLogin") {
      nextPage = initialization;
    } else {
      nextPage = {
        ...pages,
        showLogin: false,
        [value]: true,
      };
    }

    setPages(nextPage);
  }

  return (
    <>
      <Login showLogin={pages.showLogin} onClickPage={onClickPage} />
      <Register showRegister={pages.showRegister} onClickPage={onClickPage} />
    </>
  );
}
