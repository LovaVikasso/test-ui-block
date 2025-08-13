import { useEffect, useRef, useState } from "react";

export const useLineCount = (text: string) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState(1);

  useEffect(() => {
    if (ref.current) {
      const el = ref.current;

      const style = window.getComputedStyle(el);
      const lineHeight = parseFloat(style.lineHeight);

      const calculatedLines = Math.round(el.scrollHeight / lineHeight);

      setLines(calculatedLines);
    }
  }, [text]);

  return { ref, lines };
};
