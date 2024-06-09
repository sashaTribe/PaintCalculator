import inquirer from 'inquirer';
class Wall {
    width;
    height;
    color;
    measurements;
    constructor(width, height, color, measurements) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.measurements = measurements;
    }
    calcArea(width, height) {
        return width * height;
    }
    getColor() {
        return this.color;
    }
    describe() {
        console.log(`This wall has length ${this.width} and height ${this.height}, with color ${this.color} and has these measurements ${this.measurements}`);
    }
}
let measurements = [[]];
const wallInfo = await inquirer.prompt([
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
        message: 'Do you have any removable objects on the wall? E.g.Doors, windows, tiles etc.'
    }
]);
let height = wallInfo.length;
let width = wallInfo.width;
let color = wallInfo.color;
let numOfObjects = wallInfo.numOfObjects;
let counter = numOfObjects;
while (counter > 0) {
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
    ]);
    let measurementPair = [extraMeasurementInfo.height, extraMeasurementInfo.width];
    measurements.push(measurementPair);
    counter -= 1;
}
let wall = new Wall(width, height, color, measurements);
wall.describe();
/*

class Room {
    name: string;
    walls: [Wall];
    

    constructor(name: string, walls: [Wall]){
        this.name = name;
        this.walls = walls;
    }


}

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
