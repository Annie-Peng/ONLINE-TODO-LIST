import { useState } from "react";
import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link } from "react-router-dom";

export default function Register() {
  const [emptyStatus, setEmptyStatus] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });
  const [nextCusInfo, setNextCusInfo] = useState({
    email: "",
    name: "",
    password: "",
    rePassword: "",
  });

  function handleChange(e) {
    setNextCusInfo({
      ...nextCusInfo,
      [e.target.name]: e.target.value,
    });
  }

  function checkForm(e) {
    e.preventDefault();

    if (!e.target.value) {
      setEmptyStatus({
        ...nextCusInfo,
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
          value={nextCusInfo.email}
          onChange={handleChange}
        />
        {emptyStatus.email && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="您的暱稱"
          name="name"
          value={nextCusInfo.name}
          onChange={handleChange}
        />
        {emptyStatus.name && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="密碼"
          name="password"
          value={nextCusInfo.password}
          onChange={handleChange}
        />
        {emptyStatus.password && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="再次輸入密碼"
          name="rePassword"
          value={nextCusInfo.rePassword}
          onChange={handleChange}
        />
        {emptyStatus.rePassword && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
      </form>

      <Link to="/ONLINE-TODO-LIST">
        <MainBtn
          value="showLogin"
          // checkForm
        >
          註冊帳號
        </MainBtn>
      </Link>
      <button value="showCusToDoList" className="block mx-auto mt-6 font-bold">
        <Link to="/ONLINE-TODO-LIST">登入</Link>
      </button>
    </div>
  );
}
