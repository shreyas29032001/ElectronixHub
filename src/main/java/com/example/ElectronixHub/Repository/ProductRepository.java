package com.example.ElectronixHub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ElectronixHub.Model.Product;

public interface ProductRepository extends JpaRepository<Product,Integer>{

}