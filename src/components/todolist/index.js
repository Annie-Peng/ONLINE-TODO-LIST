import Header from "./Header";
import ToDoListContainer from "./ToDoListContainer";
import Container from "../common/Container";
import { Input } from "../common/FormInput";
import plusBtn from "../../images/btn/plusBtn.png";
import { useState, useEffect } from "react";
import { addToDoListItem } from "../common/api";
import coverPic2 from "../../images/cover/coverPic2.png";

function AddItem() {
  const [newItem, setNewItem] = useState("");

  function handleClick() {
    addToDoListItem(newItem);
    setNewItem("");
  }

  return (
    <div className="mt-10 w-[500px] mx-auto flex shadow-[0_0_15px_0] shadow-tertiary rounded-[10px] h-[48px]">
      <Input
        name="addToDoList"
        value={newItem}
        showContent="新增代辦事項"
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button className="w-10 -ms-11">
        <img src={plusBtn} className="w-full" onClick={handleClick} />
      </button>
    </div>
  );
}

export default function ToDoList() {
  const [toDoListData, setToDoListData] = useState([]);
  // const [newData, setNewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://fathomless-brushlands-42339.herokuapp.com/todo2"
      )
        .then((res) => res.json())
        .then((result) => {
          setToDoListData(result);
          console.log(result);
        });
    };
    fetchData();
  }, []);

  return (
    <section
      style={{
        background: `linear-gradient(177deg, #FFD370 54%,#fff 54%)`,
      }}
      className="pt-4 pl-[34px] pr-8"
    >
      <Container>
        <Header />
        <AddItem />
        {toDoListData.length > 0 ? (
          <ToDoListContainer
            itemLists={toDoListData}
            setToDoListData={setToDoListData}
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
