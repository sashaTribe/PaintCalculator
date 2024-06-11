import {PaintNeeded} from './wall'
import {Room} from './room'
export class User {
    /**
     * This stores all the information of the user
     *  - the name
     *  - the budget
     *  - the information on rooms and wall they will paint
     */
    name:string;
    budget: number;
    rooms: Room[];

    /**
     * Initialises object
     * @param name 
     * @param budget 
     * @param rooms 
     */
    constructor(name:string, budget: number, rooms: Room[]){
        this.name = name;
        this.budget = budget;
        this.rooms = rooms;
    }

    /**
     * This function stores info on how much paint is needed for what room
     * @returns paintNeededList
     */
    getAllPaintNeededLists():PaintNeeded[]{
        let paintNeededList: PaintNeeded[] = []
        let roomList:Room[] = this.rooms;
        for(var room of roomList) {
            let temp = room.getPaintNeeded();
            for(let i=0; i < temp.length; i++) {
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
    createColorSet(paintList:PaintNeeded[]): Set<string>{
        let colorNeeded = new Set<string>();
        for(let i=0; i<paintList.length;i++) {
            colorNeeded.add(paintList[i].color);
        }
        return colorNeeded;
    }

    /**
     * adds all the paint needed for the whole house 
     * @param colorNeeded 
     * @returns finalpaintList
     */
    addPaintObjects(colorNeeded:Set<string>):PaintNeeded[]{
        let finalPaintList:PaintNeeded[] = []
        for (var color of colorNeeded) {
            let tempObj: PaintNeeded = {color:color, totalArea:0};
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
    addTotalAreaToList(originalPaintList:PaintNeeded[], finalPaintList:PaintNeeded[]):PaintNeeded[]{
        for(let i=0; i<originalPaintList.length;i++) {
            for (let j=0; j<finalPaintList.length; j++){
                if(originalPaintList[i].color == finalPaintList[j].color){
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
    finalisePaintMeasurements(): PaintNeeded[] {
        let finalPaintList: PaintNeeded[] = [];
        let longPaintList = this.getAllPaintNeededLists();
        let colorNeeded = new Set<string>();
        colorNeeded = this.createColorSet(longPaintList);
        finalPaintList = this.addTotalAreaToList(longPaintList,this.addPaintObjects(colorNeeded));
        return finalPaintList;
    }

    /**
     * Gives a description on what was requested by the user
     * 
     */
    describe(){
        let userPaint:PaintNeeded[] = this.finalisePaintMeasurements();
        console.log(`${this.name} wants to paint ${this.rooms.length} rooms in their place.`)
        console.log(`${this.name} has a budget of £${this.budget}.`)
        console.log(`${this.name} wants to paint: `)
        for (var paint of userPaint){
            console.log(`We need ${paint.color} that covers surface area of ${paint.totalArea}`)
        }
    }

}