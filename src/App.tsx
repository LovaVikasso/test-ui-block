import { type ChangeEvent, useState } from "react";

import s from "./App.module.scss";
import "./assets/styles/reset.scss";
import { Block } from "./components/Block";
import { ActiveButton } from "./components/Indicator/ActiveButton.tsx";
import { Input } from "./components/Input";
import { TextArea } from "./components/TextArea";
import { TypeDropDown } from "./components/TypeDropDown";

function App() {
  const [text, setText] = useState("Простой начальный текст");
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(true);
  const toggleActive = () => setActive(!active);
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.currentTarget.value);
  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCount(Number(e.currentTarget.value));

  return (
    <div className={s.container}>
      <div className={s.control}>
        <Input
          placeholder="Текст блока"
          label="Текст блока"
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className={s.control}>
        <Input
          placeholder="Индикатор"
          label="Индикатор"
          value={count}
          type="number"
          onChange={handleCountChange}
        />
        <ActiveButton active={active} toggle={toggleActive} />
      </div>
      <div className={s.control}>
        <TextArea value={text} onChange={handleTextAreaChange} />
      </div>
      <TypeDropDown />
      <div className={s.list}>
        <Block
          text={text}
          count={count}
          activeIndicator={active}
          imageSrc="/images/001.jpg"
          variant="image-top"
        />
        <Block
          text={text}
          count={count}
          activeIndicator={active}
          imageSrc="/images/001.jpg"
          variant="image-bottom"
        />
        <Block
          text={text}
          count={count}
          activeIndicator={active}
          imageSrc="/images/001.jpg"
          variant="image-left"
        />
      </div>
    </div>
  );
}

export default App;
