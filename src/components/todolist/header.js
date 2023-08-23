import Logo from "../common/Logo";
import { useNavigate } from "react-router-dom";
import { logoutToDoList } from "../common/api";

export default function Header({ userName, token }) {
  const navigate = useNavigate();

  async function clickHandler() {
    const logoutResult = await logoutToDoList(token);
    if (!logoutResult) return navigate("/ONLINE-TODO-LIST/error");
    if (logoutResult.message === "已登出") {
      alert("登出成功！");
      return navigate("/ONLINE-TODO-LIST/");
    }
  }
  return (
    <header className="flex justify-between items-center">
      <Logo width={242} height={38} />
      <h4 className="font-bold ms-auto">{userName}的代辦</h4>
      <button
        value="showLogin"
        className="font-normal ms-6"
        onClick={clickHandler}
      >
        登出
      </button>
    </header>
  );
}
