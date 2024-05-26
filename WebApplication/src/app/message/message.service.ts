import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Message} from "./message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly messagesUrl: string;
  private readonly basicAuthHeader: string;

  constructor(private http: HttpClient) {
    this.messagesUrl = 'http://localhost:8080/api/messages/add';
    this.basicAuthHeader = 'Basic ' + btoa('adminadmin:123321');
  }

  public createMessage(message: Message): Observable<Message> {
    const headers = new HttpHeaders({
      'Authorization': this.basicAuthHeader,
      'Content-Type': 'application/json'
    });

    return this.http.post<Message>(this.messagesUrl, message, { headers })
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
