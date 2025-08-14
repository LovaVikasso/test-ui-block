import { type JSX, useState } from "react";

import type { BlockVariant } from "../../types";
import {
  IconImageBottom,
  IconImageLeft,
  IconImageTop,
  IconText,
} from "../Icons";

import s from "./TypeControl.module.scss";

type Props = {
  variant?: BlockVariant;
  onChange?: (value: BlockVariant) => void;
};

const options: { value: BlockVariant; icon: JSX.Element }[] = [
  { value: "text", icon: <IconText /> },
  { value: "image-bottom", icon: <IconImageBottom /> },
  { value: "image-top", icon: <IconImageTop /> },
  { value: "image-left", icon: <IconImageLeft /> },
];

export const TypeControl = ({ variant = "text", onChange }: Props) => {
  const [active, setActive] = useState<BlockVariant>(variant);

  const handleClick = (value: BlockVariant) => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div className={s.root}>
      {options.map(opt => (
        <button
          key={opt.value}
          className={`${s.item} ${active === opt.value ? s.active : ""}`}
          onClick={() => handleClick(opt.value)}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};
