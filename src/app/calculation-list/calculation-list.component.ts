import { Component, OnInit, Input } from '@angular/core';
import { Calculation } from '../model/calculation';
import { CalculationService } from '../service/calculation.service';

@Component({
  selector: 'app-calculation-list',
  templateUrl: './calculation-list.component.html',
  styleUrls: ['./calculation-list.component.scss']
})
export class CalculationListComponent implements OnInit {
    
    constructor() {  }

    ngOnInit() {
     //this.calculationService.findAll().subscribe(data => {this.calculations = data;}) ;     
      //this.calculationService.findAll().subscribe(data => {this.calculations = data;});
    }

    
}