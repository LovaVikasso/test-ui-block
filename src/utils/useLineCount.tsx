import { useEffect, useRef, useState } from "react";

export const useLineCount = (text: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(1);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;

      const tempEl = document.createElement("div");
      const style = window.getComputedStyle(el);

      tempEl.style.font = style.font;
      tempEl.style.lineHeight = style.lineHeight;
      tempEl.style.width = style.width;
      tempEl.style.padding = "0";
      tempEl.style.margin = "0";
      tempEl.style.border = "none";
      tempEl.style.position = "absolute";
      tempEl.style.visibility = "hidden";
      tempEl.style.whiteSpace = "pre-wrap";
      tempEl.style.overflowWrap = "break-word";

      tempEl.textContent = text || " ";
      document.body.appendChild(tempEl);

      const lineHeight =
        parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2;
      const height = tempEl.getBoundingClientRect().height;
      const calculatedLines = Math.round(height / lineHeight);

      document.body.removeChild(tempEl);

      setLines(Math.max(1, calculatedLines));
    }
  }, [text]);

  return { ref, lines };
};
