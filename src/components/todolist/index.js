import Header from "./Header";
import ToDoListContainer from "./ToDoListContainer";
import Container from "../common/Container";
import { Input } from "../common/FormInput";
import plusBtn from "../../images/btn/plusBtn.png";
import { useState } from "react";
import { addToDoListItem, getToDoList } from "../common/api";
import coverPic2 from "../../images/cover/coverPic2.png";
import { useLoaderData } from "react-router-dom";

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
  const token = localStorage.getItem("user-token");
  const userName = localStorage.getItem("user-name");
  const [newData, setNewData] = useState(toDoListItem);
  const [newItem, setNewItem] = useState("");
  const [isSelectTitleStyle, setIsSelectTitleStyle] = useState(0);

  async function handleClick() {
    await addToDoListItem(token, newItem);
    const res = await fetch(`https://todoo.5xcamp.us/todos`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await res.json();
    const nextData = renderSelectTitleItem(isSelectTitleStyle, data);
    setNewData(nextData);
    setNewItem("");
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
        <Header userName={userName} token={token} />
        <AddItem
          onClick={handleClick}
          onChange={handleChange}
          newItem={newItem}
        />
        {newData.todos.length ? (
          <ToDoListContainer
            itemLists={newData.todos}
            token={token}
            isSelectTitleStyle={isSelectTitleStyle}
            setIsSelectTitleStyle={setIsSelectTitleStyle}
          />
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
  const token = localStorage.getItem("user-token");
  const toDoListItem = await getToDoList(token);
  return { toDoListItem };
}

//適應不同title渲染
export function renderSelectTitleItem(index, data) {
  let newData = {};
  if (index === 1) {
    newData["todos"] = data["todos"].filter((item) => !item["completed_at"]);
    console.log(newData);
  } else if (index === 2) {
    newData["todos"] = data["todos"].filter((item) => item["completed_at"]);
  } else {
    newData = data;
  }
  return newData;
}
