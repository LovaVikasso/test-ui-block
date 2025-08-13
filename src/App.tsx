import {Block} from "./components/Block";
import {Input} from "./components/Input";
import {type ChangeEvent, useState} from "react";
import {TextArea} from "./components/TextArea";
import './assets/styles/reset.scss'
import s from './App.module.scss'
import {ActiveButton} from "./components/Indicator/ActiveButton.tsx";

function App() {
    const [text, setText] = useState('Простой начальный текст');
    const [count, setCount] = useState(1);
    const [active, setActive] = useState(true);
    const toggleActive = () => setActive(!active);
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value);
    const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => setText(e.currentTarget.value);
    const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => setCount(Number(e.currentTarget.value));

    return (
        <div className={s.container}>
            <div className={s.control}>
                <Input placeholder="Text" label="Text" value={text} onChange={handleTextChange}/>
            </div>
            <div className={s.control}>
                <Input placeholder="Indicator" label="Indicator" value={count} type="number"
                                              onChange={handleCountChange}/>
                <ActiveButton active={active} toggle={toggleActive}/>
            </div>
            <div className={s.control}><TextArea value={text} onChange={handleTextAreaChange}/></div>
            <div className={s.list}>
                <Block text={text} count={count} activeIndicator={active}/>
                <Block text={text} count={count} activeIndicator={active}
                       imageSrc="/images/001.jpg"
                       variant="image"/>
            </div>
        </div>
    )
}

export default App
