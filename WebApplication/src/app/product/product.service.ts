import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, switchMap, throwError} from "rxjs";
import { Product } from "./product";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productsUrl: string;
  private username: string = 'adminadmin';
  private password: string = '123321';
  private basicAuthHeader: string;

  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/api/products';
    this.basicAuthHeader = 'Basic ' + btoa(this.username + ':' + this.password);
  }

  public findAll(): Observable<Product[]> {
    const headers = new HttpHeaders({
      'Authorization': this.basicAuthHeader
    });
    return this.http.get<Product[]>(this.productsUrl, { headers });
  }

  public updateProduct(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/update/${product._id}`;
    return this.http.put<Product>(url, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.basicAuthHeader
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public addProduct(product: Product): Observable<Product> {
    return this.findAll().pipe(
      map(products => {
        const maxId = Math.max(...products.map(p => parseInt(p._id, 10)), 0);
        product._id = (maxId + 1).toString();
        return product;
      }),
      switchMap(newProduct => {
        const url = `${this.productsUrl}/add`;
        return this.http.post<Product>(url, newProduct, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.basicAuthHeader
          })
        });
      }),
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
