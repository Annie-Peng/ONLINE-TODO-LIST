import Logo from "./Logo.js";
import coverPic from "../../images/cover/coverPic.png";

export default function Cover() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Logo width={313} height={470} />
      <div className="max-w-[386px]">
        <img src={coverPic} />
      </div>
    </div>
  );
}
