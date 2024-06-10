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

interface PaintNeeded {
    color: string;
    totalArea: number;
}

class Room {
    name: string;
    walls: Wall[];
    

    constructor(name: string, walls: Wall[]){
        this.name = name;
        this.walls = walls;
    }

    getColorsNeeded():string[] {
        let colorList:string[] = []
        for (var wall of walls){
            let temp_color:string = wall.getColor()
            if(!colorList.includes(temp_color)){
                colorList.push(temp_color)
            }
        }
        return colorList
    }

    getPaintNeeded():PaintNeeded[] {
        let paintNeededList: PaintNeeded[] = []
        let colorList:string[] = this.getColorsNeeded();
        for (let i=0; i<colorList.length; i++) {
            let tempColor: string = colorList[i];
            let temp: PaintNeeded = {color:tempColor, totalArea:0};
            paintNeededList.push(temp)
        }
        for (var wall of this.walls){
            let tempColor:string = wall.getColor()
            let tempArea:number = wall.getFinalisedArea()
            for(let i=0; i<paintNeededList.length; i++){
                if (paintNeededList[i].color == tempColor){
                    paintNeededList[i].totalArea += tempArea;
                }
            }
        }
        return paintNeededList;
    }



}

class User {
    name:string;
    budget: number;
    rooms: Room[];

    constructor(name:string, budget: number, rooms: Room[]){
        this.name = name;
        this.budget = budget;
        this.rooms = rooms;
    }


}

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

