import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="flex flex-col items-center justify-center h-screen leading-8 bg-primary"
    >
      <h1 className="text-6xl leading-[80px]">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p></p>
      <h2 className="text-4xl">
        <Link to={"/ONLINE-TODO-LIST/"}>
          <button className="block mx-auto mt-6 px-12 py-3 text-white bg-secondary rounded-[10px]">
            點擊回到首頁
          </button>
        </Link>
      </h2>
    </div>
  );
}
