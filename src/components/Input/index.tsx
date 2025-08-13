import { TextField } from "@radix-ui/themes";
import type { ComponentProps } from "react";

import s from "./Input.module.scss";

interface InputProps
  extends Omit<
    ComponentProps<"input">,
    "color" | "size" | "value" | "defaultValue" | "slot"
  > {
  value?: string | number;
  placeholder?: string;
  label?: string;
  className?: string;
  type?: "number" | "text";
}

export function Input({
  type = "text",
  placeholder,
  label,
  ...props
}: InputProps) {
  return (
    <div>
      {label && <label className={s.label}>{label}</label>}
      <TextField.Root
        size="2"
        placeholder={placeholder}
        {...props}
        type={type}
        className={s.input}
      />
    </div>
  );
}
