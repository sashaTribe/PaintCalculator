
export class Wall {
    /**
     * This class holds the data of a wall
     *  - The overall height and width
     *  - The color that it is to be painted
     *  - Measurements of other objects
     * 
     */
    width: number;
    height: number; 
    color: string;
    measurements : number[][];

    /**
     * initialises the object
     * @param width 
     * @param height 
     * @param color 
     * @param measurements 
     */
    constructor(width: number, height:number, color:string, measurements:number[][]){
        this.width = width;
        this.height = height;
        this.color = color;
        this.measurements = measurements;
    }

    private calcArea(width:number, height:number){
        return width * height;
    }

    /**
     * 
     * @returns color: string
     */
    getColor(): string{
        return this.color;
    }

    /**
     * Describes the contents of the wall object
     */
    describe(){
        let finalArea = this.getFinalisedArea()
        console.log(`This wall has length ${this.width} and height ${this.height}, with color ${this.color}`)
        console.log(`The amount of focused area is ${finalArea}`)
    }

    /**
     * This function gets all the areas of objects then subtracts that from the area on the wall
     * @returns finalisedArea:number
     */
    getFinalisedArea(): number{
        let totalArea = this.calcArea(this.width, this.height);
        let objectsArea = this.getTotalObjectsArea(this.measurements);
        return totalArea - objectsArea;
    }

    /**
     * This function gets the total area of the given objects
     * Each item in array is another array holding the measurements
     * @param measurements : number[][]
     * @returns totalArea: number
     */
    private getTotalObjectsArea(measurements:number[][]): number {
        let totalArea: number = 0;
        console.log(measurements)
        if (measurements.length > 0) {
            for (const pair of measurements) {
                let temp = this.calcArea(pair[0], pair[1]);
                totalArea += temp;
        }
        
        }
        return totalArea;
    }

}

export interface PaintNeeded {
    color: string;
    totalArea: number;

}

