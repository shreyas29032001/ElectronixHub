package com.example.ElectronixHub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ElectronixHub.Model.Category;
import com.example.ElectronixHub.Service.CategoryService;

@RestController
@RequestMapping("/category")  // Fixed typo here
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public String createCategory(@RequestBody Category category) {
        categoryService.createCategory(category);
        return "Category created successfully!";
    }

    @GetMapping("/list")
    public List<Category> listCategory() {
        return categoryService.listCategory();
    }
    @PostMapping("/update/{categoryid}")
    public String updateCategory(@PathVariable("categoryid")int categoryid,@RequestBody Category category){
        System.out.println("category id" +categoryid);
        categoryService.editCategory(categoryid,category);
        return "Category Update Successfully";

    }

}
