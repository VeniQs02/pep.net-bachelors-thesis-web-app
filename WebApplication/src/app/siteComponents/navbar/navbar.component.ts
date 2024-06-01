import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private loginService: LoginService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateLoginStatus();

    this.loginService.loginStateChange.subscribe(() => {
      this.updateLoginStatus();
    });

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

  getCartItemsNumber(): number {
    return this.cartService.getCartItemsNumber();
  }

  handleLoginButtonClick(): void {
    if (this.isLoggedIn) {
      this.loginService.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.cdRef.detectChanges();  // Manually trigger change detection
  }
}
