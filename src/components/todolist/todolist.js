import CoverTitle from "../../components/common/header";
import ToDoListContainer from "./ToDoListContainer";
import Container from "../../components/common/container";
import { Input } from "../common/input";
import plusBtn from "../../images/btn/plusBtn.png";

function AddItem() {
  return (
    <div className="mt-10 w-[500px] mx-auto flex shadow-[0_0_15px_0] shadow-tertiary rounded-[10px] h-[48px]">
      <Input
        name="addToDoList"
        value=""
        showContent="新增代辦事項"
        onChange="onChange"
      />
      <button className="w-10 -ms-11">
        <img src={plusBtn} className="w-full" />
      </button>
    </div>
  );
}

export default function ToDoList({ onClickPage }) {
  return (
    <section
      style={{
        background: `linear-gradient(177deg, #FFD370 54%,#fff 54%)`,
      }}
      className="pt-4 pl-[34px] pr-8"
    >
      <Container>
        <CoverTitle onClickPage={onClickPage} />
        <AddItem />
        <ToDoListContainer />
      </Container>
    </section>
  );
}
