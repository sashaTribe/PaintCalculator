export declare class Paint {
    brandName: string;
    litrePriceList: {
        [key: string]: number;
    };
    coveragePerLitre: number;
    constructor(brandName: string, litrePriceList: {
        [key: string]: number;
    }, coveragePerLitre: number);
    calcPaintAmount(totalArea: number): number;
    numberOfPaintTinsNeeded(totalLitreNeeded: number, givenLitreValue: number): number;
    multiplePaintTinsNeeded(totalLitreNeeded: number, litreList: number[]): number[];
    costOfPaint(numOfPaintNeeded: number, price: number): number;
    private sumArray;
}
