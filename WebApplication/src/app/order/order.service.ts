import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Order } from "./order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly ordersUrl: string;
  private readonly basicAuthHeader: string;

  constructor(private http: HttpClient) {
    this.ordersUrl = 'http://localhost:8080/api/orders/add';
    this.basicAuthHeader = 'Basic ' + btoa('adminadmin:123321');
  }

  public createOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({
      'Authorization': this.basicAuthHeader,
      'Content-Type': 'application/json'
    });

    return this.http.post<Order>(this.ordersUrl, order, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
    errorMessage = 'Error: ' + error.error.message;

    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
