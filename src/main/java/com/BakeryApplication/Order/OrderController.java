package com.BakeryApplication.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(){
        return new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
    }
    @GetMapping("/{_id}")
    public ResponseEntity<Optional<Order>> getOrderById(@PathVariable String _id){
        return new ResponseEntity<>(orderService.getOrderById(_id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody Order order){
        orderService.applyOrderModifications(order);
        Order newOrder = orderService.addOrder(order);
        return new ResponseEntity<>(newOrder, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{_id}")
    public ResponseEntity<?> deleteOrder(@PathVariable String _id){
        orderService.deleteOrder(_id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
