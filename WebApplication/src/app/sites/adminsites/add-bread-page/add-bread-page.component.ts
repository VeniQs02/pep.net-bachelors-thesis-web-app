import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from "../../../product/product.service";
import { Product } from "../../../product/product";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-add-bread-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './add-bread-page.component.html',
  styleUrls: ['./add-bread-page.component.css']
})
export class AddBreadPageComponent implements OnInit {
  addProductForm: FormGroup;
  categories: string[] = [];
  sent: boolean = false;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      ingredients: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productService.findAll().subscribe(products => {
      this.categories = Array.from(new Set(products.map(p => p.category)));
    });
  }

  onSubmit() {
    if (this.addProductForm.invalid) {
      return;
    }

    const newProduct: Product = this.addProductForm.value;
    newProduct.ingredients = this.addProductForm.value.ingredients.split(',').map((ingredient: string) => ingredient.trim());

    this.productService.findAll().subscribe(products => {
      const maxId = Math.max(...products.map(p => parseInt(p._id, 10)), 0);
      newProduct._id = (maxId + 1).toString();

      this.productService.addProduct(newProduct).subscribe(
        product => {
          this.sent=true;
          this.addProductForm.markAsUntouched();
          this.addProductForm.setValue({name:"", description:"", price:"", stock:"", category:"", ingredients:""})
        },
        error => {
          console.error('Error adding product:', error);
        }
      );
    });
  }
}
