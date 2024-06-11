import inquirer from 'inquirer';
import { Wall } from './wall.js';
import { Room } from './room.js';
import { Paint } from './paint.js';
import { User } from './user.js';
const confirmNameAnswerValidator = async (input) => {
    if (input == '' || typeof input != "string") {
        return "Please enter a valid name.";
    }
    return true;
};
const confirmIntegerNumberValidator = async (input) => {
    if (input < 0 || !Number.isInteger(input)) {
        return "Please enter a valid integer value.";
    }
    return true;
};
const confirmNumberValidator = async (input) => {
    if (input < 0 || typeof input != "number") {
        return "Please enter a valid, positive value.";
    }
    return true;
};
const quoteInfo = await inquirer.prompt([
    {
        type: 'string',
        name: "userName",
        message: "What is your name?",
        validate: confirmNameAnswerValidator
    },
    {
        type: 'number',
        name: 'numOfRooms',
        message: 'How many rooms will you be painting?',
        validate: confirmIntegerNumberValidator
    },
    {
        type: 'number',
        name: 'budget',
        message: 'What is your budget?',
        validate: confirmNumberValidator
    }
]);
let userName = quoteInfo.userName;
let numOfRooms = quoteInfo.numOfRooms;
let userBudget = quoteInfo.budget;
let rooms = [];
for (let j = 0; j < numOfRooms; j++) {
    const roomInfo = await inquirer.prompt([
        {
            type: 'string',
            name: 'roomName',
            message: 'What is the name of this room?',
            validate: confirmNameAnswerValidator
        },
        {
            type: 'number',
            name: 'numOfWalls',
            message: 'How many walls are in this room?',
            validate: confirmIntegerNumberValidator
        },
    ]);
    let roomName = roomInfo.roomName;
    let numOfWalls = roomInfo.numOfWalls;
    let walls = [];
    for (let i = 0; i < numOfWalls; i++) {
        let measurements = [];
        const wallInfo = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'color',
                message: `What color would you like wall ${i + 1} to be?`,
                choices: ['red', 'yellow', 'orange', 'pink', 'blue', 'white', 'black', 'purple', 'green', 'brown']
            },
            {
                type: 'number',
                name: 'length',
                message: 'Type in the length of your wall: ',
                validate: confirmNumberValidator
            },
            {
                type: 'number',
                name: 'width',
                message: 'Type in the width of your wall: ',
                validate: confirmNumberValidator
            },
            {
                type: 'number',
                name: 'numOfObjects',
                message: 'How many removable objects do you have (E.g.Doors, windows, tiles etc.)? ',
                validate: confirmIntegerNumberValidator
            }
        ]);
        let height = wallInfo.length;
        let width = wallInfo.width;
        console.log(wallInfo.color);
        let color = wallInfo.color;
        let numOfObjects = wallInfo.numOfObjects;
        let counter = numOfObjects;
        while (counter > 0) {
            const extraMeasurementInfo = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'height',
                    message: 'Height of object: ',
                    validate: confirmNumberValidator
                },
                {
                    type: 'number',
                    name: 'width',
                    message: 'Width of object: ',
                    validate: confirmNumberValidator
                }
            ]);
            let measurementPair = [extraMeasurementInfo.height, extraMeasurementInfo.width];
            measurements.push(measurementPair);
            counter -= 1;
        }
        let wall = new Wall(width, height, color, measurements);
        walls.push(wall);
    }
    let room = new Room(roomName, walls);
    rooms.push(room);
}
let user = new User(userName, userBudget, rooms);
user.describe();
let fbPriceList = {
    '2.5L': 78,
    '5L': 128
};
let duluxPriceList = {
    '2.5L': 25.32
};
let crownPriceList = {
    '1L': 24.97,
    '5L': 71.34
};
let littleGreenePriceList = {
    '1L': 39,
    '2.5L': 80
};
let graphenPriceList = {
    1: 33,
    10: 279
};
let fb = new Paint("Farrow and Ball", fbPriceList, 12);
let dulux = new Paint("Dulux", duluxPriceList, 16);
let crown = new Paint("Crown", crownPriceList, 16);
let littleGreene = new Paint("Little Greene", littleGreenePriceList, 14);
let graphen = new Paint("Graphenstone", graphenPriceList, 18);
