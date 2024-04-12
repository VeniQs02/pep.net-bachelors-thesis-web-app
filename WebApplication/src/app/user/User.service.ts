import { Injectable } from '@angular/core';
import { User } from "./User";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private usersUrl: string;
  private username: string = 'adminadmin';
  private password: string = '123321';

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/api/users';
  }

  public findAll(): Observable<User[]> {
    // Encode the username and password to Base64
    const basicAuthHeader = 'Basic ' + btoa(this.username + ':' + this.password);

    // Set the Authorization header with the encoded credentials
    const headers = new HttpHeaders({
      'Authorization': basicAuthHeader
    });

    // Make the HTTP request with the headers
    return this.http.get<User[]>(this.usersUrl, { headers });
  }

}
