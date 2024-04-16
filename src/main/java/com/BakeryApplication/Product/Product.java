package com.BakeryApplication.Product;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Product")
@Data
public class Product {
    @Id
    String _id;
    String name;
    String description;
    double price;
    int stock;
    ProductType category;
    String[] ingredients;
}
