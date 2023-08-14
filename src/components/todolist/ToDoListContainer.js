import { Fragment, useState, useEffect } from "react";
import {
  patchToDoListItem,
  deleteToDoListItem,
  completeToDoListItem,
  getToDoList,
} from "../common/api";

const titleList = ["全部", "待完成", "已完成"];

function ToDoListTitle({ onClick, isSelectTitleStyle }) {
  const unClickedStyle =
    "py-4 border-b border-line text-sm font-bold w-full text-tertiary";
  const clickedStyle =
    "py-4 border-b-2 border-secondary text-sm font-bold w-full text-secondary";

  return (
    <div className="toDoListTitle flex">
      {titleList.map((title, index) => (
        <button
          key={index}
          className={
            isSelectTitleStyle === index ? clickedStyle : unClickedStyle
          }
          onClick={() => onClick(index)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

function ToDoListContent({ selectData, setSelectData, token }) {
  const [renderUncompleteNum, setRenderUncompleteNum] = useState(selectData);

  useEffect(() => {
    const nextRenderUncompleteNum = selectData.filter(
      (item) => !item["completed_at"]
    );
    setRenderUncompleteNum(nextRenderUncompleteNum);
  }, [selectData]);

  function handleChange(e, id) {
    const result = selectData.map((item) => {
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
    setSelectData(newResult);
  }

  function deleteIdItem(token, id) {
    deleteToDoListItem(token, id);
    return { id: false };
  }

  function handleDeleteClick(id) {
    const checkTypeOfId = typeof id;
    let result;
    if (checkTypeOfId === "string") {
      console.log("ys");
      result = selectData.filter((item) => item.id !== id);
      deleteIdItem(token, id);
    } else {
      result = selectData.filter((item) => !item["completed_at"]);
      const completedItems = selectData.filter((item) => item["completed_at"]);
      completedItems.forEach((item) => deleteIdItem(token, item.id));
    }
    setSelectData(result);
  }

  function handleCompleteClick(id) {
    const result = Promise.all(
      selectData.map(async (item) => {
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
      setSelectData(newResult);
    });
  }

  // async function handleCompleteClick(id) {
  //   const result = await Promise.all(
  //     selectData.map(async (item) => {
  //       if (item.id === id) {
  //         const toggle = await completeToDoListItem(token, id);
  //         // console.log(toggle);
  //         return toggle;
  //       } else {
  //         return item;
  //       }
  //     })
  //   );
  //   setselectData(result);
  // }

  return (
    <div className="toDoListContent p-6 flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-4 relative">
        {selectData.map((item) => (
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
        <span className="text-sm">
          {renderUncompleteNum.length} 個待完成項目
        </span>
        <button className="text-sm text-tertiary" onClick={handleDeleteClick}>
          清除已完成項目
        </button>
      </p>
    </div>
  );
}

export default function ToDoListContainer({ itemLists, token }) {
  const [selectData, setSelectData] = useState(itemLists);
  const [isSelectTitleStyle, setIsSelectTitleStyle] = useState(0);

  useEffect(() => {
    setSelectData(itemLists);
  }, [itemLists]);

  async function handleRenderItemClick(index) {
    const result = await getToDoList(token);
    const newItemLists = result.todos;
    let value;
    if (index === 1) {
      value = newItemLists.filter((item) => !item["completed_at"]);
      setIsSelectTitleStyle(1);
    } else if (index === 2) {
      value = newItemLists.filter((item) => item["completed_at"]);
      setIsSelectTitleStyle(2);
    } else {
      value = newItemLists;
      setIsSelectTitleStyle(0);
    }
    setSelectData(value);
  }

  return (
    <div className="w-[500px] mt-4 bg-white rounded-[10px] shadow-[0_0_15px_0] shadow-tertiary mx-auto">
      <ToDoListTitle
        onClick={handleRenderItemClick}
        isSelectTitleStyle={isSelectTitleStyle}
      />
      <ToDoListContent
        selectData={selectData}
        setSelectData={setSelectData}
        token={token}
      />
    </div>
  );
}
