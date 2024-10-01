package com.propertypal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.propertypal.backend.model.Bungalow;
import com.propertypal.backend.model.Flat;
import com.propertypal.backend.service.BungalowService;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/bungalows") 
public class BungalowController {
    
    @Autowired
    private BungalowService bungalowService;
    
    @PostMapping("/add")
    public ResponseEntity<Bungalow> addBungalow(@RequestBody Bungalow bungalow) {
        Bungalow savedBungalow = bungalowService.saveBungalow(bungalow);
        return ResponseEntity.ok(savedBungalow);
    }

    @GetMapping("/rent/{city}/{pageno}/{size}")
    public ResponseEntity<Page<Bungalow>> getRentBungalows(
            @PathVariable String city,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(bungalowService.getBungalowsByTypeAndCity("rent", city, pageno, size));
    }

    @GetMapping("/sell/{city}/{pageno}/{size}")
    public ResponseEntity<Page<Bungalow>> getSellBungalows(
            @PathVariable String city,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(bungalowService.getBungalowsByTypeAndCity("sell", city, pageno, size));
    }
    
    @GetMapping("/rent/{city}/{bungalowSize}/{pageno}/{size}")
    public ResponseEntity<Page<Bungalow>> getRentBungalowsBySize(
            @PathVariable String city,
            @PathVariable String bungalowSize,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(bungalowService.getBungalowsByTypeCityAndSize("rent", city, bungalowSize, pageno, size));
    }

    @GetMapping("/sell/{city}/{bungalowSize}/{pageno}/{size}")
    public ResponseEntity<Page<Bungalow>> getSellBungalowsBySize(
            @PathVariable String city,
            @PathVariable String bungalowSize,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(bungalowService.getBungalowsByTypeCityAndSize("sell", city, bungalowSize, pageno, size));
    }
    
    @GetMapping("/yourpostsbungalows/{postedBy}/{pageNo}/{pageSize}")
    public ResponseEntity<Page<Bungalow>> getBungalowsByUser(
        @PathVariable Long postedBy,
        @PathVariable int pageNo,
        @PathVariable int pageSize
    ) {
        Page<Bungalow> bungalowsPage = bungalowService.getBungalowsPostedByUser(postedBy, pageNo, pageSize);
        return new ResponseEntity<>(bungalowsPage, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Bungalow> getBungalowById(@PathVariable Long id) {
    	Bungalow bungalow = bungalowService.getBungalowById(id);
        return ResponseEntity.ok(bungalow);
    }
}