package com.propertypal.backend.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.propertypal.backend.model.User;
import com.propertypal.backend.service.UserService;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        return userService.loginUser(email, password);
    }
   
    @PutMapping("/update/{email}")
    public User updateUserDetails(@PathVariable String email, @RequestBody User updatedUser) {
        return userService.updateUserDetails(email, updatedUser);
    }
    
    @PutMapping("/update/{email}/pic")
    public User updateUserPic(@PathVariable String email, @RequestParam String newPicUrl) {
        return userService.updateUserPic(email, newPicUrl);
    }
    
    @GetMapping("/{id}")
    public Map<String, String> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    
}
