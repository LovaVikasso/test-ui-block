import { type ChangeEvent, useState, useEffect, useCallback } from "react";

import type { BlockData, BlockVariant } from "../../types";
import { Block } from "../Block";

import s from "./BlockList.module.scss";

type Props = {
  data: BlockData[];
};

export const BlockList = ({ data }: Props) => {
  const [blocks, setBlocks] = useState<BlockData[]>(data);
  const [keyboardFocusedIndex, setKeyboardFocusedIndex] = useState<number>(-1);
  const [editingBlockId, setEditingBlockId] = useState<number | null>(null);

  const handleTextChange = (
    id: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    setBlocks(prevBlocks =>
      prevBlocks.map(block => (block.id === id ? { ...block, text } : block))
    );
  };

  const handleVariantChange = (id: number, variant: BlockVariant) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block => (block.id === id ? { ...block, variant } : block))
    );
  };

  const handleBlockClick = (id: number) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block => ({
        ...block,
        selected: block.id === id ? !block.selected : block.selected,
      }))
    );
    setKeyboardFocusedIndex(-1);
  };

  const handleBlockHover = (id: number, isHovering: boolean) => {
    if (editingBlockId !== null) return;
    if (isHovering) {
      const blockIndex = blocks.findIndex(block => block.id === id);
      if (blockIndex !== -1) {
        setKeyboardFocusedIndex(blockIndex);
        setBlocks(prevBlocks =>
          prevBlocks.map(block => ({
            ...block,
            focused: block.id === id,
          }))
        );
      }
    }
  };

  const handleEditModeChange = (id: number, isEditing: boolean) => {
    if (isEditing) {
      setEditingBlockId(id);
      setBlocks(prevBlocks =>
        prevBlocks.map(block => ({
          ...block,
          focused: false,
          selected: false,
        }))
      );
      setKeyboardFocusedIndex(-1);
    } else {
      setEditingBlockId(null);
    }
  };

  const toggleBlockSelected = (blockId: number) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block => ({
        ...block,
        selected: block.id === blockId ? !block.selected : block.selected,
      }))
    );
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (editingBlockId !== null) return;

      if (blocks.length === 0) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setKeyboardFocusedIndex(prev => {
            const newIndex = prev <= 0 ? blocks.length - 1 : prev - 1;
            setBlocks(prevBlocks =>
              prevBlocks.map((block, index) => ({
                ...block,
                focused: index === newIndex,
              }))
            );
            return newIndex;
          });
          break;
        case "ArrowDown":
          e.preventDefault();
          setKeyboardFocusedIndex(prev => {
            const newIndex = prev >= blocks.length - 1 ? 0 : prev + 1;

            setBlocks(prevBlocks =>
              prevBlocks.map((block, index) => ({
                ...block,
                focused: index === newIndex,
              }))
            );
            return newIndex;
          });
          break;
        case " ":
          e.preventDefault();
          if (
            keyboardFocusedIndex >= 0 &&
            keyboardFocusedIndex < blocks.length
          ) {
            const blockId = blocks[keyboardFocusedIndex].id;
            toggleBlockSelected(blockId);
          } else {
            const firstBlockId = blocks[0]?.id;
            if (firstBlockId) {
              toggleBlockSelected(firstBlockId);
            }
          }
          break;
      }
    },
    [blocks, keyboardFocusedIndex, editingBlockId]
  );

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(`.${s.list}`)) {
        if (editingBlockId === null) {
          setKeyboardFocusedIndex(-1);
          setBlocks(prevBlocks =>
            prevBlocks.map(block => ({
              ...block,
              focused: false,
            }))
          );
        }
      }
    },
    [editingBlockId]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleKeyDown, handleClickOutside]);

  return (
    <div
      className={`${s.list} ${editingBlockId !== null ? s.editingMode : ""}`}
    >
      {blocks.map((block, _index) => (
        <Block
          key={block.id}
          text={block.text}
          count={10}
          onTextChange={e => handleTextChange(block.id, e)}
          activeIndicator={_index % 2 === 0} //для просмотра двух вариантов
          imageSrc={block.imageSrc}
          variant={block.variant}
          onVariantChange={variant => handleVariantChange(block.id, variant)}
          selected={block.selected}
          focused={block.focused}
          isEditing={editingBlockId === block.id}
          onClick={() => handleBlockClick(block.id)}
          onMouseEnter={() => handleBlockHover(block.id, true)}
          onMouseLeave={() => handleBlockHover(block.id, false)}
          onEditModeChange={isEditing =>
            handleEditModeChange(block.id, isEditing)
          }
        />
      ))}
    </div>
  );
};
