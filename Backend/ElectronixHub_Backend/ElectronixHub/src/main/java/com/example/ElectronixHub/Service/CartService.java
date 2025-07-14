package com.example.ElectronixHub.Service;

import com.example.ElectronixHub.Model.CartItem;
import com.example.ElectronixHub.Model.Product;
import com.example.ElectronixHub.Model.User;
import com.example.ElectronixHub.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> getCartItems(User user) {
        return cartItemRepository.findByUser(user);
    }

    public CartItem addCartItem(CartItem item) {
        Optional<CartItem> existing = cartItemRepository.findByUserAndProduct(item.getUser(), item.getProduct());
        if (existing.isPresent()) {
            CartItem existingItem = existing.get();
            existingItem.setQuantity(existingItem.getQuantity() + item.getQuantity());
            return cartItemRepository.save(existingItem);
        }
        return cartItemRepository.save(item);
    }

    public void removeCartItem(User user, Long productId) {
        List<CartItem> items = cartItemRepository.findByUser(user);

        for (CartItem item : items) {
            if (item.getProduct() != null && item.getProduct().getId().equals(productId)) {
                cartItemRepository.delete(item);
                return;
            }
        }

        throw new RuntimeException("Product with ID " + productId + " not found in cart.");
    }

    public void clearCart(User user) {
        cartItemRepository.deleteByUser(user);
    }
}
