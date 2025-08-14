import { forwardRef } from "react";
import type { SVGProps, Ref } from "react";
interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}
const SvgComponent = (
    { size = 12, color = '#9B9B9B', ...props }: IconProps,
    ref: Ref<SVGSVGElement>,
) => (
  <svg
    width={12}
    height={13}
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M1 11.5L11 1.5"
      stroke="#9B9B9B"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 11.5L1 1.5"
      stroke="#9B9B9B"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
export { ForwardRef as IconCross };
