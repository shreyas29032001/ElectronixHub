package com.example.ElectronixHub.Controller;

import com.example.ElectronixHub.Model.Order;
import com.example.ElectronixHub.Model.User;
import com.example.ElectronixHub.Service.OrderService;
import com.example.ElectronixHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/{username}/place")
    public ResponseEntity<?> placeOrder(@PathVariable String username, @RequestBody Order order) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body("User not found");

        order.setUser(userOpt.get());
        Order placedOrder = orderService.placeOrder(order);
        return ResponseEntity.ok(placedOrder);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getOrdersByUser(@PathVariable String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body("User not found");

        List<Order> orders = orderService.getOrdersByUser(userOpt.get());
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Optional<Order> orderOpt = orderService.getOrderById(id);
        if (orderOpt.isEmpty())
            return ResponseEntity.badRequest().body("Order not found");

        return ResponseEntity.ok(orderOpt.get());
    }
}
