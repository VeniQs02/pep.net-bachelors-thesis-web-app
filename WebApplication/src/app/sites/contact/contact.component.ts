import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Message} from "../../message/message";
import {MessageService} from "../../message/message.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  sent?: boolean = false;

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  constructor(private messageService: MessageService) {}

  protected send(){
    const messageData: Message = new Message(
      <string>this.profileForm.value.name,
      <string>this.profileForm.value.email,
      <string>this.profileForm.value.message
    );

    this.messageService.createMessage(messageData).subscribe({
      next: (response) => {
        console.log("Message created successfully:", response);
        // alert("Message sent successfully!");
        this.profileForm.setValue({name: "", email: "", message: ""});
        this.sent = true;
      },
      error: (error) => {
        console.error("Error creating order:", error);
        alert("There was an error sending the message. Please try again.");
        this.sent = false;
      }
    });
  }
}
