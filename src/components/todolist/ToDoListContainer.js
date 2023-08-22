import { Fragment, useState, useEffect } from "react";
import {
  patchToDoListItem,
  deleteToDoListItem,
  completeToDoListItem,
  getToDoList,
} from "../common/api";
import { renderSelectTitleItem } from "./index";
import { useNavigate } from "react-router-dom";

const titleList = ["全部", "待完成", "已完成"];

function ToDoListTitle({
  token,
  setNewData,
  isSelectTitleStyle,
  setIsSelectTitleStyle,
  setNewRenderData,
}) {
  const unClickedStyle =
    "py-4 border-b border-line text-sm font-bold w-full text-tertiary";
  const clickedStyle =
    "py-4 border-b-2 border-secondary text-sm font-bold w-full text-secondary";

  async function handleRenderItemClick(index) {
    const result = await getToDoList(token);
    const nextData = renderSelectTitleItem(index, result);
    setIsSelectTitleStyle(index);
    setNewData(result.todos);
    setNewRenderData(nextData.todos);
  }

  return (
    <div className="toDoListTitle flex">
      {titleList.map((title, index) => (
        <button
          key={index}
          className={
            isSelectTitleStyle === index ? clickedStyle : unClickedStyle
          }
          onClick={() => handleRenderItemClick(index)}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

function ToDoListContent({
  token,
  isSelectTitleStyle,
  itemLists,
  setNewData,
  newRenderData,
  setNewRenderData,
}) {
  const navigate = useNavigate();
  const [renderUncompleteNum, setRenderUncompleteNum] = useState(itemLists);

  useEffect(() => {
    const nextRenderUncompleteNum = itemLists.filter(
      (item) => !item["completed_at"]
    );
    setRenderUncompleteNum(nextRenderUncompleteNum);
  }, [itemLists]);

  function handleChange(e, id) {
    e.target.value
      ? patchToDoListItem(token, e.target.value, id)
      : deleteIdItem(token, id); //input空值渲染刪除

    const result = {
      todos: itemLists.map((item) =>
        item.id === id ? { ...item, content: e.target.value } : item
      ),
    };

    //input空值渲染刪除
    const newResult = result.todos.filter((item) => item.content);

    setNewData(newResult);
    setNewRenderData(newResult);
  }

  function deleteIdItem(token, id) {
    deleteToDoListItem(token, id);
    return { id: false };
  }

  function handleDeleteClick(id) {
    const checkTypeOfId = typeof id;
    let result;
    if (checkTypeOfId === "string") {
      //點擊btn刪除單項目
      console.log(itemLists);
      result = itemLists.filter((item) => item.id !== id);
      deleteIdItem(token, id);
    } else {
      //清除所有已完成項目
      result = newRenderData.filter((item) => !item["completed_at"]);
      const completedItems = itemLists.filter((item) => item["completed_at"]);
      completedItems.forEach((item) => deleteIdItem(token, item.id));
    }
    setNewData(itemLists.filter((item) => !item["completed_at"]));
    setNewRenderData(result);
  }

  async function handleCompleteClick(id, index) {
    const toggle = await completeToDoListItem(token, id);
    const newSelectData = [
      ...newRenderData.slice(0, index), // 前面的元素不變
      toggle, // 替換指定索引的元素
      ...newRenderData.slice(index + 1), // 後面的元素不變
    ];

    //適應當下篩選渲染
    const result = newSelectData.filter((item) => {
      return isSelectTitleStyle !== 0 ? item.id !== id : item;
    });

    setNewData(newSelectData);
    setNewRenderData(result);
  }

  return (
    <div className="toDoListContent p-6 flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-4 relative">
        {newRenderData.map((item, index) => (
          <Fragment key={item.id}>
            <li className="border-b border-line pb-4 flex text-sm relative">
              <span
                className={
                  item["completed_at"] ? "vectorChecked" : "rectangleBox"
                }
                onClick={() => handleCompleteClick(item.id, index)}
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

export default function ToDoListContainer({
  itemLists,
  token,
  isSelectTitleStyle,
  setIsSelectTitleStyle,
  setNewData,
  newRenderData,
  setNewRenderData,
}) {
  // console.log("第二層", selectData);

  return (
    <div className="w-[500px] mt-4 bg-white rounded-[10px] shadow-[0_0_15px_0] shadow-tertiary mx-auto">
      <ToDoListTitle
        token={token}
        setNewData={setNewData}
        isSelectTitleStyle={isSelectTitleStyle}
        setIsSelectTitleStyle={setIsSelectTitleStyle}
        setNewRenderData={setNewRenderData}
      />
      <ToDoListContent
        token={token}
        isSelectTitleStyle={isSelectTitleStyle}
        itemLists={itemLists}
        setNewData={setNewData}
        newRenderData={newRenderData}
        setNewRenderData={setNewRenderData}
      />
    </div>
  );
}
