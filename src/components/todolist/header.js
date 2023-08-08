import Logo from "../common/Logo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <Logo width={242} height={38} />
      <h4 className="font-bold ms-auto">王小明的代辦</h4>
      <button value="showLogin" className="font-normal ms-6">
        <Link to="/ONLINE-TODO-LIST/">登出</Link>
      </button>
    </header>
  );
}
