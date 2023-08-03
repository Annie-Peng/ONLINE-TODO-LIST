import "./App.css";
import Cover from "./components/common/cover.js";
import FormContent from "./components/common/formContent.js";
import { useState } from "react";
import ToDoList from "./components/todolist/todolist.js";

function CommonPage({ pages, onClickPage }) {
  return (
    <section className="bg-primary h-screen w-screen flex items-center justify-center ">
      <div className="flex gap-[106px] h-[448px] items-center">
        <Cover />
        <FormContent pages={pages} onClickPage={onClickPage} />
      </div>
    </section>
  );
}

function App() {
  const initialization = {
    showLogin: true,
    showRegister: false,
    showCusToDoList: false,
  };
  const [pages, setPages] = useState(initialization);

  function onClickPage(e) {
    const value = e.target.value;
    let nextPage;

    if (value === "showLogin") {
      nextPage = initialization;
    } else {
      nextPage = {
        ...pages,
        showLogin: false,
        [value]: true,
      };
    }
    setPages(nextPage);
  }

  if (pages.showCusToDoList) {
    return <ToDoList onClickPage={onClickPage} />;
  }
  return <CommonPage pages={pages} onClickPage={onClickPage} />;
}

export default App;
