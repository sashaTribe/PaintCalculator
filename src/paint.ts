class Paint{
    brandName: string;
    litreList:number[];
    priceList:number[];
    coveragePerLitre:number;

    constructor(brandName:string, litreList:number[], priceList:number[], coveragePerLitre:number){
        this.brandName = brandName;
        this.litreList = litreList;
        this.priceList = priceList;
        this.coveragePerLitre = coveragePerLitre;
    }

    calcPaintAmount(totalArea:number): number{
        return (totalArea/this.coveragePerLitre) * 2;
    }
    
    numberOfPaintTinsNeeded(totalLitreNeeded:number, givenLitreValue:number):number{
        let total:number = 0;
        while (totalLitreNeeded > 0){
            totalLitreNeeded -= givenLitreValue;
            total+=1
        }
        return total
    }

    multiplePaintTinsNeeded(totalLitreNeeded:number, litreList:number[]): number[]{
        let sortedList:number[] = litreList.sort((a,b) => b-a);
        let biggestNum: number = sortedList[0];
        let total1:number = 0;
        let total2:number = 0;
        while (totalLitreNeeded > 0){
            while (totalLitreNeeded > biggestNum){
                totalLitreNeeded -= biggestNum;
                total1 += 1;
            }
            totalLitreNeeded -= sortedList[1];
            total2 += 1
        }
        return [total1, total2]

    }
    costOfPaint(numOfPaintNeeded:number, price:number):number{
        return numOfPaintNeeded * price;
    }
    
    /*

    getMinimalCost(totalArea:number): number{
        let numOflitresNeeded = this.calcPaintAmount(totalArea);
        let maxLitre:number = Math.max(...this.litreList);
        let numLargePaintTinNeeded = this.numberOfPaintTinsNeeded(numOflitresNeeded, maxLitre);
        let largePaintTinPrice = Math.max(...this.priceList)
        let costLargePaintBundle = this.costOfPaint(numLargePaintTinNeeded,largePaintTinPrice);
    

    }
        */

    private sumArray(arrNumbers:number[]):number{
        let total:number = 0;
        for (let i=0; i < arrNumbers.length; i++){
            total += arrNumbers[i]
        }
        return total
    }
    
    
}