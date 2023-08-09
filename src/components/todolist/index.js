import Header from "./Header";
import ToDoListContainer from "./ToDoListContainer";
import Container from "../common/Container";
import { Input } from "../common/FormInput";
import plusBtn from "../../images/btn/plusBtn.png";
import { useState, useEffect } from "react";
import { addToDoListItem, getToDoList } from "../common/api";
import coverPic2 from "../../images/cover/coverPic2.png";
import { useLoaderData } from "react-router-dom";

const token = localStorage.getItem("user-token");

function AddItem({ onClick, onChange, newItem }) {
  return (
    <div className="mt-10 w-[500px] mx-auto flex shadow-[0_0_15px_0] shadow-tertiary rounded-[10px] h-[48px]">
      <Input
        name="addToDoList"
        value={newItem}
        showContent="新增代辦事項"
        onChange={onChange}
      />
      <button className="w-10 -ms-11" onClick={onClick}>
        <img src={plusBtn} className="w-full" />
      </button>
    </div>
  );
}

export default function ToDoList() {
  const { toDoListItem } = useLoaderData();

  const [newData, setNewData] = useState(toDoListItem);
  const [newItem, setNewItem] = useState("");

  async function handleClick() {
    const add = await addToDoListItem(token, newItem);
    setNewItem("");
    const res = await fetch(`https://todoo.5xcamp.us/todos`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    let data = await res.json();
    setNewData(data);
  }

  function handleChange(e) {
    setNewItem(e.target.value);
  }

  return (
    <section
      style={{
        background: `linear-gradient(177deg, #FFD370 54%,#fff 54%)`,
      }}
      className="pt-4 pl-[34px] pr-8"
    >
      <Container>
        <Header />
        <AddItem
          onClick={handleClick}
          onChange={handleChange}
          newItem={newItem}
        />
        {newData.todos.length ? (
          <ToDoListContainer itemLists={newData.todos} />
        ) : (
          <ToDoListEmpty />
        )}
      </Container>
    </section>
  );
}

function ToDoListEmpty() {
  return (
    <div className="text-center mt-[60px]">
      <p>目前尚無代辦事項</p>
      <div className="max-w-[240px] mx-auto mt-4">
        <img src={coverPic2} />
      </div>
    </div>
  );
}

export async function loader() {
  const toDoListItem = await getToDoList(token);
  return { toDoListItem };
}
