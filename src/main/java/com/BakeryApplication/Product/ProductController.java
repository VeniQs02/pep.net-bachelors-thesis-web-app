package com.BakeryApplication.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(productService.allProducts(), HttpStatus.OK);
    }
    @GetMapping("/{_id}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable String _id){
        return new ResponseEntity<>(productService.getProductById(_id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product){
        Product newProduct = productService.addProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("/update/{_id}")
    public ResponseEntity<Product> updateProduct(@RequestBody Product product, @PathVariable String _id) {
        Product updatedProduct = productService.updateProduct(_id, product);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{_id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String _id){
        productService.deleteProduct(_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
