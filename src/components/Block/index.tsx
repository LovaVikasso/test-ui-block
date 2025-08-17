import React, {
  type ChangeEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
  selected?: boolean;
  focused?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onTextChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onEditModeChange?: (isEditing: boolean) => void;
};

export const Block = ({
  variant = "text",
  onVariantChange,
  text,
  imageSrc,
  count = 0,
  activeIndicator = false,
  selected = false,
  focused = false,
  isEditing = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onTextChange,
  onEditModeChange,
}: Props) => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  useLayoutEffect(() => {
    if (indicatorRef.current && count > 0) {
      setIndicatorWidth(indicatorRef.current.offsetWidth);
    } else {
      setIndicatorWidth(0);
    }
  }, [count]);

  const { ref: contentRef, lines, bumped } = useLineCount(text, indicatorWidth);
  const [edit, setEdit] = useState(isEditing);
  const [originalText, setOriginalText] = useState(text);
  const [originalVariant, setOriginalVariant] = useState(variant);
  const [currentText, setCurrentText] = useState(text);
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setCurrentText(text);
    setCurrentVariant(variant);
  }, [text, variant]);

  useEffect(() => {
    setEdit(isEditing);
  }, [isEditing]);

  const toggleEdit = () => {
    if (edit && hasChanges) {
      if (onTextChange) {
        const syntheticEvent = {
          currentTarget: { value: currentText } as HTMLTextAreaElement,
          target: { value: currentText } as HTMLTextAreaElement,
        } as ChangeEvent<HTMLTextAreaElement>;
        onTextChange(syntheticEvent);
      }
      onVariantChange(currentVariant);
      setHasChanges(false);
    } else if (!edit) {
      setOriginalText(text);
      setOriginalVariant(variant);
      setCurrentText(text);
      setCurrentVariant(variant);
    }
    const newEditState = !edit;
    setEdit(newEditState);
    onEditModeChange?.(newEditState);
  };

  const handleCancelEdit = () => {
    setCurrentText(originalText);
    setCurrentVariant(originalVariant);
    setHasChanges(false);
    setEdit(false);
    onEditModeChange?.(false);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setCurrentText(newText);
    setHasChanges(
      newText !== originalText || currentVariant !== originalVariant
    );
  };

  const handleVariantChange = (newVariant: BlockVariant) => {
    setCurrentVariant(newVariant);
    setHasChanges(
      currentText !== originalText || newVariant !== originalVariant
    );
  };

  const indicatorReserve = indicatorWidth;

  const effectiveLines = lines + (bumped ? 1 : 0);

  return (
    <div
      className={[
        s.block,
        edit ? s.editMode : "",
        selected ? s.selected : "",
        focused ? s.focused : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
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
          indicatorRef={indicatorRef}
          selected={selected}
          focused={focused}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          bumped={bumped}
        />
      ) : (
        <BlockEdit
          variant={currentVariant}
          text={currentText}
          hasChanges={hasChanges}
          onVariantChange={handleVariantChange}
          onTextChange={handleContentChange}
          onToggleEdit={toggleEdit}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};
