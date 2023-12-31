import Cover from "./Cover.js";
import Container from "./Container.js";
import { Outlet } from "react-router-dom";

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
