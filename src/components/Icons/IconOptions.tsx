import { forwardRef } from "react";
import type { SVGProps, Ref } from "react";
interface IconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}
const SvgComponent = (
  { color = "#B4B4B4", ...props }: IconProps,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={16}
    height={7}
    viewBox="0 0 16 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <circle cx={2} cy={3.27271} r={2} fill={color} />
    <circle cx={8} cy={3.27271} r={2} fill={color} />
    <circle cx={14} cy={3.27271} r={2} fill={color} />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
export { ForwardRef as IconOptions };
