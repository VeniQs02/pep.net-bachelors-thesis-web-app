import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MessageService } from '../../../message/message.service';
import { Message } from '../../../message/message';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  sortedMessages: Message[] = [];
  sortField: keyof Message = 'messageCreationDate';
  sortDirection: string = 'asc';
  errorMessage: string = '';
  searchTerm: string = '';
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
        this.sortMessages();
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  sortMessages(): void {
    this.sortedMessages = this.messages.sort((a, b) => {
      let compare = 0;
      if (a[this.sortField] > b[this.sortField]) {
        compare = 1;
      } else if (a[this.sortField] < b[this.sortField]) {
        compare = -1;
      }
      return this.sortDirection === 'asc' ? compare : -compare;
    });
    this.filterMessages();
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

  filterMessages(): void {
    if (this.searchTerm.trim()) {
      this.sortedMessages = this.messages.filter(message =>
        message.customerName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.sortedMessages = [...this.messages];
    }
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
