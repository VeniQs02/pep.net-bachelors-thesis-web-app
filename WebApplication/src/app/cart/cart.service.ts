import { Injectable } from '@angular/core';
import {Product} from "../product/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Product[] = [];


  addToCart(product: Product): void {
    this.cartItems.push(product);
    console.log(product)
  }

  // removeFromCart(index: number) {
  //   this.cartItems.splice(index, 1);
  // }
  //
  // updateQuantity(index: number, quantity: number) {
  // }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemsNumber() :number{
    return this.cartItems.length;
  }

  // getTotalPrice() {
  // }
}
