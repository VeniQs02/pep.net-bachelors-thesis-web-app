import {Component, OnInit} from '@angular/core';
import {CartService} from "../../cart/cart.service";
import {Product} from "../../product/product";
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {DecimalPipe, NgOptimizedImage} from "@angular/common";
import {Order} from "../../order/order";
import {OrderService} from "../../order/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, DecimalPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) {}

  ngOnInit(){
    this.cartItems = this.cartService.getCartItems()
  }

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required)
  });

  getTotalCost(): number {
    return this.cartItems.reduce((total, item) =>
      total + (item.product.price * item.quantity), 0);
  }

  buyProducts() {
    if (this.profileForm.invalid) {
      return;
    }

    const orderItems = this.cartItems.map(item => ({
      productId: item.product._id,
      productQuantity: item.quantity
    }));

    const orderData = new Order(
      <string>this.profileForm.value.name,
      <string>this.profileForm.value.email,
      <string>this.profileForm.value.address,
      this.getTotalCost(),
      orderItems
    );

    this.orderService.createOrder(orderData).subscribe({
      next: () => {
        this.cartService.updateCart([])
        // console.log("Order created successfully:", response);
        // alert("Order placed successfully!");
        this.router.navigate(['/thankYou']).then()
      },
      error: (error) => {
        // console.error("Error creating order:", error);
        alert("There was an error placing the order. Please try again." + error);
        this.router.navigate(['/cart']).then()
      }
    });


  }



}
