import { Interface } from "readline";

class Wall {
    width: number;
    height: number;
    color: string;
    measurements ?: [number];

    constructor(width: number, height:number, color:string, measurements?:[number]){
        this.width = width;
        this.height = height;
        this.color = color;
        this.measurements = measurements;
    }

    calcArea(width:number, height:number){
        return width * height;
    }

    getColor(){
        return this.color;
    }

}

class Room {
    name: string;
    walls: [Wall];
    

    constructor(name: string, walls: [Wall]){
        this.name = name;
        this.walls = walls;
    }


}