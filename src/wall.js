export class Wall {
    /**
     * initialises the object
     * @param width
     * @param height
     * @param color
     * @param measurements
     */
    constructor(width, height, color, measurements) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.measurements = measurements;
    }
    calcArea(width, height) {
        return width * height;
    }
    /**
     *
     * @returns color: string
     */
    getColor() {
        return this.color;
    }
    /**
     * Describes the contents of the wall object
     */
    describe() {
        let finalArea = this.getFinalisedArea();
        console.log(`This wall has length ${this.width} and height ${this.height}, with color ${this.color}`);
        console.log(`The amount of focused area is ${finalArea}`);
    }
    /**
     * This function gets all the areas of objects then subtracts that from the area on the wall
     * @returns finalisedArea:number
     */
    getFinalisedArea() {
        let totalArea = this.calcArea(this.width, this.height);
        let objectsArea = this.getTotalObjectsArea(this.measurements);
        return this.convertCm2toM2(totalArea - objectsArea);
    }
    convertCm2toM2(areaIncm2) {
        return areaIncm2 / 10000;
    }
    /**
     * This function gets the total area of the given objects
     * Each item in array is another array holding the measurements
     * @param measurements : number[][]
     * @returns totalArea: number
     */
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
