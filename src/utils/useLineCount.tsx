import { useEffect, useRef, useState } from "react";

export const useLineCount = (text: string, indicatorWidth: number = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(1);
  const [bumped, setBumped] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const tempEl = document.createElement("div");
    const style = window.getComputedStyle(el);

    tempEl.style.font = style.font;
    tempEl.style.lineHeight = style.lineHeight;
    tempEl.style.padding = "0";
    tempEl.style.margin = "0";
    tempEl.style.border = "none";
    tempEl.style.position = "absolute";
    tempEl.style.visibility = "hidden";
    tempEl.style.whiteSpace = "pre-wrap";
    tempEl.style.overflowWrap = "break-word";
    tempEl.style.width = style.width;

    tempEl.textContent = text || " ";
    document.body.appendChild(tempEl);

    const lineHeight =
      parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
    const height = tempEl.getBoundingClientRect().height;
    const calculatedLines = Math.round(height / lineHeight);

    let lastLineBumped = false;

    if (indicatorWidth > 0 && el.clientWidth > 0) {
      const range = document.createRange();
      range.selectNodeContents(tempEl);
      const rects = Array.from(range.getClientRects());
      if (rects.length > 0) {
        const lastRect = rects[rects.length - 1];
        // проверяем, помещается ли последняя линия с индикатором
        if (lastRect.width + indicatorWidth > el.clientWidth) {
          lastLineBumped = true;
        }
      }
    }

    document.body.removeChild(tempEl);

    setLines(Math.max(1, calculatedLines));
    setBumped(lastLineBumped);
  }, [text, indicatorWidth]);

  return { ref, lines, bumped };
};
