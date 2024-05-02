import { Injectable } from '@angular/core';
import {Product} from "../product/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: { product: Product, quantity: number }[] = [];

  addToCart(product: Product): void {
    // Check if the product already exists in the cart
    const existingItem = this.cartItems.find(item => item.product._id == product._id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product: product, quantity: 1 });
    }
    this.cartItems = this.cartItems.filter(item => item.quantity > 0);

    console.log(product);
  }

  updateCart(updatedCartItems: { product: Product, quantity: number }[]): void {
    this.cartItems = updatedCartItems.filter(item => item.quantity > 0);
  }

  getCartItems() {
    return this.cartItems;
  }

  getCartItemsNumber() :number{
    return this.cartItems.length;
  }

}
