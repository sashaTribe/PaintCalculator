import {PaintNeeded} from './wall.ts'
import {Room} from './room.ts'
export class User {
    name:string;
    budget: number;
    rooms: Room[];

    constructor(name:string, budget: number, rooms: Room[]){
        this.name = name;
        this.budget = budget;
        this.rooms = rooms;
    }

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

    createColorSet(paintList:PaintNeeded[]): Set<string>{
        let colorNeeded = new Set<string>();
        for(let i=0; i<paintList.length;i++) {
            colorNeeded.add(paintList[i].color);
        }
        return colorNeeded;
    }

    addPaintObjects(colorNeeded:Set<string>):PaintNeeded[]{
        let finalPaintList:PaintNeeded[] = []
        for (var color of colorNeeded) {
            let tempObj: PaintNeeded = {color:color, totalArea:0};
            finalPaintList.push(tempObj);
        }
        return finalPaintList;
    }

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

    
    finalisePaintMeasurements(): PaintNeeded[] {
        let finalPaintList: PaintNeeded[] = [];
        let longPaintList = this.getAllPaintNeededLists();
        let colorNeeded = new Set<string>();
        colorNeeded = this.createColorSet(longPaintList);
        finalPaintList = this.addTotalAreaToList(longPaintList,this.addPaintObjects(colorNeeded));
        return finalPaintList;
    }

    describe(){
        let userPaint:PaintNeeded[] = this.finalisePaintMeasurements();
        console.log(`${this.name} wants to paint ${this.rooms.length} rooms in their place.`)
        console.log(`${this.name} has a budget of ${this.budget}.`)
        console.log(`${this.name} wants to paint: `)
        for (var room of this.rooms){
            console.log(`${room.name} `)
        }
    }

}