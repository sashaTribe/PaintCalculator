export class User {
    /**
     * Initialises object
     * @param name
     * @param budget
     * @param rooms
     */
    constructor(name, budget, rooms) {
        this.name = name;
        this.budget = budget;
        this.rooms = rooms;
    }
    /**
     * This function stores info on how much paint is needed for what room
     * @returns paintNeededList
     */
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
    /**
     * This function stores in all teh colors needed for the paint job
     * @param paintList
     * @returns a set of colors
     */
    createColorSet(paintList) {
        let colorNeeded = new Set();
        for (let i = 0; i < paintList.length; i++) {
            colorNeeded.add(paintList[i].color);
        }
        return colorNeeded;
    }
    /**
     * adds all the paint needed for the whole house
     * @param colorNeeded
     * @returns finalpaintList
     */
    addPaintObjects(colorNeeded) {
        let finalPaintList = [];
        for (var color of colorNeeded) {
            let tempObj = { color: color, totalArea: 0 };
            finalPaintList.push(tempObj);
        }
        return finalPaintList;
    }
    /**
     * Adds the area to each assigned color
     * @param originalPaintList
     * @param finalPaintList
     * @returns changed finalPaintList
     */
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
    /**
     * Gets a list of all the colors needed followed by how much paint for the paint job
     * @returns finalPaintList: Interface PaintNeeded []
     */
    finalisePaintMeasurements() {
        let finalPaintList = [];
        let longPaintList = this.getAllPaintNeededLists();
        let colorNeeded = new Set();
        colorNeeded = this.createColorSet(longPaintList);
        finalPaintList = this.addTotalAreaToList(longPaintList, this.addPaintObjects(colorNeeded));
        return finalPaintList;
    }
    /**
     * Gives a description on what was requested by the user
     *
     */
    describe() {
        let userPaint = this.finalisePaintMeasurements();
        console.log(`${this.name} wants to paint ${this.rooms.length} rooms in their place.`);
        console.log(`${this.name} has a budget of £${this.budget}.`);
        console.log(`${this.name} wants to paint: `);
        for (var paint of userPaint) {
            console.log(`We need ${paint.color} that covers surface area of ${paint.totalArea}`);
        }
    }
}
