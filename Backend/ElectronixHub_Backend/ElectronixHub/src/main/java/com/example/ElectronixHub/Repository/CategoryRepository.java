package com.example.ElectronixHub.Repository;

import com.example.ElectronixHub.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
