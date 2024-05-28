package com.BakeryApplication.Order;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Order")
@Data
public class Order {
    @Id
    String _id;
    String customerName;
    String customerEmail;
    String customerAddress;
    String orderCreationDate;
    double cartTotalPrice;
    CartItem[] cartItems;
}
