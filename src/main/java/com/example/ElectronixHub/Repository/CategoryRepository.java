package com.example.ElectronixHub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.ElectronixHub.Model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

