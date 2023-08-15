import { useState } from "react";
import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link, redirect, Form } from "react-router-dom";
import { postUser } from "../common/api.js";
import { useForm, Controller } from "react-hook-form";

export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
    },
    criteriaMode: "all",
  });

  // const onSubmit = async (data) => {
  //   const response = await postUser(data);
  //   const jsonData = await response.json();
  //   console.log(jsonData);
  //   if (response.status > 200) {
  //     setError("errorType", {
  //       type: response.status,
  //       message: jsonData.message,
  //     });
  //   }
  // };
  // console.log(errors.errorType);

  return (
    <div className="w-[304px]">
      <h3 className="font-bold text-2xl">註冊帳號</h3>
      <Form method="post" onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <FormInput
                content="Email"
                name={field.email}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請輸入Email"
              />
              {errors.email && (
                <p className="text-warning text-sm font-bold">此欄位不可為空</p>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <FormInput
                content="您的暱稱"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請輸入您的暱稱"
              />
              {errors.name && (
                <p className="text-warning text-sm font-bold">此欄位不可為空</p>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "此欄位不可為空",
            minLength: {
              value: 6,
              message: "密碼不得少於6個字",
            },
          }}
          render={({ field }) => (
            <>
              <FormInput
                content="密碼"
                name={field.password}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請輸入密碼"
              />
              {errors.password && (
                <p className="text-warning text-sm font-bold">此欄位不可為空</p>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="rePassword"
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <FormInput
                content="再次輸入密碼"
                name={field.rePassword}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請再次輸入密碼"
              />
              {errors.rePassword && (
                <p className="text-warning text-sm font-bold">此欄位不可為空</p>
              )}
            </>
          )}
        />
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
