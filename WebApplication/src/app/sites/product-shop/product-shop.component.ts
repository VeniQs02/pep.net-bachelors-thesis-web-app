import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CartService} from "../../cart/cart.service";


@Component({
  selector: 'app-product-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, NgOptimizedImage],
  templateUrl: './product-shop.component.html',
  styleUrl: './product-shop.component.css'
})
export class ProductShopComponent implements OnInit {
  products: Product[];
  uniqueCategories: string[];
  selectedCategory: string;
  filteredProducts: Product[];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe(data => {
      this.products = data;
      this.getUniqueCategories();
      this.selectedCategory = 'Wszystko';
      this.filterProducts();
    });
  }

  getUniqueCategories(): void {
    const categoriesSet = new Set<string>();
    this.products.forEach(product => categoriesSet.add(product.category));
    this.uniqueCategories = Array.from(categoriesSet);
    this.uniqueCategories.unshift("Wszystko");
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedCategory === 'Wszystko') {
      this.filteredProducts = this.products; // Show all products
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  isOutOfStock(product: Product): boolean {
    const cartItem = this.cartService.cartItems.find(item => item.product._id === product._id);
    return <boolean>(product.stock === 0 || (cartItem && cartItem.quantity >= product.stock));
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
