import { Observable } from 'rxjs';
import { TestBed, getTestBed } from  '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';

import { CalculationService } from './calculation.service';

describe('CalculationService', () => {
  let calculationService: CalculationService;
  let  testBed: TestBed;
  let  httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({    
      imports: [HttpClientTestingModule],    
       providers: [CalculationService]    
    });
    calculationService = TestBed.inject(CalculationService);
    testBed = getTestBed();        
    httpMock = testBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(calculationService).toBeTruthy();
  });

  it('should add function', () => {
    expect(calculationService.add).toBeTruthy();
  });

  it('should return the correct number of the addition', () => {

      let resultExpected: number = 2.0;
      // expect(calculationService.add(1,1)).toEqual(new Observable<Number>());
      calculationService.add(1,1).subscribe((result:number) => {  
        expect(result).toBe(resultExpected);            
      });     

      const request2 = httpMock.expectOne('http://localhost:8080/api/add/1/1');
      
      expect(request2.request.method).toBe("PUT");  
      request2.flush(resultExpected);  
      httpMock.verify();
  });
  

  it('should return an Observable<Calculation[] list>', () => {

      const  someCalculations = [  
        { id:  1, operandA :  4, operandB:  14, operation:  "MULTIPLY" , result:  56.0 },  
        { id:  2, operandA :  4, operandB :  1, operation:  "SUM" , result :  4.0 },  
        { id:  3, operandA :  4, operandB :  1, operation:  "SUBSTRACT" , result: 3.0 },  
        { id:  4, operandA :  4, operandB :  2, operation:  "DIVIDE" , result:  2.0 },  
      ];   

      calculationService.findAll().subscribe((calculations) => {  
        expect(calculations.length).toBe(4);    
        expect(calculations).toEqual(someCalculations);    
      });  
      
      const request = httpMock.expectOne('http://localhost:8080/api/calculations');
      
      expect(request.request.method).toBe("GET");  
      request.flush(someCalculations);  
      httpMock.verify();
    
    });
});




