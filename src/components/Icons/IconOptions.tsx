import { forwardRef } from "react";
import type { SVGProps, Ref } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
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
    <circle cx={2} cy={3.27271} r={2} fill="#B4B4B4" />
    <circle cx={8} cy={3.27271} r={2} fill="#B4B4B4" />
    <circle cx={14} cy={3.27271} r={2} fill="#B4B4B4" />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
export { ForwardRef as IconOptions };
