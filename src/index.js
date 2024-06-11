import inquirer from 'inquirer';
import { Wall } from './wall.js';
import { Room } from './room.js';
import { Paint } from './paint.js';
import { User } from './user.js';
/**
 * Method that validates a given input to check if it is a genuine string
 * @param input
 * @returns true if there is nothing wrong with input
 */
const confirmNameAnswerValidator = async (input) => {
    if (input == '' || typeof input != "string") {
        return "Please enter a valid name.";
    }
    return true;
};
/**
 * Method that validates a given input to check if it is a genuine positive integer
 * @param input
 * @returns true if there is nothing wrong with input
 */
const confirmIntegerNumberValidator = async (input) => {
    if (input < 0 || !Number.isInteger(input)) {
        return "Please enter a valid integer value.";
    }
    return true;
};
/**
 * Method that validates a given input to check if it is a genuine positive number
 * @param input
 * @returns true if there is nothing wrong with input
 */
const confirmNumberValidator = async (input) => {
    if (input < 0 || typeof input != "number") {
        return "Please enter a valid, positive value.";
    }
    return true;
};
/**
 * A prompt that will help create User object
 */
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
/**
 * A prompt that will give information about a room with how many walls to be painted
 */
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
                message: `What color would you like wall ${i + 1} to be? Use space bar to select/deselect`,
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
        let color = wallInfo.color;
        if (color === '' || color === null) {
            throw new Error("Color must be chosen");
        }
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
let fbPriceList = [[2.5, 78], [5, 128]];
let duluxPriceList = [[2.5, 25.32]];
let crownPriceList = [[1, 24.97], [5, 71.34]];
let littleGreenePriceList = [[1, 39], [2.5, 80]];
let graphenPriceList = [[1, 33], [10, 279]];
let paintNeeded = user.finalisePaintMeasurements();
let paintOptions = [];
for (var paint of paintNeeded) {
    let totalArea = paint.totalArea;
    let fb = new Paint("Farrow and Ball", totalArea, fbPriceList, [2.5, 5], 12);
    let dulux = new Paint("Dulux", totalArea, duluxPriceList, [2.5], 16);
    let crown = new Paint("Crown", totalArea, crownPriceList, [1, 5], 16);
    let littleGreene = new Paint("Little Greene", totalArea, littleGreenePriceList, [1, 2.5], 14);
    let graphen = new Paint("Graphenstone", totalArea, graphenPriceList, [1, 10], 18);
    paintOptions.push(fb, dulux, crown, littleGreene, graphen);
}
let chosenQuote = paintOptions[0].getQuote();
for (var paintInfo of paintOptions) {
    let tempQuote = paintInfo.getQuote();
    if (tempQuote.totalPrice > chosenQuote.totalPrice) {
        chosenQuote = tempQuote;
    }
}
console.log(`We recommend the brand ${chosenQuote.name}`);
console.log(`You need ${chosenQuote.oneLitre} 1L cans, ${chosenQuote.twoFiveLitre} 2.5L cans, ${chosenQuote.fiveLitre} 5L cans, and ${chosenQuote.tenLitre} 10L cans at a total cost of ${chosenQuote.totalPrice}`);
