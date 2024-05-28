import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly messagesUrl: string;
  private readonly deleteUrl: string;
  private readonly basicAuthHeader: string;

  constructor(private http: HttpClient) {
    this.messagesUrl = 'http://localhost:8080/api/messages';
    this.deleteUrl = 'http://localhost:8080/api/messages/delete';
    this.basicAuthHeader = 'Basic ' + btoa('adminadmin:123321');
  }

  public createMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders({
      'Authorization': this.basicAuthHeader,
      'Content-Type': 'application/json'
    });

    return this.http.post<Message>(`${this.messagesUrl}/add`, message, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getMessages(): Observable<Message[]> {
    const headers = new HttpHeaders({
      'Authorization': this.basicAuthHeader
    });

    return this.http.get<Message[]>(this.messagesUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public deleteMessage(id: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': this.basicAuthHeader
    });

    return this.http.delete<void>(`${this.deleteUrl}/${id}`, { headers })
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
