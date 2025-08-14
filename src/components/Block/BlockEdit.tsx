import React from "react";
import type { BlockVariant } from "../../types";
import { IconArrowUp, IconCross, IconImageDummy } from "../Icons";
import { TypeDropDown } from "../TypeDropDown";
import s from "./Block.module.scss";

type BlockEditProps = {
  variant: BlockVariant;
  text: string;
  hasChanges: boolean;
  onVariantChange: (variant: BlockVariant) => void;
  onTextChange: (e: React.FormEvent<HTMLDivElement>) => void;
  onToggleEdit: () => void;
  onCancelEdit: () => void;
};

export const BlockEdit: React.FC<BlockEditProps> = ({
  variant,
  text,
  hasChanges,
  onVariantChange,
  onTextChange,
  onToggleEdit,
  onCancelEdit,
}) => {
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
          <div className={`${s.text} ${s.textArea}`}>
            <div
              className={s.contentEditable}
              contentEditable
              suppressContentEditableWarning
              onInput={onTextChange}
              data-placeholder="Write your idea!"
            >
              {text}
            </div>
          </div>
        )}
        {variant === "image-left" && (
          <div className={s.imageLeftContent}>
            <div className={s.imagePlaceholder}>
              <IconImageDummy />
            </div>
            <div className={s.textArea}>
              <div
                className={s.contentEditable}
                contentEditable
                suppressContentEditableWarning
                onInput={onTextChange}
                data-placeholder="Write your idea!"
              >
                {text}
              </div>
            </div>
          </div>
        )}
        {variant === "image-top" && (
          <div className={s.imageTopContent}>
            <div className={s.imagePlaceholder}>
              <IconImageDummy />
            </div>
            <div className={s.textArea}>
              <div
                className={s.contentEditable}
                contentEditable
                suppressContentEditableWarning
                onInput={onTextChange}
                data-placeholder="Write your idea!"
              >
                {text}
              </div>
            </div>
          </div>
        )}
        {variant === "image-bottom" && (
          <div className={s.imageBottomContent}>
            <div className={s.textArea}>
              <div
                className={s.contentEditable}
                contentEditable
                suppressContentEditableWarning
                onInput={onTextChange}
                data-placeholder="Write your idea!"
              >
                {text}
              </div>
            </div>
            <div className={s.imagePlaceholder}>
              <IconImageDummy />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
