package com.example.ElectronixHub.dto;

public class SignUpDto {
    private String username;
    private String email;
    private String password;
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public SignUpDto(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public SignUpDto() {
    }
    
    
}