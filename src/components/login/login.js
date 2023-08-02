import { useState } from "react";
import MainBtn from "../common/btn.js";
import FormInput from "../common/input.js";

export default function Login({ showLogin, onClickPage }) {
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
        value="showRegister"
        className="block mx-auto mt-6 font-bold"
        onClick={onClickPage}
      >
        註冊帳號
      </button>
    </div>
  );
}
