import image001 from "/images/001.jpg";
import image002 from "/images/002.jpg";
import type {BlockData} from "../types";

export const initialBlocks: BlockData[] = [
    {
        id: 0,
        text: "Drinking water isn't just about quenching thirst",
        variant: "text",
        imageSrc: image001,
    },
    {
        id: 1,
        text: "Drinking water isn't just about quenching thirst",
        variant: "image-bottom",
        imageSrc: image002,
    },
    {
        id: 2,
        text: "Drinking water isn't just about quenching thirst",
        variant: "image-left",
        imageSrc: image001,
    },
    {
        id: 3,
        text: "Drinking water isn't just about quenching thirst",
        variant: "text",
        imageSrc: image002,
    },
    {
        id: 4,
        text: "Drinking water isn't just about quenching thirst",
        variant: "image-top",
        imageSrc: image002,
    },
];