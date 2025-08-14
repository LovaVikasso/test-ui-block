import React, { useEffect, useMemo, useState } from "react";

import type { BlockVariant } from "../../types";
import { useLineCount } from "../../utils/useLineCount";

import s from "./Block.module.scss";
import { BlockEdit } from "./BlockEdit";
import { BlockView } from "./BlockView";

type Props = {
  variant?: BlockVariant;
  onVariantChange: (variant: BlockVariant) => void;
  text: string;
  imageSrc?: string;
  count?: number;
  activeIndicator?: boolean;
  onTextChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement> | React.FormEvent<HTMLDivElement>
  ) => void;
};

export const Block = ({
  variant = "text",
  onVariantChange,
  text,
  imageSrc,
  count = 0,
  activeIndicator = false,
  onTextChange,
}: Props) => {
  const { ref, lines } = useLineCount(text);
  const contentRef = ref;
  const [edit, setEdit] = useState(false);
  const [originalText, setOriginalText] = useState(text);
  const [currentText, setCurrentText] = useState(text);
  const [hasChanges, setHasChanges] = useState(false);

  // Синхронизируем currentText при изменении text извне
  useEffect(() => {
    setCurrentText(text);
  }, [text]);

  const toggleEdit = () => {
    if (edit) {
      // Выход из режима редактирования
      if (hasChanges) {
        // Применяем изменения
        if (onTextChange) {
          const syntheticEvent = {
            currentTarget: { value: currentText } as HTMLTextAreaElement,
            target: { value: currentText } as HTMLTextAreaElement,
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onTextChange(syntheticEvent);
        }
      }
      setHasChanges(false);
    } else {
      // Вход в режим редактирования
      setOriginalText(text);
      setCurrentText(text);
    }
    setEdit(!edit);
  };

  const handleCancelEdit = () => {
    setCurrentText(originalText);
    setHasChanges(false);
    setEdit(false);
  };

  const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newText = target.textContent || "";
    setCurrentText(newText);
    setHasChanges(newText !== originalText);
  };

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

  return (
    <div className={`${s.block} ${edit ? s.editMode : ""}`}>
      {!edit ? (
        <BlockView
          variant={variant}
          text={text}
          imageSrc={imageSrc}
          count={count}
          activeIndicator={activeIndicator}
          effectiveLines={effectiveLines}
          indicatorReserve={indicatorReserve}
          onToggleEdit={toggleEdit}
          contentRef={contentRef}
        />
      ) : (
        <BlockEdit
          variant={variant}
          text={currentText}
          hasChanges={hasChanges}
          onVariantChange={onVariantChange}
          onTextChange={handleContentChange}
          onToggleEdit={toggleEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};
