import {Wall,PaintNeeded} from './wall.ts';

export class Room {
    name: string;
    walls: Wall[];
    

    constructor(name: string, walls: Wall[]){
        this.name = name;
        this.walls = walls;
    }

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

    getUniqueColors(colorList:string[]):PaintNeeded[] {
        let paintNeededList: PaintNeeded[] = []
        for (let i=0; i<colorList.length; i++) {
            let tempColor: string = colorList[i];
            let temp: PaintNeeded = {color:tempColor, totalArea:0};
            paintNeededList.push(temp)
        }
        return paintNeededList;
        
    }

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

    getPaintNeeded():PaintNeeded[] {
        let colorList  = this.getColorsNeeded();
        let paintNeededList:PaintNeeded[] = this.addAreaToColor(this.walls, this.getUniqueColors(colorList));
        return paintNeededList;
    }



}



