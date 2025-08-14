import { type ChangeEvent, useState } from "react";

import s from "./App.module.scss";
import "./assets/styles/reset.scss";
import { Block } from "./components/Block";
import { ActiveButton } from "./components/Indicator/ActiveButton.tsx";
import type {BlockVariant} from "./types";

function App() {
  const [text, setText] = useState("Простой начальный текст");
  const [count] = useState(777);
  const [active, setActive] = useState(true);
    const [type, setType] = useState<BlockVariant>("text");
    const typeChangeHandler = (type: BlockVariant) => setType(type);
  const toggleActive = () => setActive(!active);
  const handleTextAreaChange = (
    e: ChangeEvent<HTMLTextAreaElement> | React.FormEvent<HTMLDivElement>
  ) => {
    if ("currentTarget" in e && "value" in e.currentTarget) {
      setText(e.currentTarget.value);
    } else if ("target" in e && "textContent" in e.target) {
      setText(e.target.textContent || "");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.control}>
        <ActiveButton active={active} toggle={toggleActive} />
      </div>
      <div className={s.list}>
        <Block
          text={text}
          count={count}
          onTextChange={handleTextAreaChange}
          activeIndicator={active}
          imageSrc="/images/001.jpg"
          variant={type}
          onVariantChange={typeChangeHandler}
        />
      </div>
    </div>
  );
}

export default App;
