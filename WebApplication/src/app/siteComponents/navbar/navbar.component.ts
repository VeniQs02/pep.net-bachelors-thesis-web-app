import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapsed: boolean = true;

  constructor(private cartService: CartService) {
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

  getCartItemsNumber() :number{
    return this.cartService.getCartItemsNumber();
  }

}
