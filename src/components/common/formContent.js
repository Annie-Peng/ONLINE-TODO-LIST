import { useState } from "react";
import MainBtn from "./btn.js";
import FormInput from "./input.js";
import Login from "../login/login.js";
import Register from "../register/register.js";
import ToDoList from "../todolist/todolist.js";

export default function FormContent() {
  let initialization = {
    showLogin: true,
    showRegister: false,
    showCusToDoList: false,
  };
  const [pages, setPages] = useState(initialization);

  const [cusInfo, setCusInfo] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });

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
      <ToDoList
        showCusToDoList={pages.showCusToDoList}
        onClickPage={onClickPage}
      />
    </>
  );
}
