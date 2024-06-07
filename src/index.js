import inquirer from 'inquirer';
/*
const answer = await inquirer.prompt([
    {
        type: 'input',
        name:'name',
        message: 'What is your name?'
    },
    {
        type: 'number',
        name: 'numOfRooms',
        message: 'How many rooms are we painting?'

    }
]);

let name:string = answer.name;
let numOfRooms = answer.numOfRooms;

console.log("Your name is " + answer.name + " and you have " + answer.numOfRooms + ".");
*/
const answer2 = await inquirer.prompt([
    {
        type: 'number',
        name: 'length',
        message: 'Type in the length of your wall: '
    },
    {
        type: 'number',
        name: 'width',
        message: 'Type in the width of your wall: '
    }
]);
/*Finding the area of given wall */
let width = answer2.width;
let length = answer2.length;
//let totalArea:number = 0
let area;
let findArea = (x, y) => x * y;
area = findArea(length, width);
console.log(`The area of your wall is ${area}`);
