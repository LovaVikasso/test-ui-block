import s from "./Indicator.module.scss";

type Props = {
  count?: number;
  active?: boolean;
  focused?: boolean;
};

export const Indicator = ({
  count = 0,
  active = false,
  focused = false,
}: Props) => {
  if (count <= 0) return null;
  return (
    <div
      className={`${s.indicator} ${active ? s.active : ""} ${
        focused && !active ? s.focused : ""
      }`}
    >
      {active && "+"} {count > 9999 ? 9999 : count}
    </div>
  );
};
