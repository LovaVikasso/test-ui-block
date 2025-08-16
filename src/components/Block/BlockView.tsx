import React from "react";

import type { BlockVariant } from "../../types";
import { IconOptions } from "../Icons";
import { Indicator } from "../Indicator";

import s from "./Block.module.scss";

type Props = {
  variant: BlockVariant;
  text: string;
  imageSrc?: string;
  count?: number;
  activeIndicator?: boolean;
  effectiveLines: number;
  indicatorReserve: number;
  onToggleEdit: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  selected?: boolean;
  focused?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export const BlockView = ({
  variant,
  text,
  imageSrc,
  count = 0,
  activeIndicator = false,
  effectiveLines,
  indicatorReserve,
  onToggleEdit,
  contentRef,
  selected = false,
  focused = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) => {
  const padClass = effectiveLines === 1 ? s.singleLine : s.multiLine;
  const isImageLeft = variant === "image-left";
  const isImageTopOrBottom =
    variant === "image-top" || variant === "image-bottom";
  const alignClass =
    isImageLeft && effectiveLines <= 2 ? s.alignMiddle : s.alignTop;

  let variantClass: string;
  switch (variant) {
    case "image-left":
      variantClass = s.imageLeft;
      break;
    case "image-top":
      variantClass = s.imageTop;
      break;
    case "image-bottom":
      variantClass = s.imageBottom;
      break;
    default:
      variantClass = "";
  }

  // Определяем стили для контента
  const contentStyle = {
    // Для вариантов с картинками сверху/снизу - фиксированные отступы 16px
    ...(isImageTopOrBottom
      ? {
          paddingTop: "16px",
          paddingBottom: "16px",
        }
      : {}),

    // IndicatorReserve только для нескольких строк и не для text варианта
    ...(effectiveLines > 1 && count && variant !== "text"
      ? {
          ["--indicatorReserve" as string]: `${indicatorReserve}px`,
        }
      : {}),
  };

  return (
    <div
      className={[
        s.view,
        padClass,
        variantClass,
        isImageLeft && alignClass,
        selected && s.selected,
        focused && s.focused,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={`${s.options} ${variant === "image-top" ? s.optionsImageTop : ""}`}
        onClick={onToggleEdit}
      >
        <IconOptions color={variant === "image-top" ? "white" : "#B4B4B4"} />
      </button>

      {variant !== "text" && imageSrc && (
        <picture
          className={`${s.imageContainer} ${focused ? s.focusedImage : ""}`}
        >
          <source srcSet={imageSrc} type="image/jpeg" />
          <img
            src={imageSrc}
            alt=""
            className={s.image}
            loading="lazy"
            decoding="async"
            width={60}
            height={60}
          />
        </picture>
      )}

      <div ref={contentRef} className={s.block__content} style={contentStyle}>
        {text}
      </div>

      {count > 0 && (
        <Indicator
          count={count}
          active={activeIndicator}
          focused={focused}
          selected={selected}
          variant={variant}
        />
      )}
    </div>
  );
};
