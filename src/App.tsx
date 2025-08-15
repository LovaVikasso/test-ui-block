import s from "./App.module.scss";
import "./assets/styles/reset.scss";
import { BlockList } from "./components/BlockList";
import { initialBlocks } from "./data";

function App() {
  return (
    <div className={s.container}>
      <BlockList data={initialBlocks} />
    </div>
  );
}

export default App;
