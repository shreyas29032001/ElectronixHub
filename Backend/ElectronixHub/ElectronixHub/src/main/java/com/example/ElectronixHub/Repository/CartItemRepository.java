package com.example.ElectronixHub.Repository;

import com.example.ElectronixHub.Model.CartItem;
import com.example.ElectronixHub.Model.Product;
import com.example.ElectronixHub.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    void deleteByUser(User user);
    Optional<CartItem> findByUserAndProduct(User user, Product product);
}
