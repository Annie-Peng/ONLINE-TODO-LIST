import Logo from "./logo";

export default function CoverTitle({ onClickPage }) {
  return (
    <header className="flex justify-between items-center">
      <Logo width={242} height={38} />
      <h4 className="font-bold ms-auto">王小明的代辦</h4>
      <button
        value="showLogin"
        className="font-normal ms-6"
        onClick={onClickPage}
      >
        登出
      </button>
    </header>
  );
}
