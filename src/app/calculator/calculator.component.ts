import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { $ } from 'protractor';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Calculation } from '../model/calculation';
import { CalculationService } from '../service/calculation.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  private readonly componentDestroyed$ = new Subject();

  calculations : Calculation[];
  calculatorFormGroup : FormGroup;
  resultD : number;
  newCalculation : Calculation;

  constructor(public fb: FormBuilder, private calculationService: CalculationService) {
      this.calculatorFormGroup = this.fb.group({
        operandA: ['', [Validators.required, Validators.pattern("^-?[0-9]+$")]]
        ,operandB: ['', [Validators.required, Validators.pattern("^-?[0-9]+$")]]
        ,operation: ['', [Validators.required]]
        ,result: ['']    
        ,dateCreation: [''] 
    })
    
   }
  

  // Getter method to access formcontrols
  get operandA() {
    return this.calculatorFormGroup.get('operandA').value;
  }

  get operation() {
    return this.calculatorFormGroup.get('operation').value;
  }


  get operandB() {
    return this.calculatorFormGroup.get('operandB').value;
  }

  get result() {
    return this.calculatorFormGroup.get('result').value;
  }

  get dateCreation() {
    return this.calculatorFormGroup.get('dateCreation').value;
  }

  get formControls(){

    return this.calculatorFormGroup.controls;

  }

  set result(value){
    this.calculatorFormGroup.get('result').setValue(value);
  }

  ngOnDestroy(): void { this.componentDestroyed$.next() }

  ngOnInit() {
    this.calculationService.findAll().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {this.calculations = data;}) ;   
  }

   onSubmit() {
            
      if (!this.calculatorFormGroup.valid) {      
          console.log("Valid Form?:"+this.calculatorFormGroup.valid);
          return false;
      } else {

        let subscription: Subscription ;
        

        if("sum" == this.operation){
         this.calculationService.add(this.operandA, this.operandB).pipe(takeUntil(this.componentDestroyed$)).subscribe(result => {  
            this.resultD=result; 
                       
            let dateTime = new Date();
            this.newCalculation = new Calculation(this.operandA, this.operandB,this.operation, this.resultD, dateTime);
            this.calculations.push(this.newCalculation);
            
          });    
        }else if("substract" == this.operation){
          this.calculationService.substract(this.operandA, this.operandB).pipe(takeUntil(this.componentDestroyed$)).subscribe(result => {  
            this.resultD=result; 
            
            let dateTime = new Date();
            this.newCalculation = new Calculation(this.operandA, this.operandB,this.operation, this.resultD, dateTime);
            this.calculations.push(this.newCalculation);

          }) ;
        }else if("multiply" == this.operation){
          this.calculationService.multiply(this.operandA, this.operandB).pipe(takeUntil(this.componentDestroyed$)).subscribe(result => {  
            this.resultD=result; 
            
            let dateTime = new Date();
            this.newCalculation = new Calculation(this.operandA, this.operandB,this.operation, this.resultD, dateTime);
            this.calculations.push(this.newCalculation);

          }) ;
        }else if("divide" == this.operation){
          this.calculationService.divide(this.operandA, this.operandB).pipe(takeUntil(this.componentDestroyed$)).subscribe(result => {  
            this.resultD=result; 
            this.calculatorFormGroup.get('result').setValue(result);
            
            let dateTime = new Date();
            this.newCalculation = new Calculation(this.operandA, this.operandB,this.operation, this.resultD, dateTime);      
            this.calculations.push(this.newCalculation);
      
          }) ;
                
        }else{
          console.log("Not Recognized Operation in the Calculator");
          return;
        }      
        
       

      }

    }

}
