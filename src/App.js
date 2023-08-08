import "./App.css";
import Cover from "./components/common/Cover.js";
import FormContent from "./components/common/FormContent.js";
import { useState } from "react";
import ToDoList from "./components/todolist/ToDoList.js";
import Container from "./components/common/Container";

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
