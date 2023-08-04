import logo from "../../images/cover/logo.png";

export default function Logo({ width, height }) {
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
