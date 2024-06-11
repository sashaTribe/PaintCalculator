import {Wall,PaintNeeded} from './wall';

export class Room {
    /**
     * Stores information on the walls that needs to be painted in the room
     */
    name: string;
    // a collection of walls to be painted
    walls: Wall[];
    

    /**
     * initialises object
     * @param name 
     * @param walls 
     */
    constructor(name: string, walls: Wall[]){
        this.name = name;
        this.walls = walls;
    }

    /**
     * Gets all colors needed for each wall to be painted
     * @returns colorList:string[]
     */
    getColorsNeeded():string[] {
        let colorList:string[] = []
        for (var wall of this.walls){
            let temp_color:string = wall.getColor()
            if(!colorList.includes(temp_color)){
                colorList.push(temp_color)
            }
        }
        return colorList
    }

    /**
     * Minimises colorList incase some walls will be painted with the same color
     * @param colorList 
     * @returns paintNeededList
     */
    getUniqueColors(colorList:string[]):PaintNeeded[] {
        let paintNeededList: PaintNeeded[] = []
        for (let i=0; i<colorList.length; i++) {
            let tempColor: string = colorList[i];
            let temp: PaintNeeded = {color:tempColor, totalArea:0};
            paintNeededList.push(temp)
        }
        return paintNeededList;
        
    }

    /**
     * Assigns the area to each color
     * @param wallList 
     * @param paintNeededList 
     * @returns paintNeededList, an array of paintNeeded objects
     */
    addAreaToColor(wallList:Wall[], paintNeededList:PaintNeeded[]):PaintNeeded[] {
        for (var wall of wallList){
            let tempColor:string = wall.getColor()
            let tempArea:number = wall.getFinalisedArea()
            for(let i=0; i<paintNeededList.length; i++){
                if (paintNeededList[i].color == tempColor){
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
    getPaintNeeded():PaintNeeded[] {
        let colorList  = this.getColorsNeeded();
        let paintNeededList:PaintNeeded[] = this.addAreaToColor(this.walls, this.getUniqueColors(colorList));
        return paintNeededList;
    }
    
    /**
     * returns list of walls of type Wall
     * @returns wall list
     */
    getWalls():Wall[]{
        return this.walls;
    }



}



