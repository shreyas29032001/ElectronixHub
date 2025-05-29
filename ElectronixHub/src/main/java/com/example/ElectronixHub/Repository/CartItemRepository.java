package com.example.ElectronixHub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ElectronixHub.Model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
}
