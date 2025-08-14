import { forwardRef } from "react";
import type { SVGProps, Ref } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={22}
    height={22}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <rect
      x={22}
      y={21.2}
      width={22}
      height={10}
      rx={2}
      transform="rotate(-180 22 21.2)"
      fill="#6E6E6E"
    />
    <rect
      x={22}
      y={8.20001}
      width={22}
      height={2.6}
      rx={1.3}
      transform="rotate(-180 22 8.20001)"
      fill="#A7A7A7"
    />
    <rect
      x={22}
      y={2.60001}
      width={22}
      height={2.6}
      rx={1.3}
      transform="rotate(-180 22 2.60001)"
      fill="#A7A7A7"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
export { ForwardRef as IconImageBottom };
