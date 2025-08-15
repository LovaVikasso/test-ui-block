export type BlockVariant = "text" | "image-left" | "image-top" | "image-bottom";
export type BlockData = {
  id: number;
  text: string;
  variant: BlockVariant;
  imageSrc?: string;
  selected?: boolean;
  focused?: boolean;
};
