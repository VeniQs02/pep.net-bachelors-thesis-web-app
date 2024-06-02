import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/users';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  loginStateChange = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const basicAuth = 'Basic ' + btoa('adminadmin:123321');
    const headers = new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    console.log("Logged out");
    this.loggedIn.next(false);
  }
}
