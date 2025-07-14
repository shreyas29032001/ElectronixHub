
package com.example.ElectronixHub.Controller;

import com.example.ElectronixHub.Model.User;
import com.example.ElectronixHub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Username already taken"));
        }
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Email already in use"));
        }
        userService.register(user);
        return ResponseEntity.ok(Collections.singletonMap("message", "Registration successful"));
    }

 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> result = userService.login(user.getUsername(), user.getPassword());
        if (result.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("username", result.get().getUsername());
            response.put("role", result.get().getRole()); // ✅ include role
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        if (userService.deleteByUsername(username)) {
            return ResponseEntity.ok(Collections.singletonMap("message", "User deleted successfully"));
        }
        return ResponseEntity.status(404).body(Collections.singletonMap("message", "User not found"));
    }
}
