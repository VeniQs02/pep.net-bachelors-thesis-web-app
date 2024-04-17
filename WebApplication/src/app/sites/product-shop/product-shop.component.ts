import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductService} from "../../product/product.service";
import {Product} from "../../product/product";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-product-shop',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './product-shop.component.html',
  styleUrl: './product-shop.component.css'
})
export class ProductShopComponent  implements OnInit{

  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.findAll()
      .subscribe(data => this.products = data);
  }

}
