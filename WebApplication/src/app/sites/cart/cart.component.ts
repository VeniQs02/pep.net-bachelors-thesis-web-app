import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CartService} from "../../cart/cart.service";
import {CommonModule} from "@angular/common";
import {Product} from "../../product/product";

@Component({
  selector: 'app-cart',
  standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        CommonModule
    ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cartItems: Product[];

  constructor(private cartService: CartService ) {
    this.cartItems = this.cartService.getCartItems()
  }


  getCartItemsNumber(){
    return this.cartService.getCartItemsNumber();
  }



}
