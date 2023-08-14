import { useState } from "react";
import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link, redirect, Form } from "react-router-dom";
import { postUser } from "../common/api.js";

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

  // function checkForm(e) {
  //   e.preventDefault();

  //   if (!e.target.value) {
  //     setEmptyStatus({
  //       ...nextCusInfo,
  //       [e.target.name]: true,
  //     });
  //   }
  // }

  // function handleClick(e) {
  //   // e.preventDefault();
  //   const obj = {
  //     user: {
  //       email: nextCusInfo.email,
  //       nickname: nextCusInfo.name,
  //       password: nextCusInfo.password,
  //     },
  //   };
  //   action(obj);
  // }

  return (
    <div className="w-[304px]">
      <h3 className="font-bold text-2xl">註冊帳號</h3>
      <Form method="post">
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
        <MainBtn>註冊帳號</MainBtn>
      </Form>
      <button className="block mx-auto mt-6 font-bold">
        <Link to="/ONLINE-TODO-LIST">登入</Link>
      </button>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const cusData = {
    user: {
      email: data.get("email"),
      nickname: data.get("name"),
      password: data.get("password"),
    },
  };

  return postUser(cusData).then((res) => {
    if (res.ok) {
      return redirect("/ONLINE-TODO-LIST/");
    } else {
      return null;
    }
  });
}
