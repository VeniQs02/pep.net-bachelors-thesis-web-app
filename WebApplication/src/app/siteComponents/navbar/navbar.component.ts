import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed: boolean = true;

  constructor() {
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  checkScreenWidth(): void {
    const screenWidth = window.innerWidth;
    this.isCollapsed = screenWidth < 600;
  }
}
