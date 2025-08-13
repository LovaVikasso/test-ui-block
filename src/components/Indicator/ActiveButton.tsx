import s from "./Indicator.module.scss";

type Props = {
    active: boolean;
    toggle: () => void;
}
export const ActiveButton = ({active, toggle}: Props) => {
    return (
        <button className={`${s.indicator} ${s.noAbsolute} ${active ? s.active : ''}`}
                onClick={toggle}>{active ? "Active" : "Not active"}</button>
    );
};
