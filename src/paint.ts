
export interface Quote {
    name: string,
    oneLitre?: number;
    twoFiveLitre?: number;
    fiveLitre ?: number;
    tenLitre?: number;
    totalPrice: number;
}

export class Paint{
    /**
     * This class creates a paint object where it has the brand name, coverage/litre, and what amount of litre the can comes in
     * This is used to calculate how much of the tins are needed for what price
     */
    brandName: string;
    litrePriceList: {[key:string]:number};
    litreList:number[];
    //priceList:number[];
    coveragePerLitre:number;

    /**
     * Initialises object
     * @param brandName 
     * @param litrePriceList 
     * @param litreList 
     * @param coveragePerLitre 
     */
    constructor(brandName:string, litrePriceList:{[key:string]:number}, litreList:number[],coveragePerLitre:number){
        this.brandName = brandName;
        this.litrePriceList = litrePriceList;
        this.litreList = litreList;
        //this.priceList = priceList;
        this.coveragePerLitre = coveragePerLitre;
    }

    /**
     * Calculates the amount of paint needed 
     * @param totalArea 
     * @returns amount of litres needed, type number
     */
    calcPaintAmount(totalArea:number): number{
        return (totalArea/this.coveragePerLitre) * 2;
    }
    
    /**
     * calculates how many n-litre tins for the paint job
     * @param totalLitreNeeded 
     * @param givenLitreValue 
     * @returns total
     */
    numberOfPaintTinsNeeded(totalLitreNeeded:number, givenLitreValue:number):number{
        let total:number = 0;
        while (totalLitreNeeded > 0){
            totalLitreNeeded -= givenLitreValue;
            total+=1
        }
        return total
    }

    /**
     * 
     * @param totalLitreNeeded 
     */
    getBestPrice(totalLitreNeeded:number):Quote{
        let litreList:number[] = this.litreList;
        let paintPrices:number[][] = []
        for (let i=0; i < litreList.length; i++){
            let tempNumOfTins:number = this.numberOfPaintTinsNeeded(totalLitreNeeded, litreList[i]);
            let tempArr:number[] = [litreList[i], tempNumOfTins]
            paintPrices.push(tempArr) 
        }
        if (totalLitreNeeded % litreList[1] != 0){

        }

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
    
    /**
     * Calculates how much paint is needed
     * @param numOfPaintNeeded 
     * @param price 
     * @returns finalised Price
     */
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