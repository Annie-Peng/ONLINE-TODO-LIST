import Logo from "../common/Logo";
import { Link } from "react-router-dom";
import { logoutToDoList } from "../common/api";
import { token } from "./index";

export default function Header({ userName }) {
  return (
    <header className="flex justify-between items-center">
      <Logo width={242} height={38} />
      <h4 className="font-bold ms-auto">{userName}的代辦</h4>
      <button
        value="showLogin"
        className="font-normal ms-6"
        // onClick={() => logoutToDoList(token)}
      >
        <Link to="/ONLINE-TODO-LIST/">登出</Link>
      </button>
    </header>
  );
}
