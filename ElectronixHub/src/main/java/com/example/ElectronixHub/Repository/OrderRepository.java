package com.example.ElectronixHub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ElectronixHub.Model.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
