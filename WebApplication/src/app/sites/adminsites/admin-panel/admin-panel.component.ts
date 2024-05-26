import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Product} from "../../../product/product";
import {ProductService} from "../../../product/product.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  products: Product[];
  uniqueCategories: string[];
  selectedCategory: string;
  filteredProducts: Product[];
  selectedProduct: Product | null = null;
  ingredientsInput: string = '';

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
    this.uniqueCategories.push("Wszystko");
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
    this.selectedProduct = {...product};
    this.ingredientsInput = this.selectedProduct.ingredients.join(', ');
  }

  closeEditPopup(): void {
    this.selectedProduct = null;
    this.ingredientsInput = '';
  }

  saveProduct(): void {
    if (this.selectedProduct) {
      this.selectedProduct.ingredients = this.ingredientsInput.split(',').map(ingredient => ingredient.trim());
      this.productService.updateProduct(this.selectedProduct).subscribe(response => {
        this.products = this.products.map(p => p._id === response._id ? response : p);
        this.filterProducts();
        this.closeEditPopup();
      });
    }
  }
}
