import { forwardRef } from "react";
import type { SVGProps, Ref } from "react";
const SvgComponent = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={36}
    height={12}
    viewBox="0 0 36 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <rect width={12} height={12} rx={2} fill="#6E6E6E" />
    <rect x={14} y={1.39999} width={22} height={2.6} rx={1.3} fill="#A7A7A7" />
    <rect x={14} y={8} width={22} height={2.6} rx={1.3} fill="#A7A7A7" />
  </svg>
);
const ForwardRef = forwardRef(SvgComponent);
export { ForwardRef as IconImageLeft };
