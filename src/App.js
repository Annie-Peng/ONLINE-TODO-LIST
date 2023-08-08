import Cover from "./components/common/Cover.js";
import Container from "./components/common/Container";
import Login from "./components/login";
import { Outlet, Link } from "react-router-dom";

export default function CommonPage() {
  return (
    <section className="bg-primary h-screen w-screen flex justify-center">
      <Container>
        <div
          className="flex w-full justify-center gap-[106px] h-[448px] items-center absolute top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2"
        >
          <Cover />
          <Outlet />
        </div>
      </Container>
    </section>
  );
}
