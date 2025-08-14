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
}: Props) => {
  // Логика отступов и классов для режима просмотра
  const padClass = effectiveLines === 1 ? s.singleLine : s.multiLine;
  const isImageLeft = variant === "image-left";
  const alignClass =
    isImageLeft && effectiveLines <= 2 ? s.alignMiddle : s.alignTop;

  let variantClass = "";
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

  return (
    <div
      className={`${s.view} ${padClass} ${variantClass} ${isImageLeft ? alignClass : ""}`}
    >
      <button
        className={`${s.options} ${variant === "image-top" ? s.optionsImageTop : ""}`}
        onClick={onToggleEdit}
      >
        <IconOptions color={variant === "image-top" ? "white" : "#B4B4B4"} />
      </button>

      {variant !== "text" && imageSrc && (
        <picture className={s.imageContainer}>
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

      <div
        ref={contentRef}
        className={s.block__content}
        style={{
          ["--indicatorReserve" as string]: count
            ? `${indicatorReserve}px`
            : "0px",
          ...(variant === "image-top" || variant === "image-bottom"
            ? {
                paddingTop: effectiveLines === 1 ? "24px" : "16px",
                paddingBottom: effectiveLines === 1 ? "24px" : "16px",
              }
            : {}),
        }}
      >
        {text}
      </div>

      {count > 0 && <Indicator count={count} active={activeIndicator} />}
    </div>
  );
};
