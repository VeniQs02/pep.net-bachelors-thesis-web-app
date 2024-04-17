import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly productsUrl: string;
  private username: string = 'adminadmin';
  private password: string = '123321';

  constructor(private http: HttpClient) {
    this.productsUrl = 'http://localhost:8080/api/products';
  }
  public findAll(): Observable<Product[]> {
    const basicAuthHeader = 'Basic ' + btoa(this.username + ':' + this.password);

    const headers = new HttpHeaders({
      'Authorization': basicAuthHeader
    });

    return this.http.get<Product[]>(this.productsUrl, { headers });
  }
}
