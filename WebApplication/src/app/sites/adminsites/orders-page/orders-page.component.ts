import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { OrderService } from '../../../order/order.service';
import { Order } from '../../../order/order';
import { ProductService } from '../../../product/product.service';
import { Product } from '../../../product/product';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule here
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];
  sortedOrders: Order[] = [];
  products: Product[] = [];
  sortField: keyof Order = 'orderCreationDate';
  sortDirection: string = 'asc';
  errorMessage: string = '';
  searchTerm: string = ''; // Add searchTerm property
  popupOrder: Order | null = null;
  popupOrderProducts: { productName: string; productId: string; productQuantity: number }[] = [];

  constructor(private orderService: OrderService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      data => {
        this.orders = data;
        this.sortOrders();
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  loadProducts(): void {
    this.productService.findAll().subscribe(
      data => {
        this.products = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  sortOrders(): void {
    this.sortedOrders = this.orders.sort((a, b) => {
      let compare = 0;
      if (a[this.sortField] > b[this.sortField]) {
        compare = 1;
      } else if (a[this.sortField] < b[this.sortField]) {
        compare = -1;
      }
      return this.sortDirection === 'asc' ? compare : -compare;
    });
    this.filterOrders(); // Call filterOrders after sorting
  }

  setSortField(field: keyof Order): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortOrders();
  }

  filterOrders(): void {
    if (this.searchTerm.trim()) {
      this.sortedOrders = this.orders.filter(order =>
        order.customerName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.sortedOrders = [...this.orders];
    }
  }

  deleteOrder(id: string): void {
    const confirmation = window.confirm('Czy na pewno chcesz usunąć to zamówienie?');
    if (confirmation) {
      this.orderService.deleteOrder(id).subscribe(
        () => {
          this.orders = this.orders.filter(order => order._id !== id);
          this.sortOrders();
        },
        error => {
          this.errorMessage = 'Błąd podczas usuwania zamówienia.' + error;
        }
      );
    }
  }

  showOrder(order: Order): void {
    this.popupOrder = order;
    this.popupOrderProducts = order.cartItems.map(item => {
      const product = this.products.find(p => p._id === item.productId);
      return {
        productName: product ? product.name : 'Unknown Product',
        productId: item.productId,
        productQuantity: item.productQuantity
      };
    });
  }

  closePopup(): void {
    this.popupOrder = null;
    this.popupOrderProducts = [];
  }
}
