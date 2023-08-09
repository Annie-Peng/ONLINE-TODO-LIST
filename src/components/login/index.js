import { useState } from "react";
import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link, Form, redirect } from "react-router-dom";

export default function Login() {
  const [nextCusInfo, setNextCusInfo] = useState({
    email: "",
    password: "",
  });
  const [emailStatus, setEmailStatus] = useState("typing");
  const [passwordStatus, setPasswordStatus] = useState("typing");

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
      <Form method="post" className="mt-2">
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
        <MainBtn value="showCusToDoList">登入</MainBtn>
      </Form>
      {/* checkForm */}
      <button value="showRegister" className="block mx-auto mt-6 font-bold">
        <Link to={`register`}>註冊帳號</Link>
      </button>
    </div>
  );
}
<Link to={`register`}>register</Link>;

export async function action({ request }) {
  const data = await request.formData();
  const cusData = {
    user: {
      email: data.get("email"),
      password: data.get("password"),
    },
  };

  const response = await fetch("https://todoo.5xcamp.us/users/sign_in", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cusData),
  });

  const token = response.headers.get("Authorization");

  if (response.ok) {
    localStorage.setItem("user-token", token);
    return redirect(`/ONLINE-TODO-LIST/todolist/`);
  } else {
    return null;
  }
}
