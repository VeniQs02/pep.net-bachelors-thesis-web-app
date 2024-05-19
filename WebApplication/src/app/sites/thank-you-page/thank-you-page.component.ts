import {Component, OnInit} from '@angular/core';
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
export class ThankYouPageComponent implements OnInit{

  constructor(private router: Router) {
  }

  ngOnInit(){
    setTimeout(() => {
      this.router.navigate(['/product-shop']).then();
    }, 20000);
}
}
