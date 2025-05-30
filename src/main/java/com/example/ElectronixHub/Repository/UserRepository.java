package com.example.ElectronixHub.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ElectronixHub.Model.User;

public interface UserRepository extends JpaRepository<User ,Integer> {
    Optional<User> findByEmail(String email);

}