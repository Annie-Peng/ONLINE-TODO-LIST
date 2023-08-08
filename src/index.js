import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./components/common/ErrorPage";
import Register from "./components/register";
import ToDoList from "./components/todolist";
import Login from "./components/login";

// 建立 Router （用 createBrowserRouter 建立 BrowserRouter)
const router = createBrowserRouter([
  {
    path: "/ONLINE-TODO-LIST/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/ONLINE-TODO-LIST/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/ONLINE-TODO-LIST/todolist",
    element: <ToDoList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
