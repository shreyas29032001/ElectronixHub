package com.example.ElectronixHub.Controller;

import com.example.ElectronixHub.Model.CartItem;
import com.example.ElectronixHub.Model.Product;
import com.example.ElectronixHub.Model.User;
import com.example.ElectronixHub.Service.CartService;
import com.example.ElectronixHub.Service.ProductService;
import com.example.ElectronixHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping("/{username}")
    public ResponseEntity<?> getCartItems(@PathVariable String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body("User not found");

        List<CartItem> items = cartService.getCartItems(userOpt.get());

        List<Map<String, Object>> responseList = items.stream().map(item -> {
            Map<String, Object> map = new HashMap<>();
            if (item.getProduct() != null) {
                map.put("itemId", item.getId());
                map.put("productId", item.getProduct().getId());
                map.put("productName", item.getProduct().getName());
                map.put("quantity", item.getQuantity());
                map.put("price", item.getProduct().getPrice());
            }
            return map;
        }).filter(Objects::nonNull).toList();

        return ResponseEntity.ok(responseList);
    }

    @PostMapping("/{username}/add")
    public ResponseEntity<?> addCartItem(@PathVariable String username, @RequestBody CartItem cartItem) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body("User not found");

        Optional<Product> productOpt = productService.findById(cartItem.getProduct().getId());
        if (productOpt.isEmpty())
            return ResponseEntity.badRequest().body("Product not found");

        cartItem.setUser(userOpt.get());
        cartItem.setProduct(productOpt.get());

        CartItem savedItem = cartService.addCartItem(cartItem);
        return ResponseEntity.ok(savedItem);
    }

    // @DeleteMapping("/{username}/remove/{productId}")
    // public ResponseEntity<?> removeCartItem(@PathVariable String username, @PathVariable Long productId) {
    //     System.out.println("Attempting to remove product ID: " + productId + " for username: " + username);

    //     Optional<User> userOpt = userService.findByUsername(username);
    //     if (userOpt.isEmpty())
    //         return ResponseEntity.badRequest().body("User not found");

    //     try {
    //         cartService.removeCartItem(userOpt.get(), productId);
    //         return ResponseEntity.ok("Item removed successfully");
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return ResponseEntity.status(500).body("Error removing item: " + e.getMessage());
    //     }
    // }
    @DeleteMapping("/{username}/remove/{productId}")
public ResponseEntity<?> removeCartItem(@PathVariable String username, @PathVariable Long productId) {
    Optional<User> userOpt = userService.findByUsername(username);
    if (userOpt.isEmpty())
        return ResponseEntity.badRequest().body(Map.of("error", "User not found"));

    cartService.removeCartItem(userOpt.get(), productId);

    return ResponseEntity.ok(Map.of("message", "Item removed successfully"));
}

    @DeleteMapping("/{username}/clear")
    public ResponseEntity<?> clearCart(@PathVariable String username) {
        Optional<User> userOpt = userService.findByUsername(username);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body("User not found");

        cartService.clearCart(userOpt.get());
        return ResponseEntity.ok("Cart cleared successfully");
    }
}
