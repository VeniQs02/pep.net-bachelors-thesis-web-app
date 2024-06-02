import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LoginService} from "../../login/login.service";

@Component({
  selector: 'app-botbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './botbar.component.html',
  styleUrl: './botbar.component.css'
})
export class BotbarComponent  implements  OnInit{
  isLoggedIn: boolean;

  constructor(private loginService: LoginService) {
  }
  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();

    this.loginService.loginStateChange.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

}
