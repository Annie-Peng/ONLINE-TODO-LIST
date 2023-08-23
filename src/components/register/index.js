import MainBtn from "../common/MainBtn.js";
import FormInput from "../common/FormInput.js";
import { Link, redirect, Form, useNavigate } from "react-router-dom";
import { postUser } from "../common/api.js";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setError,
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
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

    const res = await postUser(cusData);
    const jsonData = await res.json();
    const newData = jsonData.error;

    if (res.ok) {
      alert("註冊成功！請重新登入 ：）");
      return navigate("/ONLINE-TODO-LIST/");
    }

    if (res.status === 422) {
      newData.toString() === "電子信箱 已被使用" &&
        setError("emailRegisterError", {
          type: "422",
          message: "電子信箱已經註冊",
        });
    } else {
      alert("註冊失敗，請聯絡系統管理員");
      return navigate("/ONLINE-TODO-LIST/error");
    }
  }

  return (
    <div className="w-[304px]">
      <h3 className="font-bold text-2xl">註冊帳號</h3>
      <Form method="post" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "此欄位不可為空",
            pattern: {
              value:
                /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
              message: "請輸入正確email格式",
            },
          }}
          render={({ field }) => (
            <>
              <FormInput
                content="Email"
                name="email"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  errors.emailRegisterError &&
                    clearErrors("emailRegisterError");
                }}
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
              {errors.emailRegisterError && (
                <p className="text-warning text-sm font-bold">
                  {errors.emailRegisterError.message}
                </p>
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
                name="name"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請輸入您的暱稱"
                type="text"
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
            </>
          )}
        />
        <Controller
          control={control}
          name="rePassword"
          rules={{
            required: "此欄位不可為空",
            validate: {
              message: (value) =>
                value === watch("password") ? null : "與輸入密碼不符",
            },
          }}
          render={({ field }) => (
            <>
              <FormInput
                content="再次輸入密碼"
                name="rePassword"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="請再次輸入密碼"
                type="password"
              />
              <ErrorMessage
                errors={errors}
                name="rePassword"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <p key={type} className="text-warning text-sm font-bold">
                      {message}
                    </p>
                  ))
                }
              />
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

//因react-hook-form影響, 無法使用
// export async function action({ request }) {
//   console.log(request);
//   const data = await request.formData();
//   const cusData = {
//     user: {
//       email: data.get("email"),
//       nickname: data.get("name"),
//       password: data.get("password"),
//     },
//   };

//   return postUser(cusData).then((res) => {
//     if (res.ok) {
//       return redirect("/ONLINE-TODO-LIST/");
//     } else {
//       return null;
//     }
//   });
// }
