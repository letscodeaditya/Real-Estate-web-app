package com.propertypal.backend.controller;

import com.propertypal.backend.service.UserService;
import com.propertypal.backend.service.PrimeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/prime")
public class PrimeController {

    @Autowired
    private UserService userService;

    @Autowired
    private PrimeService primeService;

    @PostMapping("/sub/{userId}")
    public String subscribeUser(@PathVariable Long userId, @RequestBody Map<String, String> requestBody) {
        String paymentType = requestBody.get("paymentType");

        // Change user subscription status
        userService.changeUserSubscription(userId);

        // Add subscription to prime table
        primeService.addPrimeSubscription(userId, new Date(), paymentType);

        return "Subscription successful";
    }
}