import { PaintNeeded } from './wall.ts';
import { Room } from './room.ts';
export declare class User {
    name: string;
    budget: number;
    rooms: Room[];
    constructor(name: string, budget: number, rooms: Room[]);
    getAllPaintNeededLists(): PaintNeeded[];
    createColorSet(paintList: PaintNeeded[]): Set<string>;
    addPaintObjects(colorNeeded: Set<string>): PaintNeeded[];
    addTotalAreaToList(originalPaintList: PaintNeeded[], finalPaintList: PaintNeeded[]): PaintNeeded[];
    finalisePaintMeasurements(): PaintNeeded[];
    describe(): void;
}
