package com.example.ElectronixHub.Repository;
import com.example.ElectronixHub.Model.CartItem;
import com.example.ElectronixHub.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    void deleteByUserAndProductId(User user, Long productId);
}
