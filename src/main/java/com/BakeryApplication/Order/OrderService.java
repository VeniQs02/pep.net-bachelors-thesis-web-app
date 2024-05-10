package com.BakeryApplication.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders(){return orderRepository.findAll();}
    public Optional<Order> getOrderById(String _id){return orderRepository.findById(_id);}
    public Order addOrder(Order order){return orderRepository.save(order);}
    public void deleteOrder(String _id){orderRepository.deleteById(_id);}
}
