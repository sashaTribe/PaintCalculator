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





const quoteInfo = await inquirer.prompt([
    {
        type: 'string',
        name: "userName",
        message: "What is your name?"
    },
    {
        type: 'number',
        name: 'numOfRooms',
        message: 'How many rooms will you be painting?'
    },
    {
        type:'number',
        name:'budget',
        message: 'What is your budget?'
    }
])

const roomInfo = await inquirer.prompt([
    {
        type: 'string',
        name: 'roomName',
        message: 'What is the name of this room?'
    },

    {
        type: 'number',
        name: 'numOfWalls',
        message: 'How many walls are in this room?'
    },

])

let roomName: string = roomInfo.roomName;
let numOfWalls : number = roomInfo.numOfWalls;
let walls : Wall[] = [];
for (let i=0; i < numOfWalls; i++) {
    
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
        walls.push(wall);

    }

let room:Room = new Room(roomName, walls);



let fb = new Paint("Farrow and Ball", [2.5,5], [78,128], 12);
let dulux = new Paint("Dulux", [2.5], [25.32], 16);
let crown = new Paint("Crown", [1,5],[24.97,71.34], 16);
let littleGreene = new Paint("Little Greene", [1,2.5], [39, 80], 14)
let graphen = new Paint("Graphenstone", [1, 10], [33,279], 18);