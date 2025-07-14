package com.example.ElectronixHub.Repository;
import com.example.ElectronixHub.Model.Order;
import com.example.ElectronixHub.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}