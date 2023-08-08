import { useState } from "react";
import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";

export default function Login({ showLogin, onClickPage, cusInfo }) {
  const [nextCusInfo, setNextCusInfo] = useState(cusInfo);
  const [emailStatus, setEmailStatus] = useState("typing");
  const [passwordStatus, setPasswordStatus] = useState("typing");

  if (!showLogin) return null;

  const isEmptyEmail = emailStatus === null;
  const isEmptyPassword = passwordStatus === null;

  function checkForm() {
    setEmailStatus(nextCusInfo.email ? "typing" : null);
    setPasswordStatus(nextCusInfo.password ? "typing" : null);
  }

  function handleChange(e) {
    setNextCusInfo({
      ...nextCusInfo,
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
          value={nextCusInfo.email}
          onChange={handleChange}
        />
        {isEmptyEmail && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="密碼"
          name="password"
          value={nextCusInfo.password}
          onChange={handleChange}
        />
        {isEmptyPassword && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
      </form>
      <MainBtn value="showCusToDoList" content={"登入"} onClick={onClickPage} />
      {/* checkForm */}
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
