/**
 * TO-DO:
 *  - break down getPaintNeeded method
 *  - make a getPaintNeeded method for User class (same thing but for all rooms not just all walls)
 *  - Create paint data
 */
/**
 * This section is the Wall layer
 */
export declare class Wall {
    width: number;
    height: number;
    color: string;
    measurements: number[][];
    constructor(width: number, height: number, color: string, measurements: number[][]);
    private calcArea;
    getColor(): string;
    describe(): void;
    getFinalisedArea(): number;
    private getTotalObjectsArea;
}
export interface PaintNeeded {
    color: string;
    totalArea: number;
}
