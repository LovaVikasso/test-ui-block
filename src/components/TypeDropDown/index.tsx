import {Popover} from "@radix-ui/themes";
import {type JSX} from "react";

import type {BlockVariant} from "../../types";
import {IconImageBottom, IconImageLeft, IconImageTop, IconText,} from "../Icons";
import {TypeControl} from "../TypeControl";

import s from "./TypeDropDown.module.scss";

type Props = {
    variant?: BlockVariant;
    onChange?: (value: BlockVariant) => void;
};
export const TypeDropDown = ({variant = "text", onChange}: Props) => {
    const iconMap: Record<BlockVariant, JSX.Element> = {
        text: <IconText/>,
        "image-bottom": <IconImageBottom/>,
        "image-top": <IconImageTop/>,
        "image-left": <IconImageLeft/>,
    };
    return (
        <Popover.Root>
            <Popover.Trigger>
                <button
                    className={`${s.trigger} ${variant === "image-left" ? s.imageLeft : ""}`}>{iconMap[variant]}</button>
            </Popover.Trigger>
            <Popover.Content side="top"        // открытие вверх
                             align="start"     // выравнивание по левому краю
                             sideOffset={8}    // отступ сверху
                             alignOffset={-170} // смещение влево
            >
                <TypeControl variant={variant} onChange={onChange}/>
            </Popover.Content>
        </Popover.Root>
    );
};
