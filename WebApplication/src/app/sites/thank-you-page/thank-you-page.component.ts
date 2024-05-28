import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive, Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.css'
})
export class ThankYouPageComponent implements OnInit, OnDestroy{

  private timeoutId: any;


  constructor(private router: Router) {}

  ngOnInit(){
    this.timeoutId = setTimeout(() => {
      this.router.navigate(['/product-shop']).then();
    }, 20000);
  }
  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
