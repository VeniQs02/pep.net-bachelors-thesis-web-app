import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../message/message.service';
import { Message } from '../../../message/message';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  sortedMessages: Message[] = [];
  sortField: keyof Message = 'messageCreationDate';
  sortDirection: string = 'asc';
  errorMessage: string = '';
  popupMessage: string | null = null;
  popupUsername: string | null = null;
  popupEmail: string | null = null;
  popupId: string | null = null;


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      data => {
        this.messages = data;
        console.log(data)
        this.sortMessages();
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  sortMessages(): void {
    console.log("Messages before sort:", this.messages.length);

    this.sortedMessages = this.messages.sort((a, b) => {
      let compare = 0;
      if (a[this.sortField] > b[this.sortField]) {
        compare = 1;
      } else if (a[this.sortField] < b[this.sortField]) {
        compare = -1;
      }
      console.log("Messages after sort:", this.sortedMessages.length);

      return this.sortDirection === 'asc' ? compare : -compare;
    });
  }

  setSortField(field: keyof Message): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortMessages();
  }

  deleteMessage(id: string): void {
    const confirmation = window.confirm('Czy na pewno chcesz usunąć tę wiadomość?');
    if (confirmation) {
      this.messageService.deleteMessage(id).subscribe(
        () => {
          this.messages = this.messages.filter(message => message._id !== id);
          this.sortMessages();
        },
        error => {
          this.errorMessage = 'Błąd podczas usuwania wiadomości.' + error;
        }
      );
    }
  }

  showMessage(message: string, username: string, email: string, Id: string): void {
    this.popupMessage = message;
    this.popupUsername = username;
    this.popupEmail = email;
    this.popupId = Id;
  }


  closePopup(): void {
    this.popupMessage = null;
    this.popupUsername = null;
    this.popupEmail = null;
    this.popupId = null;
  }

}
