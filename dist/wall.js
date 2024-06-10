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
        let finalArea = this.getFinalisedArea();
        console.log(`This wall has length ${this.width} and height ${this.height}, with color ${this.color}`);
        console.log(`The amount of focused area is ${finalArea}`);
    }
    getFinalisedArea() {
        let totalArea = this.calcArea(this.width, this.height);
        let objectsArea = this.getTotalObjectsArea(this.measurements);
        return totalArea - objectsArea;
    }
    getTotalObjectsArea(measurements) {
        let totalArea = 0;
        console.log(measurements);
        if (measurements.length > 0) {
            for (const pair of measurements) {
                let temp = this.calcArea(pair[0], pair[1]);
                totalArea += temp;
            }
        }
        return totalArea;
    }
}
