package com.BakeryApplication.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> allProducts(){
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String _id){
        return productRepository.findById(_id);
    }

    public Product addProduct(Product product){
        return productRepository.save(product);
    }

    public Product updateProduct(String _id, Product updatedProduct) {
        Optional<Product> existingProductOptional = productRepository.findById(_id);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();

            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setStock(updatedProduct.getStock());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setIngredients(updatedProduct.getIngredients());

            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }

    public void deleteProduct(String _id){
        productRepository.deleteById(_id);
    }
}
