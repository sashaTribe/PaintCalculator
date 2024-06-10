import inquirer from 'inquirer';
import {Wall} from './wall.ts';
import {Room} from './room.ts';
import {Paint} from './paint.ts';
import {User} from './user.ts';

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

let userName:string = quoteInfo.userName;
let numOfRooms:number = quoteInfo.numOfRooms;
let userBudget:number = quoteInfo.budget;

let rooms:Room[] = [];

for(let j=0; j<numOfRooms;j++){
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
        rooms.push(room);
}

let user:User = new User(userName, userBudget, rooms)




let fbPriceList: {[key:string]:number} = {
    '2.5L':78,
    '5L':128
}

let duluxPriceList: {[key:string]:number} = {
    '2.5L':25.32
}

let crownPriceList: {[key:string]:number} = {
    '1L':24.97,
    '5L':71.34
}

let littleGreenePriceList: {[key:string]:number} = {
    '1L':39,
    '2.5L':80
}

let graphenPriceList: {[key:number]:number} = {
    1:33,
    10:279
}
                   

let fb = new Paint("Farrow and Ball", fbPriceList, 12);
let dulux = new Paint("Dulux", duluxPriceList, 16);
let crown = new Paint("Crown", crownPriceList, 16);
let littleGreene = new Paint("Little Greene", littleGreenePriceList, 14)
let graphen = new Paint("Graphenstone", graphenPriceList, 18);