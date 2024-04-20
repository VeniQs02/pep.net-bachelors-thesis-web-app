import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-product-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule ],
  templateUrl: './product-shop.component.html',
  styleUrl: './product-shop.component.css'
})
export class ProductShopComponent implements OnInit {

  products: Product[];
  uniqueCategories: string[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.findAll().subscribe(data => {
      this.products = data;
      this.getUniqueCategories();
    });
  }

  getUniqueCategories() {
    const categoriesSet = new Set<string>();
    this.products.forEach(product => categoriesSet.add(product.category));
    this.uniqueCategories = Array.from(categoriesSet);
    this.uniqueCategories.push("Wszystko")
  }

}
