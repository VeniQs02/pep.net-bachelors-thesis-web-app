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
    const basicAuthHeader = 'Basic ' + btoa(this.username + ':' + this.password);

    const headers = new HttpHeaders({
      'Authorization': basicAuthHeader
    });

    return this.http.get<User[]>(this.usersUrl, { headers });
  }

}
