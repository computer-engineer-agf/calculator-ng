import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'  
})


export class CalculationService {

  private calculationUrl: string;

  constructor(private http: HttpClient) {
    this.calculationUrl = 'http://localhost:8080/api';
  }

  public add(num1: number, num2: number): Observable<any> {
    let url = this.calculationUrl+'/add/'+num1+'/'+num2;    
    const body = { title: 'Angular PUT Request ' }; 
              return this.http.put(url,body).pipe(
                    retry(1),
                    catchError(this.handleError)
                );
  }

  public substract(num1: number, num2: number): Observable<any> {
    let url = this.calculationUrl+'/substract/'+num1+'/'+num2;    
    const body = { title: 'Angular PUT Request ' }; 
    return this.http.put(url,body).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public multiply(num1: number, num2: number): Observable<any> {
    let url = this.calculationUrl+'/multiply/'+num1+'/'+num2;    
    const body = { title: 'Angular PUT Request ' }; 
      return this.http.put(url,body).pipe(
        retry(1),
        catchError(this.handleError)
    );
  }

  public divide(num1: number, num2: number): Observable<any> {
    let url = this.calculationUrl+'/divide/'+num1+'/'+num2;    
    const body = { title: 'Angular PUT Request ' }; 
    return this.http.put(url,body).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public findAll(): Observable<any> {
    return this.http.get(this.calculationUrl+'/calculations').pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
