package com.example.ElectronixHub.Service;

import com.example.ElectronixHub.Model.CartItem;
import com.example.ElectronixHub.Repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartRepo;

    public List<CartItem> getCartItems() {
        return cartRepo.findAll();
    }

    public CartItem addToCart(CartItem item) {
        return cartRepo.save(item);
    }

    public void removeFromCart(Long id) {
        cartRepo.deleteById(id);
    }
}
