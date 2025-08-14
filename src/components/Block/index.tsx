import { useEffect, useMemo, useState } from "react";

import type { BlockVariant } from "../../types";
import { useLineCount } from "../../utils/useLineCount";
import { IconOptions } from "../Icons";
import { Indicator } from "../Indicator";

import s from "./Block.module.scss";

type Props = {
  variant?: BlockVariant;
  text: string;
  imageSrc?: string;
  count?: number;
  activeIndicator?: boolean;
};

export const Block = ({
  variant = "text",
  text,
  imageSrc,
  count = 0,
  activeIndicator = false,
}: Props) => {
  const { ref, lines } = useLineCount(text);
  const contentRef = ref;
  const [edit, setEdit] = useState(false);
  console.log(edit, "edit");
  const toggleEdit = () => setEdit(!edit);
  const indicatorReserve = useMemo(() => {
    if (!count) return 0;
    const digits = String(Math.abs(count)).length;
    const base = 18;
    const perDigit = 6;
    const gap = 8;
    return base + perDigit * digits + gap;
  }, [count]);

  const [needsBump, setNeedsBump] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    if (!count) {
      setNeedsBump(false);
      return;
    }

    const el = contentRef.current;

    const getLastLineRect = (): DOMRect | null => {
      let lastNode: Node | null = el.lastChild;
      while (lastNode && lastNode.nodeType !== Node.TEXT_NODE) {
        lastNode = (lastNode as Element).lastChild;
      }
      if (!lastNode) return null;
      const range = document.createRange();
      range.selectNodeContents(lastNode);
      const rects = range.getClientRects();
      return rects.length ? rects[rects.length - 1] : null;
    };

    const id = requestAnimationFrame(() => {
      const lastRect = getLastLineRect();
      const contentRect = el.getBoundingClientRect();
      if (!lastRect) {
        setNeedsBump(false);
        return;
      }

      const fits = lastRect.right + indicatorReserve <= contentRect.right;
      setNeedsBump(!fits);
    });

    return () => cancelAnimationFrame(id);
  }, [text, count, indicatorReserve, contentRef]);

  const effectiveLines = lines + (lines === 1 && needsBump ? 1 : 0);
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
      className={`${s.block} ${padClass} ${variantClass} ${isImageLeft ? alignClass : ""}`}
    >
        {<button className={s.options} onClick={toggleEdit}>
        <IconOptions />
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
        }}
      >
        {text}
      </div>

      {count > 0 && <Indicator count={count} active={activeIndicator} />}
    </div>
  );
};
