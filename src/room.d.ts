import { Wall, PaintNeeded } from './wall.ts';
export declare class Room {
    name: string;
    walls: Wall[];
    constructor(name: string, walls: Wall[]);
    getColorsNeeded(): string[];
    getUniqueColors(colorList: string[]): PaintNeeded[];
    addAreaToColor(wallList: Wall[], paintNeededList: PaintNeeded[]): PaintNeeded[];
    getPaintNeeded(): PaintNeeded[];
}
