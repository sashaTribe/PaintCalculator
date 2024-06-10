export class Room {
    constructor(name, walls) {
        this.name = name;
        this.walls = walls;
    }
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
    getUniqueColors(colorList) {
        let paintNeededList = [];
        for (let i = 0; i < colorList.length; i++) {
            let tempColor = colorList[i];
            let temp = { color: tempColor, totalArea: 0 };
            paintNeededList.push(temp);
        }
        return paintNeededList;
    }
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
    getPaintNeeded() {
        let colorList = this.getColorsNeeded();
        let paintNeededList = this.addAreaToColor(this.walls, this.getUniqueColors(colorList));
        return paintNeededList;
    }
}
