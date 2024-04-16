package com.BakeryApplication.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
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
    public Product updateProduct(String _id, Map<String, Object> updates) {
        Optional<Product> existingProductOptional = productRepository.findById(_id);
        if (existingProductOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();

            updates.forEach((key, value) -> {
                switch (key) {
                    case "name":
                        existingProduct.setName((String) value);
                        break;
                    case "description":
                        existingProduct.setDescription((String) value);
                        break;
                    case "price":
                        existingProduct.setPrice((Double) value);
                        break;
                    case "stock":
                        existingProduct.setStock((Integer) value);
                        break;
                    case "category":
                        existingProduct.setCategory((ProductType) value);
                        break;
                    case "ingredients":
                        existingProduct.setIngredients((String[]) value);
                        break;
                }
            });

            return productRepository.save(existingProduct);
        } else {
            return null;
        }
    }
    public void deleteProduct(String _id){
        productRepository.deleteById(_id);
    }
}
