import { forwardRef } from "react";
import type { SVGProps, Ref } from "react";

const SvgComponent = (
    props: SVGProps<SVGSVGElement>,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
      <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
      />
    </svg>
);

const ForwardRef = forwardRef(SvgComponent);
export { ForwardRef as IconCross };
