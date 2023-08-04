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

function ToDoListContent() {
  return (
    <div className="toDoListContent p-6 flex flex-col gap-y-4">
      <ul className="flex flex-col gap-y-4">
        <li className="border-b border-line pb-4 flex rectangleBox text-sm">
          把冰箱發霉的檸檬拿去丟
        </li>
      </ul>
      <p className="py-2 flex justify-between">
        <span className="text-sm">5 個待完成項目</span>
        <button className="text-sm text-tertiary">清除已完成項目</button>
      </p>
    </div>
  );
}

export default function ToDoListContainer() {
  return (
    <div className="w-[500px] mt-4 bg-white rounded-[10px] shadow-[0_0_15px_0] shadow-tertiary mx-auto">
      <ToDoListTitle />
      <ToDoListContent />
    </div>
  );
}
