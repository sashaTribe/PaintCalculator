export class Room {
    /**
     * initialises object
     * @param name
     * @param walls
     */
    constructor(name, walls) {
        this.name = name;
        this.walls = walls;
    }
    /**
     * Gets all colors needed for each wall to be painted
     * @returns colorList:string[]
     */
    getColorsNeeded() {
        let colorList = [];
        for (var wall of this.walls) {
            let temp_color = wall.getColor();
            if (!colorList.includes(temp_color)) {
                colorList.push(temp_color);
            }
        }
        return colorList;
    }
    /**
     * Minimises colorList incase some walls will be painted with the same color
     * @param colorList
     * @returns paintNeededList
     */
    getUniqueColors(colorList) {
        let paintNeededList = [];
        for (let i = 0; i < colorList.length; i++) {
            let tempColor = colorList[i];
            let temp = { color: tempColor, totalArea: 0 };
            paintNeededList.push(temp);
        }
        return paintNeededList;
    }
    /**
     * Assigns the area to each color
     * @param wallList
     * @param paintNeededList
     * @returns paintNeededList, an array of paintNeeded objects
     */
    addAreaToColor(wallList, paintNeededList) {
        for (var wall of wallList) {
            let tempColor = wall.getColor();
            let tempArea = wall.getFinalisedArea();
            for (let i = 0; i < paintNeededList.length; i++) {
                if (paintNeededList[i].color == tempColor) {
                    paintNeededList[i].totalArea += tempArea;
                }
            }
        }
        return paintNeededList;
    }
    /**
     * Method that finalises the paintNeeded list
     * @returns PaintNeededList
     */
    getPaintNeeded() {
        let colorList = this.getColorsNeeded();
        let paintNeededList = this.addAreaToColor(this.walls, this.getUniqueColors(colorList));
        return paintNeededList;
    }
    /**
     * returns list of walls of type Wall
     * @returns wall list
     */
    getWalls() {
        return this.walls;
    }
}
