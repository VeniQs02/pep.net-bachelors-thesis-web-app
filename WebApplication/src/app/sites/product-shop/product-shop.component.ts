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

  ngOnInit() {
    this.productService.findAll().subscribe(data => {
      this.products = data;
      this.getUniqueCategories();
      this.selectedCategory = 'Wszystko'; // Set default category
      this.filterProducts();
    });
  }

  getUniqueCategories() {
    const categoriesSet = new Set<string>();
    this.products.forEach(product => categoriesSet.add(product.category));
    this.uniqueCategories = Array.from(categoriesSet);
    this.uniqueCategories.push("Wszystko");
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  filterProducts() {
    if (this.selectedCategory === 'Wszystko') {
      this.filteredProducts = this.products; // Show all products
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
