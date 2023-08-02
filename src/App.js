import "./App.css";
import Cover from "./components/common/cover.js";
import FormContent from "./components/login/formContent.js";

function App() {
  return (
    <section className="bg-primary h-screen w-screen flex items-center justify-center ">
      <div className="flex gap-[106px] h-[448px] items-center">
        <Cover />
        <FormContent />
      </div>
    </section>
  );
}

export default App;
