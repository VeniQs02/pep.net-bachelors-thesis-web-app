package com.BakeryApplication.Order;

import com.BakeryApplication.Product.Product;
import com.BakeryApplication.Product.ProductService;
import com.BakeryApplication.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

    public List<Order> getAllOrders(){return orderRepository.findAll();}
    public Optional<Order> getOrderById(String _id){return orderRepository.findById(_id);}
    public Order addOrder(Order order) {
        System.out.println("Processing order...");

        for (CartItem item : order.getCartItems()) {
            int orderProductQuantity = item.getProductQuantity();
            String productId = item.getProductId();

            Optional<Product> productOptional = productService.getProductById(String.valueOf(productId));
            if (productOptional.isPresent()) {
                Product databaseProduct = productOptional.get();
                int databaseProductQuantity = databaseProduct.getStock();

                if (databaseProductQuantity >= orderProductQuantity) {
                    databaseProduct.setStock(databaseProductQuantity - orderProductQuantity);
                    productService.updateProduct(databaseProduct.get_id(), databaseProduct);
                    System.out.println("Order completed!");
                } else {
                    throw new IllegalArgumentException("Insufficient stock for product ID: " + productId);
                }
            } else {
                throw new IllegalArgumentException("Product ID not found: " + productId);
            }
        }

        return orderRepository.save(order);
    }
    public void applyOrderModifications(Order order) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy MM d, H:mm");
        String formattedDate = sdf.format(new Date());
        order.setOrderCreationDate(formattedDate);
    }

    public void deleteOrder(String _id){orderRepository.deleteById(_id);}
}
