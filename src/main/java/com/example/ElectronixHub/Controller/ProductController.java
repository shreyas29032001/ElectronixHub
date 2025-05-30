package com.example.ElectronixHub.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ElectronixHub.Model.Category;
import com.example.ElectronixHub.Repository.CategoryRepository;
import com.example.ElectronixHub.Service.ProductService;
import com.example.ElectronixHub.dto.ProductDto;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    CategoryRepository categoryRepo;

    @PostMapping("/add")
    public ResponseEntity<String> createProduct(@RequestBody ProductDto productDto) {
        Optional<Category> optionalCategory = categoryRepo.findById(productDto.getCategoryId());

        if (!optionalCategory.isPresent()) {
            return new ResponseEntity<>("Category does not exist", HttpStatus.BAD_REQUEST);
        }

        productService.createProduct(productDto, optionalCategory.get());
        return new ResponseEntity<>("Product has been added successfully", HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<ProductDto>> getAProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    // Edit  Or Update product
    @PostMapping("/update/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable("productId")Integer productId, @RequestBody ProductDto productDto) {
        Optional<Category> optionalCategory = categoryRepo.findById(productDto.getCategoryId());

        if (!optionalCategory.isPresent()) {
            return new ResponseEntity<>("Category does not exist", HttpStatus.BAD_REQUEST);
        }

        productService.updateProduct(productDto, productId);
        return new ResponseEntity<>("Product has been Updated successfully", HttpStatus.CREATED);
    }

}

