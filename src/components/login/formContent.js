import { useState } from "react";
import MainBtn from "../common/btn.js";
import Input from "../common/input.js";

function FormInput({ name, content, value, onChange }) {
  return (
    <label>
      <p className="mt-4 text-sm font-bold">{content}</p>
      <Input
        name={name}
        value={value}
        showContent={content}
        onChange={onChange}
      />
    </label>
  );
}

function Login({ showLogin, onClickToRegister }) {
  const [cusInfo, setCusInfo] = useState({
    email: "",
    password: "",
  });
  const [emailStatus, setEmailStatus] = useState("typing");
  const [passwordStatus, setPasswordStatus] = useState("typing");

  if (!showLogin) return null;

  const isEmptyEmail = emailStatus === null;
  const isEmptyPassword = passwordStatus === null;

  function checkForm() {
    setEmailStatus(cusInfo.email ? "typing" : null);
    setPasswordStatus(cusInfo.password ? "typing" : null);
  }

  function handleChange(e) {
    setCusInfo({
      ...cusInfo,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="w-[304px]">
      <h2 className="font-bold text-2xl">最實用的線上代辦事項服務</h2>
      <form className="mt-2">
        <FormInput
          content="Email"
          name="email"
          value={cusInfo.email}
          onChange={handleChange}
        />
        {isEmptyEmail && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="密碼"
          name="password"
          value={cusInfo.password}
          onChange={handleChange}
        />
        {isEmptyPassword && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
      </form>
      <MainBtn value={"登入"} onClick={checkForm} />
      <button
        className="block mx-auto mt-6 font-bold"
        onClick={onClickToRegister}
      >
        註冊帳號
      </button>
    </div>
  );
}

function Register({ showRegister, onClickToLogin }) {
  const [emptyStatus, setEmptyStatus] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });
  const [cusInfo, setCusInfo] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });

  if (!showRegister) return null;

  function handleChange(e) {
    setCusInfo({
      ...cusInfo,
      [e.target.name]: e.target.value,
    });
  }

  function checkForm(e) {
    e.preventDefault();

    if (!e.target.value) {
      setEmptyStatus({
        ...cusInfo,
        [e.target.name]: true,
      });
    }
  }

  return (
    <div className="w-[304px]">
      <h3 className="font-bold text-2xl">註冊帳號</h3>
      <form>
        <FormInput
          content="Email"
          name="email"
          value={cusInfo.email}
          onChange={handleChange}
        />
        {emptyStatus.email && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="您的暱稱"
          name="name"
          value={cusInfo.name}
          onChange={handleChange}
        />
        {emptyStatus.name && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="密碼"
          name="password"
          value={cusInfo.password}
          onChange={handleChange}
        />
        {emptyStatus.password && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="再次輸入密碼"
          name="rePassword"
          value={cusInfo.rePassword}
          onChange={handleChange}
        />
        {emptyStatus.rePassword && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
      </form>
      <MainBtn value={"註冊帳號"} onClick={checkForm} />
      <button className="block mx-auto mt-6 font-bold" onClick={onClickToLogin}>
        登入
      </button>
    </div>
  );
}

export default function FormContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  function onClickToRegister() {
    setIsLogin(false);
    setIsRegister(true);
  }

  function onClickToLogin() {
    setIsLogin(true);
    setIsRegister(false);
  }

  return (
    <>
      <Login showLogin={isLogin} onClickToRegister={onClickToRegister} />
      <Register showRegister={isRegister} onClickToLogin={onClickToLogin} />
    </>
  );
}
