import inquirer from 'inquirer';

/**
 * TO-DO:
 *  - break down getPaintNeeded method
 *  - make a getPaintNeeded method for User class (same thing but for all rooms not just all walls)
 *  - Create paint data 
 */

/**
 * This section is the Wall layer
 */
export class Wall {
    width: number;
    height: number; 
    color: string;
    measurements : number[][];

    constructor(width: number, height:number, color:string, measurements:number[][]){
        this.width = width;
        this.height = height;
        this.color = color;
        this.measurements = measurements;
    }

    private calcArea(width:number, height:number){
        return width * height;
    }

    getColor(): string{
        return this.color;
    }

    describe(){
        let finalArea = this.getFinalisedArea()
        console.log(`This wall has length ${this.width} and height ${this.height}, with color ${this.color}`)
        console.log(`The amount of focused area is ${finalArea}`)
    }

    getFinalisedArea(): number{
        let totalArea = this.calcArea(this.width, this.height);
        let objectsArea = this.getTotalObjectsArea(this.measurements);
        return totalArea - objectsArea;
    }

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

