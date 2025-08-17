import type { BlockVariant } from "../../types";

import s from "./Indicator.module.scss";

type Props = {
  count?: number;
  active?: boolean;
  focused?: boolean;
  selected?: boolean;
  variant: BlockVariant;
};

export const Indicator = ({
  count = 0,
  active = false,
  focused = false,
  selected = false,
  variant,
}: Props) => {
  if (count <= 0) return null;
  const isImageBottom = variant === "image-bottom";
  const showFocusedSelected = focused && selected && !isImageBottom && !active;
  return (
    <div
      className={`${s.indicator} 
      ${active ? s.active : ""}
      ${selected && !active ? s.selected : ""}
      ${isImageBottom ? s.imageBottom : ""}
      ${focused && !active ? s.focused : ""} 
      ${showFocusedSelected ? s.focusedSelected : ""}`}
    >
      {active && "+"}
      {count > 9999 ? 9999 : count}
    </div>
  );
};
