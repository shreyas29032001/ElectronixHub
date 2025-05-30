package com.example.ElectronixHub.Service;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ElectronixHub.Model.User;
import com.example.ElectronixHub.Repository.UserRepository;
import com.example.ElectronixHub.dto.SignInDto;
import com.example.ElectronixHub.dto.SignUpDto;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public String signUp(SignUpDto signUpDto) {
        if (userRepository.findByEmail(signUpDto.getEmail()).isPresent()) {
            return "Email already in use.";
        }
        User user = new User();
        user.setUsername(signUpDto.getUsername());
        user.setEmail(signUpDto.getEmail());
        user.setPassword(signUpDto.getPassword()); // 👈 No encryption here yet
        userRepository.save(user);
        return "User registered successfully!";
    }

    public String signIn(SignInDto signInDto) {
        Optional<User> optionalUser = userRepository.findByEmail(signInDto.getEmail());

        if (!optionalUser.isPresent()) {
            return "Invalid email or password.";
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(signInDto.getPassword())) {
            return "Invalid email or password.";
        }

        return "Login successful!";
    }
}
