import { useState } from "react";
import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link, Form, redirect } from "react-router-dom";
import { loginToDoList } from "../common/api";

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
          placeholder="請輸入Email"
        />
        {isEmptyEmail && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <FormInput
          content="密碼"
          name="password"
          value={nextCusInfo.password}
          onChange={handleChange}
          placeholder="請輸入密碼"
        />
        {isEmptyPassword && (
          <p className="text-warning text-sm font-bold">此欄位不可為空</p>
        )}
        <MainBtn value="showCusToDoList">登入</MainBtn>
      </Form>
      {/* checkForm */}
      <button className="block mx-auto mt-6 font-bold">
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

  return loginToDoList(cusData).then((res) => {
    if (res.ok) {
      const token = res.headers.get("Authorization");
      localStorage.setItem("user-token", token);
      const data = res.json();
      data.then((result) => localStorage.setItem("user-name", result.nickname));
      return redirect(`/ONLINE-TODO-LIST/todolist/`);
    } else {
      alert("帳號或密碼有錯誤，請重新填寫");
      return null;
    }
  });
}
