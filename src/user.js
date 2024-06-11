export class User {
    constructor(name, budget, rooms) {
        this.name = name;
        this.budget = budget;
        this.rooms = rooms;
    }
    getAllPaintNeededLists() {
        let paintNeededList = [];
        let roomList = this.rooms;
        for (var room of roomList) {
            let temp = room.getPaintNeeded();
            for (let i = 0; i < temp.length; i++) {
                paintNeededList.push(temp[i]);
            }
        }
        return paintNeededList;
    }
    createColorSet(paintList) {
        let colorNeeded = new Set();
        for (let i = 0; i < paintList.length; i++) {
            colorNeeded.add(paintList[i].color);
        }
        return colorNeeded;
    }
    addPaintObjects(colorNeeded) {
        let finalPaintList = [];
        for (var color of colorNeeded) {
            let tempObj = { color: color, totalArea: 0 };
            finalPaintList.push(tempObj);
        }
        return finalPaintList;
    }
    addTotalAreaToList(originalPaintList, finalPaintList) {
        for (let i = 0; i < originalPaintList.length; i++) {
            for (let j = 0; j < finalPaintList.length; j++) {
                if (originalPaintList[i].color == finalPaintList[j].color) {
                    finalPaintList[j].totalArea += originalPaintList[i].totalArea;
                }
            }
        }
        return finalPaintList;
    }
    finalisePaintMeasurements() {
        let finalPaintList = [];
        let longPaintList = this.getAllPaintNeededLists();
        let colorNeeded = new Set();
        colorNeeded = this.createColorSet(longPaintList);
        finalPaintList = this.addTotalAreaToList(longPaintList, this.addPaintObjects(colorNeeded));
        return finalPaintList;
    }
    describe() {
        let userPaint = this.finalisePaintMeasurements();
        console.log(`${this.name} wants to paint ${this.rooms.length} rooms in their place.`);
        console.log(`${this.name} has a budget of £${this.budget}.`);
        console.log(`${this.name} wants to paint: `);
        for (var room of this.rooms) {
            console.log(`- ${room.name}`);
            console.log(`Colors: ${room.walls}`);
            for (var wall of room.getWalls()) {
                wall.describe();
            }
        }
    }
}
