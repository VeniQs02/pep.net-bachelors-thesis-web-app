import { Component } from '@angular/core';
import {ProductService} from "../../../product/product.service";
import {FormsModule} from "@angular/forms";
import {Product} from "../../../product/product";

@Component({
  selector: 'app-add-bread-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-bread-page.component.html',
  styleUrl: './add-bread-page.component.css'
})
export class AddBreadPageComponent {

  newProduct: Product = new Product('', '', '', 0, 0, '', []);
  ingredientsInput: string = '';

  constructor(private productService: ProductService) {}


  onSubmit() {
    this.newProduct.ingredients = this.ingredientsInput.split(',').map(ingredient => ingredient.trim());
    this.productService.addProduct(this.newProduct).subscribe(
      product => {
        // Handle successful response
        console.log('Product added:', product);
      },
      error => {
        // Handle error response
        console.error('Error adding product:', error);
      }
    );
  }

}
