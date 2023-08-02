import logo from "./img/cover/logo.png";
import coverPic from "./img/cover/coverPic.png";
import coverPic2 from "./img/cover/coverPic2.png";

function Logo({ width, height }) {
  return (
    <h1>
      <a
        href="#"
        className={`w-[313px] h-[47px] block indent-[101%] overflow-hidden whitespace-nowrap mx-auto`}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        ONLINE TODO LIST
      </a>
    </h1>
  );
}

function CoverPic() {
  return <img src={coverPic} />;
}

export default function Cover() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Logo width={313} height={470} />
      <CoverPic />
    </div>
  );
}
