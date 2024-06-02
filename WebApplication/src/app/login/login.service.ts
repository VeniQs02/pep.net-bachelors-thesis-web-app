import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/users';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  private readonly headers: HttpHeaders;

  loginStateChange = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    const basicAuth = 'Basic ' + btoa('adminadmin:123321');
    this.headers = new HttpHeaders({
      'Authorization': basicAuth,
      'Content-Type': 'application/json'
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers: this.headers });
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

  isTokenValid(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/verify`, { token }, { headers: this.headers });
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    console.log("Logged out");
    this.loggedIn.next(false);
  }
}
