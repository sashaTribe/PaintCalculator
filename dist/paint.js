export class Paint {
    constructor(brandName, litrePriceList, coveragePerLitre) {
        this.brandName = brandName;
        this.litrePriceList = litrePriceList;
        //this.litreList = litreList;
        //this.priceList = priceList;
        this.coveragePerLitre = coveragePerLitre;
    }
    calcPaintAmount(totalArea) {
        return (totalArea / this.coveragePerLitre) * 2;
    }
    numberOfPaintTinsNeeded(totalLitreNeeded, givenLitreValue) {
        let total = 0;
        while (totalLitreNeeded > 0) {
            totalLitreNeeded -= givenLitreValue;
            total += 1;
        }
        return total;
    }
    multiplePaintTinsNeeded(totalLitreNeeded, litreList) {
        // sorts in descending order
        let sortedList = litreList.sort((a, b) => b - a);
        let biggestNum = sortedList[0];
        let total1 = 0;
        let total2 = 0;
        total1 = this.numberOfPaintTinsNeeded(totalLitreNeeded,biggestNum)
        let temp = totalLitreNeeded - (total1 * biggestNum);
        total2 = this.numberOfPaintTinsNeeded(temp, sortedList[1])
        return [total2,total1];
    }
               
    costOfPaint(numOfPaintNeeded, price) {
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
    sumArray(arrNumbers) {
        let total = 0;
        for (let i = 0; i < arrNumbers.length; i++) {
            total += arrNumbers[i];
        }
        return total;
    }
}
