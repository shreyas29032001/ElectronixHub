package com.example.ElectronixHub.Service;

import com.example.ElectronixHub.Model.Category;
import com.example.ElectronixHub.Model.Product;
import com.example.ElectronixHub.Repository.CategoryRepository;
import com.example.ElectronixHub.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public List<Product> getByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public Product create(Product product) {
        // Check if category is provided
        if (product.getCategory() != null && product.getCategory().getId() != null) {
            // Fetch the persisted category
            Category category = categoryRepository.findById(product.getCategory().getId())
                    .orElseThrow(
                            () -> new RuntimeException("Category not found with ID: " + product.getCategory().getId()));
            // Assign the persisted category
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }

        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

}
