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
    
}