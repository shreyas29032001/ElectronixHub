package com.example.ElectronixHub.Controller;

import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @RequestMapping("/api")
public class HomeController {
    @GetMapping("/")
    public String index() {
        return "Welcome to ElectronixHub backend!";
    }
    @GetMapping("/home")
    public String home() {
        return "Welcome to ElectronixHub!";
    }
     @GetMapping("/product")
    public String product() {
        return "Welcome to ElectronixHub Product Page!";
    }
    

    @GetMapping("/about")
    public String about() {
        return "About ElectronixHub - Your gadget partner!";
    }

    @GetMapping("/contact")
    public String contact() {
        return "Contact us at support@electronixhub.com";
    }
}

