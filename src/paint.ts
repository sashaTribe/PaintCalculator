
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
    totalAreaVal: number;
    litrePriceList: number[][];
    litreList:number[];
    //priceList:number[];
    coveragePerLitre:number;
    quote:Quote;

    /**
     * Initialises object
     * @param brandName 
     * @param litrePriceList 
     * @param litreList 
     * @param coveragePerLitre 
     */
    constructor(brandName:string, totalAreaVal:number, litrePriceList:number[][], litreList:number[],coveragePerLitre:number, quote:Quote= {name:'', totalPrice:0}){
        this.brandName = brandName;
        this.totalAreaVal = totalAreaVal;
        this.litrePriceList = litrePriceList;
        this.litreList = litreList;
        //this.priceList = priceList;
        this.coveragePerLitre = coveragePerLitre;
        this.quote = quote;
    }

    getPriceList():number[]{
        let priceList:number[] = []
        for (let i=0; i<this.litrePriceList.length; i++){
            priceList.push(this.litrePriceList[i][1])
        }
        return priceList
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

    storeDifferentLitreTinsAmount(totalLitreNeeded:number):number[][]{
        let litrePriceList:number[][] = this.litrePriceList;
        let dataList:number[][] = []
        for (var arr of litrePriceList){
            let temp1:number = this.numberOfPaintTinsNeeded(totalLitreNeeded, arr[0])
            //stores the amount of litres along with how many tins needed
            let tempArr:number [] = [arr[0], temp1]
            dataList.push(tempArr)
        }
        console.log("data storage successful")
        return dataList
    }
    /*
    storeDifferentLitreTinsAmount(totalLitreNeeded:number):number[][]{
        let litrePriceList:number[][] = this.litrePriceList;
        let dataList:number[][] = []
        for (var arr of litrePriceList){
            let temp1:number = this.numberOfPaintTinsNeeded(totalLitreNeeded, arr[0])
            //stores the amount of litres along with how many tins needed
            let tempArr:number [] = [arr[0], temp1]
            dataList.push(tempArr)
        }
        if (totalLitreNeeded % this.litreList[-1] != 0){
            let tempArr:number[] = this.multiplePaintTinsNeeded(totalLitreNeeded, this.litreList);
            let tempArr2:number[] = []
            for (let i=0; i<tempArr.length;i++){
                tempArr2.push(this.litreList[i])
                tempArr2.push(tempArr[i])
            }
            dataList.push(tempArr2);
        }
        return dataList;
    }
*/
    /**
     * 
     * @param totalLitreNeeded 
     */
    


    checkLitre(a:number, price:number, numOfTinsNeeded:number, quote:Quote): Quote {
        switch(a){
            case 1:
                quote.oneLitre = numOfTinsNeeded;
                break;
            case 2.5:
                quote.twoFiveLitre = numOfTinsNeeded;
                break;
            case 5:
                quote.fiveLitre = numOfTinsNeeded;
            case 10:
                quote.tenLitre = numOfTinsNeeded;
                break;
            default:
                console.log("No such measurement!");
                break;
        }
        quote.totalPrice += this.costOfPaint(price,numOfTinsNeeded);
        return quote;
    }

    /**
     * builds a quote for each paint tin then returns quote with cheapest paint
     * @param name 
     * @param priceList 
     * @param tinsNeededList 
     * @returns 
     */
    createQuoteObject(name:string, priceList:number[], tinsNeededList:number[][]) : Quote{
        let quoteList:Quote[] = [];
        for (let i =0; i< tinsNeededList.length; i++){
            let quote = {} as Quote;
            quote.name = name;
            quote.totalPrice =0;
            console.log(`Price of paint job: ${quote.totalPrice}`)
            quote = this.checkLitre(tinsNeededList[i][0], priceList[i], tinsNeededList[i][1], quote)
            console.log(`Price of paint job: ${quote.totalPrice}`)
            quoteList.push(quote) 

        }
        let cheapestQuote:Quote = quoteList[0];
        for (var quote of quoteList){
            let tempQuote:Quote = quote;
            if (cheapestQuote.totalPrice > tempQuote.totalPrice){
                cheapestQuote = tempQuote;
            }
        }
        this.setQuote(cheapestQuote)
        return cheapestQuote
    }

    setQuote(quote:Quote){
        this.quote = quote;
    }

    getQuote(): Quote{
        return this.quote
    }

    
    multiplePaintTinsNeeded(totalLitreNeeded:number, litreList:number[]):number[] {
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
    
    /**
     * Calculates how much paint is needed
     * @param numOfPaintNeeded 
     * @param price 
     * @returns finalised Price
     */
    costOfPaint(numOfPaintNeeded:number, price:number):number{
        return numOfPaintNeeded * price;
    }
    
    describe(){
        let tinData: number [][] = this.storeDifferentLitreTinsAmount(this.totalAreaVal)
        let quote:Quote = this.createQuoteObject(this.brandName, this.getPriceList(),tinData)
        console.log(`The Idea:  `)
        console.log(`- ${quote.name}`)
        console.log(`- ${quote.oneLitre} number of 1L tins`)
        console.log(`- ${quote.twoFiveLitre} number of 2.5L tins`)
        console.log(`- ${quote.fiveLitre} number of 5L tins`)
        console.log(`- ${quote.tenLitre} number of 10L tins`)
        console.log(`The final Price will be £${quote.totalPrice}`)
    }

    private sumArray(arrNumbers:number[]):number{
        let total:number = 0;
        for (let i=0; i < arrNumbers.length; i++){
            total += arrNumbers[i]
        }
        return total
    }

    
    
}