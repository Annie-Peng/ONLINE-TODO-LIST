import { Fragment, useState, useEffect } from "react";
import { patchToDoListItem, deleteToDoListItem } from "../common/api";

const titleList = ["全部", "待完成", "已完成"];

function ToDoListTitle() {
  return (
    <div className="toDoListTitle flex">
      {titleList.map((title, index) => (
        <button
          key={index}
          className="py-4 border-b border-line text-sm font-bold w-full text-tertiary"
        >
          {title}
        </button>
      ))}
    </div>
  );
}

function ToDoListContent({ itemLists }) {
  const [updateToDoList, setUpdateToDoList] = useState(itemLists);

  useEffect(() => {
    setUpdateToDoList(itemLists);
  }, [itemLists]);

  function handleChange(e, id) {
    setUpdateToDoList(
      updateToDoList.map((item) => {
        if (item.id === id) {
          const value = {
            ...item,
            todo: e.target.value,
          };
          value.todo
            ? patchToDoListItem(value.todo, id)
            : deleteToDoListItem(id);
          return value;
        } else {
          return item;
        }
      })
    );
  }

  return (
    <div className="toDoListContent p-6 flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-4 relative">
        {updateToDoList.map((item) => (
          <Fragment key={item.id}>
            <li
              className="border-b border-line pb-4 flex text-sm vectorCross"
              // onClick={handleClick}
            >
              <span className="rectangleBox"></span>
              <input
                className="w-full"
                value={item.content}
                onChange={(e) => handleChange(e, item.id)}
              />
            </li>
          </Fragment>
        ))}
      </ul>
      <p className="py-2 flex justify-between">
        <span className="text-sm">{updateToDoList.length} 個待完成項目</span>
        <button className="text-sm text-tertiary">清除已完成項目</button>
      </p>
    </div>
  );
}

export default function ToDoListContainer({ itemLists }) {
  return (
    <div className="w-[500px] mt-4 bg-white rounded-[10px] shadow-[0_0_15px_0] shadow-tertiary mx-auto">
      <ToDoListTitle />
      <ToDoListContent itemLists={itemLists} />
    </div>
  );
}
