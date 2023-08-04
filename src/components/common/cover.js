import Logo from "../../components/common/logo.js";
import coverPic from "../../images/cover/coverPic.png";

function CoverPic() {
  return <img src={coverPic} className="max-w-[386px]" />;
}

export default function Cover() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Logo width={313} height={470} />
      <CoverPic />
    </div>
  );
}
