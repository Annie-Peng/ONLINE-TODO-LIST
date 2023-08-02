import { useState } from "react";
import MainBtn from "../common/btn.js";
import Input from "../common/input.js";

function FormInput({ content, value, onChange }) {
  return (
    <label>
      <p className="mt-4 text-sm font-bold">{content}</p>
      <Input value={value} showContent={content} onChange={onChange} />
    </label>
  );
}

function Login({ isLogin }) {
  if (!isLogin) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailStatus, setEmailStatus] = useState("typing");
  const [passwordStatus, setPasswordStatus] = useState("typing");

  const isEmptyEmail = emailStatus === null;
  const isEmptyPassword = passwordStatus === null;

  function checkForm() {
    setEmailStatus(email ? "typing" : null);
    setPasswordStatus(password ? "typing" : null);
  }

  return (
    <div className="w-[304px]">
      <h2 className="font-bold text-2xl">最實用的線上代辦事項服務</h2>
      <form className="mt-2">
        <FormInput
          content="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isEmptyEmail && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isEmptyPassword && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
      </form>
      <MainBtn value={"登入"} onClick={checkForm} />
      <button
        className="block mx-auto mt-6 font-bold"
        // onClickTransferPage={onClick}
      >
        註冊帳號
      </button>
    </div>
  );
}

function Register() {}

export default function FormContent() {
  const [isLogin, setIsLogin] = useState(true);

  // function onClick({ onClick }) {
  //   return "hi";
  // }

  return (
    <>
      <Login isLogin={true} />
      <Register />
    </>
  );
}

// onClickTransferPage={onClick}
