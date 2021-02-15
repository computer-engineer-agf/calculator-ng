export class Calculation {
    id: number;
    operandA: number;
    operandB: number;
    operation: string;
    result: number; 
    dateCreation: Date;   

    constructor(operandA:number, operandB:number, operation:string, result:number,dateTime: Date){
        this.operandA=operandA;
        this.operandB=operandB;
        this.operation = operation;
        this.result = result;
        this.dateCreation = dateTime;
    }
}
