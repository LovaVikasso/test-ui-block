import type {BlockVariant} from "../../types";
import {Indicator} from "../Indicator";
import {useMemo} from "react";
import {IconOptions} from "../Icons";
import s from "./Block.module.scss"

type Props = {
    variant?: BlockVariant;
    text: string;
    imageSrc?: string;
    count?: number;
    activeIndicator?: boolean
}
export const Block = ({variant = 'text', text, imageSrc, count = 0, activeIndicator = false}: Props) => {
    const lineCount = useMemo(() => text.split('\n').length, [text]);
    const blockClass = lineCount === 1 ? s.singleLine : s.multiLine;
    console.log(lineCount, 'lineCount')
    return (
        <div className={`${s.block} ${blockClass}`}>
        <button className={s.options}><IconOptions /> </button>
            {variant === 'image' &&  (
                <picture className={s.imageContainer}>
                    {/*<source srcSet={imageSrc.replace(/\.jpg$/, '.webp')} type="image/webp"/>*/}
                    <source srcSet={imageSrc} type="image/jpeg"/>
                    <img
                        src={imageSrc}
                         alt=""
                         className={s.image}
                         loading="lazy"
                         decoding="async"
                         width={40}
                         height={40}
                />
                </picture>
                )}
            <div className={s.block__content}>
                {text.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                ))}
            </div>
            {count > 0 && <Indicator count={count} active={activeIndicator}/>}
        </div>
    );
};
