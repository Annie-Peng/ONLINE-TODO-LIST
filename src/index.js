import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CommonPage from "./components/common/CommonPage";
import ErrorPage from "./components/common/ErrorPage";
import Register, { action as editRegister } from "./components/register";
import ToDoList, { loader as todolistLoader } from "./components/todolist";
import Login, { action as editLogin } from "./components/login";

const router = createBrowserRouter([
  {
    path: "/ONLINE-TODO-LIST/",
    element: <CommonPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
        // action: editLogin,
      },
      {
        path: "/ONLINE-TODO-LIST/register",
        element: <Register />,
        // action: editRegister,
      },
    ],
  },
  {
    path: "/ONLINE-TODO-LIST/todolist",
    element: <ToDoList />,
    errorElement: <ErrorPage />,
    loader: todolistLoader,
  },
  {
    path: "/ONLINE-TODO-LIST/error",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
