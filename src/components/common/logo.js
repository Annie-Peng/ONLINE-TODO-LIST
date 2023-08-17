import logo from "../../images/cover/logo.png";
import { Link } from "react-router-dom";

export default function Logo({ width, height }) {
  return (
    <h1>
      <Link
        to={`/ONLINE-TODO-LIST/`}
        className={`w-[313px] h-[47px] block indent-[101%] overflow-hidden whitespace-nowrap mx-auto`}
        style={{
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        ONLINE TODO LIST
      </Link>
    </h1>
  );
}
