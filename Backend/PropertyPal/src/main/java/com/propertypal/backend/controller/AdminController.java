package com.propertypal.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.propertypal.backend.model.Admin;
import com.propertypal.backend.model.Bungalow;
import com.propertypal.backend.model.Flat;
import com.propertypal.backend.model.User;
import com.propertypal.backend.service.AdminService;
import com.propertypal.backend.service.BungalowService;
import com.propertypal.backend.service.FlatService;
import com.propertypal.backend.service.UserService;


@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/admin")
public class AdminController {
	
	
	private final AdminService adminService;

	@Autowired
    private UserService userService;
	
	@Autowired
    private FlatService flatService;

	@Autowired
    private BungalowService bungalowService;

	
	
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

   
    @PostMapping("/login")
    public Admin loginUser(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String securityans = credentials.get("securityans");
        return adminService.loginAdmin(email, password,securityans);
    }
    
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/users/{email}")
    public void deleteUser(@PathVariable String email) {
        userService.deleteUserByEmail(email);
    }
    
    @GetMapping("/flat")
    public List<Flat> getAllFlat() {
        return flatService.getAllFlat();
    }

    @DeleteMapping("/flat/{flatId}")
    public void deleteFlat(@PathVariable Long flatId) {
        flatService.deleteFlatByFlatId(flatId);
    }
	
    @GetMapping("/bungalow")
    public List<Bungalow> getAllBungalow() {
        return bungalowService.getAllBungalow();
    }

    @DeleteMapping("/bungalow/{bungalowId}")
    public void deletebungalow(@PathVariable Long bungalowId) {
        bungalowService.deleteBungalowByBungalowId(bungalowId);
    }
}
