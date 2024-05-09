import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {Product} from "../../product/product";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, DecimalPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  protected buyProducts(){
    console.log("Zakupiono!");
    alert("Zakupiono!");
  }

  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) {}
  ngOnInit(){
    this.cartItems = this.cartService.getCartItems()
  }
  getTotalCost(): number {
    return this.cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0);
  }

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    adres: new FormControl('', Validators.required)
  });
}
