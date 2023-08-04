import "./App.css";
import Cover from "./components/common/cover.js";
import FormContent from "./components/common/formContent.js";
import { useState } from "react";
import ToDoList from "./components/todolist/todolist.js";
import Container from "./components/common/container";

function CommonPage({ pages, onClickPage }) {
  return (
    <section className="bg-primary h-screen w-screen flex justify-center">
      <Container>
        <div
          className="flex w-full justify-center gap-[106px] h-[448px] items-center absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2"
        >
          <Cover />
          <FormContent pages={pages} onClickPage={onClickPage} />
        </div>
      </Container>
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
