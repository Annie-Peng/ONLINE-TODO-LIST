import { Fragment, useState, useEffect } from "react";
import {
  patchToDoListItem,
  deleteToDoListItem,
  completeToDoListItem,
} from "../common/api";
import { token } from "./index";

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
    const result = updateToDoList.map((item) => {
      if (item.id === id) {
        let value = {
          ...item,
          content: e.target.value,
        };
        value.content
          ? patchToDoListItem(token, value.content, id)
          : (value = deleteIdItem(token, id));
        return value;
      } else {
        return item;
      }
    });
    const newResult = result.filter((item) => item.id);
    setUpdateToDoList(newResult);
  }

  function deleteIdItem(token, id) {
    deleteToDoListItem(token, id);
    return { id: false };
  }

  function handleDeleteClick(id) {
    const result = updateToDoList.filter((item) => item.id !== id);
    deleteIdItem(token, id);
    setUpdateToDoList(result);
  }

  function handleCompleteClick(id) {
    const result = Promise.all(
      updateToDoList.map(async (item) => {
        if (item.id === id) {
          const toggle = await completeToDoListItem(token, id);
          // console.log(toggle);
          return toggle;
        } else {
          return item;
        }
      })
    );
    result.then((newResult) => {
      setUpdateToDoList(newResult);
    });
  }

  // async function handleCompleteClick(id) {
  //   const result = await Promise.all(
  //     updateToDoList.map(async (item) => {
  //       if (item.id === id) {
  //         const toggle = await completeToDoListItem(token, id);
  //         // console.log(toggle);
  //         return toggle;
  //       } else {
  //         return item;
  //       }
  //     })
  //   );
  //   setUpdateToDoList(result);
  // }

  return (
    <div className="toDoListContent p-6 flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-4 relative">
        {updateToDoList.map((item) => (
          <Fragment key={item.id}>
            <li className="border-b border-line pb-4 flex text-sm relative">
              <span
                className={
                  item["completed_at"] ? "vectorChecked" : "rectangleBox"
                }
                onClick={() => handleCompleteClick(item.id)}
              ></span>
              <input
                className="w-full"
                value={item.content}
                onChange={(e) => handleChange(e, item.id)}
              />
              <button
                type="button"
                className="vectorCross"
                onClick={() => handleDeleteClick(item.id)}
                style={{ width: "16px", height: "16px" }}
              ></button>
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
