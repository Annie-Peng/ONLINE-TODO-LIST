import "./App.css";
import Cover from "./cover.js";
import FormContent from "./formContent.js";

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
