import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { loginToDoList } from "../common/api";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function Login() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  const navigate = useNavigate();

  async function onSubmit(data) {
    const cusData = {
      user: {
        email: data.email,
        nickname: data.name,
        password: data.password,
      },
    };

    const res = await loginToDoList(cusData);
    const jsonData = await res.json();

    if (res.ok) {
      const token = res.headers.get("Authorization");
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-name", jsonData.nickname);
      alert("登入成功！");
      return navigate("/ONLINE-TODO-LIST/todolist/");
    } else {
      const inputs = [
        {
          type: "server",
          name: "emailLoginError",
          message: "電子信箱輸入錯誤",
        },
        {
          type: "server",
          name: "passwordLoginError",
          message: "密碼輸入錯誤",
        },
      ];

      inputs.forEach(({ name, type, message }) => {
        setError(name, { type, message });
      });
      return null;
    }
  }

  return (
    <div className="w-[304px]">
      <h2 className="font-bold text-2xl">最實用的線上代辦事項服務</h2>
      <Form method="post" className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "此欄位不可為空",
          }}
          render={({ field }) => (
            <>
              <FormInput
                content="Email"
                name="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請輸入Email"
                type="email"
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type} className="text-warning text-sm font-bold">
                      {message}
                    </p>
                  ))
                }
              />
              {errors.emailLoginError && (
                <p className="text-warning text-sm font-bold">
                  {errors.emailLoginError.message}
                </p>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "此欄位不可為空",
          }}
          render={({ field }) => (
            <>
              <FormInput
                content="密碼"
                name="password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請輸入密碼"
                type="password"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type} className="text-warning text-sm font-bold">
                      {message}
                    </p>
                  ))
                }
              />
              {errors.passwordLoginError && (
                <p className="text-warning text-sm font-bold">
                  {errors.passwordLoginError.message}
                </p>
              )}
            </>
          )}
        />
        <MainBtn value="showCusToDoList">登入</MainBtn>
      </Form>
      <button className="block mx-auto mt-6 font-bold">
        <Link to={`register`}>註冊帳號</Link>
      </button>
    </div>
  );
}
<Link to={`register`}>register</Link>;

//因react-hook-form影響, 無法使用
// export async function action({ request }) {
//   const data = await request.formData();
//   const cusData = {
//     user: {
//       email: data.get("email"),
//       password: data.get("password"),
//     },
//   };

//   return loginToDoList(cusData).then((res) => {
//     if (res.ok) {
//       const token = res.headers.get("Authorization");
//       localStorage.setItem("user-token", token);
//       const data = res.json();
//       data.then((result) => localStorage.setItem("user-name", result.nickname));
//       return redirect(`/ONLINE-TODO-LIST/todolist/`);
//     } else {
//       alert("帳號或密碼有錯誤，請重新填寫");
//       return null;
//     }
//   });
// }
