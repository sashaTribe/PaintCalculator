import inquirer from 'inquirer';


class Wall {
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
        let finalArea = this.getFinalisedArea(this.width, this.height, this.measurements)
        console.log(`This wall has length ${this.width} and height ${this.height}, with color ${this.color}`)
        console.log(`The amount of focused area is ${finalArea}`)
    }

    getFinalisedArea(width:number, height: number, measurements: number[][]): number{
        let totalArea = this.calcArea(width, height);
        let objectsArea = this.getTotalObjectsArea(measurements);
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


let measurements : number[][] = [];

const wallInfo = await inquirer.prompt([
    {
        type: 'string',
        name: 'color',
        message: 'What color would you like this wall to be?'
    },
    {
        type: 'number',
        name: 'length',
        message: 'Type in the length of your wall: '
    },
    {
        type: 'number',
        name: 'width',
        message: 'Type in the width of your wall: ' 
    },
    {
        type: 'number',
        name: 'numOfObjects',
        message: 'Do you have any removable objects on the wall (E.g.Doors, windows, tiles etc.?If so how many? '
    }
])

let height:number = wallInfo.length;
let width:number = wallInfo.width;
let color:string = wallInfo.color;

let numOfObjects:number = wallInfo.numOfObjects;
let counter: number = numOfObjects;
while (counter > 0){
 
    const extraMeasurementInfo = await inquirer.prompt([
        {
            type: 'number',
            name: 'height',
            message: 'Height of object: '
        },
        {
            type: 'number',
            name: 'width',
            message: 'Width of object: '
        }
    ])
    
    let measurementPair : number[] = [extraMeasurementInfo.height, extraMeasurementInfo.width];
    measurements.push(measurementPair);
    counter -= 1;
}

let wall: Wall = new Wall(width, height, color, measurements)
wall.describe();





class Room {
    name: string;
    walls: [Wall];
    

    constructor(name: string, walls: [Wall]){
        this.name = name;
        this.walls = walls;
    }

    addWall(wall: Wall):void{
        this.walls.push(wall);
    }


}


interface PaintNeeded {
    color: string,
    totalArea : number
}





/**
 * TO-DO:
 * - Make a function that adds a value onto a given color variable
 * - create an outer function that makes a list of all colors involved in the wall objects
 */


/*
class Invoice {
    name: string;
    budget: number;
    rooms: [Room];

    constructor(name:string, budget:number, rooms:[Room]){
        this.name = name;
        this.budget = budget;
        this.rooms = rooms;
    }

    getColor(rooms:[Room]): string[] {
        let colors:string[0];
        for (let i=0;i<9;i){
            let room = rooms[i];
            for (let j=0)
        }
    }

    createArrayData(){
        interface colorArea {
            color: string,
            totalArea: number
        }

    }
    


}
*/