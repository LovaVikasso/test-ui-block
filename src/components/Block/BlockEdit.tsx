import React, { useRef, useEffect } from "react";

import type { BlockVariant } from "../../types";
import { IconArrowUp, IconCross, IconImageDummy } from "../Icons";
import { TypeDropDown } from "../TypeDropDown";

import s from "./Block.module.scss";

type Props = {
  variant: BlockVariant;
  text: string;
  hasChanges: boolean;
  onVariantChange: (variant: BlockVariant) => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onToggleEdit: () => void;
  onCancelEdit: () => void;
};

export const BlockEdit = ({
  variant,
  text,
  hasChanges,
  onVariantChange,
  onTextChange,
  onToggleEdit,
  onCancelEdit,
}: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      const minHeight = variant === "text" ? 74 : 48;
      textareaRef.current.style.height = minHeight + "px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height =
        Math.max(scrollHeight, minHeight) + "px";
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [text, variant]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const minHeight = variant === "text" ? 74 : 48;
    textarea.style.height = minHeight + "px";
    textarea.style.height = Math.max(textarea.scrollHeight, minHeight) + "px";
    onTextChange(e);
  };

  const renderTextArea = () => {
    const minHeight = variant === "text" ? 74 : 48;
    return (
      <textarea
        ref={textareaRef}
        className={s.contentEditable}
        value={text}
        onChange={handleTextChange}
        placeholder="Write your idea!"
        autoFocus
        style={{ minHeight: minHeight + "px" }}
      />
    );
  };

  return (
    <div className={s.edit}>
      <div className={s.editControl}>
        <button onClick={onCancelEdit}>
          <IconCross />
        </button>
        <div className={s.contentControl}>
          <TypeDropDown variant={variant} onChange={onVariantChange} />
          <button
            className={`${s.arrowControl} ${hasChanges ? s.arrowControlActive : ""}`}
            onClick={onToggleEdit}
            disabled={!hasChanges}
          >
            <IconArrowUp />
          </button>
        </div>
      </div>
      <div className={s.content}>
        {variant === "text" && (
          <div className={`${s.text} ${s.textArea}`}>{renderTextArea()}</div>
        )}
        {variant === "image-left" && (
          <div className={s.imageLeftContent}>
            <div className={s.imagePlaceholder}>
              <IconImageDummy />
            </div>
            <div className={s.textArea}>{renderTextArea()}</div>
          </div>
        )}
        {variant === "image-top" && (
          <div className={s.imageTopContent}>
            <div className={s.imagePlaceholder}>
              <IconImageDummy />
            </div>
            <div className={s.textArea}>{renderTextArea()}</div>
          </div>
        )}
        {variant === "image-bottom" && (
          <div className={s.imageBottomContent}>
            <div className={s.textArea}>{renderTextArea()}</div>
            <div className={s.imagePlaceholder}>
              <IconImageDummy />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
