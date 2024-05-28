import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Product } from "../../../product/product";
import { ProductService } from "../../../product/product.service";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  products: Product[];
  uniqueCategories: string[];
  selectedCategory: string;
  filteredProducts: Product[];
  selectedProduct: Product | null = null;
  ingredientsInput: string = '';
  errorMessage: string = '';

  constructor(private productService: ProductService) { }

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
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    }
  }

  openEditPopup(product: Product): void {
    this.selectedProduct = { ...product };
    this.ingredientsInput = this.selectedProduct.ingredients.join(', ');
    this.errorMessage = '';
  }

  closeEditPopup(): void {
    this.selectedProduct = null;
    this.ingredientsInput = '';
    this.errorMessage = '';
  }

  saveProduct(): void {
    if (this.selectedProduct) {
      if (this.selectedProduct.price < 0) {
        this.errorMessage = 'Cena nie może być mniejsza niż 0';
        return;
      }
      if (this.selectedProduct.stock < 0) {
        this.errorMessage = 'Stan magazynowy nie może być mniejszy niż 0';
        return;
      }
      this.selectedProduct.ingredients = this.ingredientsInput.split(',').map(ingredient => ingredient.trim());
      this.productService.updateProduct(this.selectedProduct).subscribe(response => {
        this.products = this.products.map(p => p._id === response._id ? response : p);
        this.filterProducts();
        this.closeEditPopup();
      });
    }
  }

  deleteProduct(): void {
    if (this.selectedProduct) {
      const confirmation = window.confirm('Czy na pewno chcesz usunąć ten produkt?');
      if (confirmation) {
        this.productService.deleteProduct(this.selectedProduct._id).subscribe(
          () => {
            this.products = this.products.filter(p => p._id !== this.selectedProduct!._id);
            this.filterProducts();
            this.selectedProduct = null;
          },
          error => {
            this.errorMessage = 'Błąd podczas usuwania produktu.' + error;
          }
        );
      }
    }
  }
}
