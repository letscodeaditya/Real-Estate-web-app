package com.propertypal.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.propertypal.backend.model.Flat;
import com.propertypal.backend.service.FlatService;

@RestController
@RequestMapping("/api/flats")
public class FlatController {

    @Autowired
    private FlatService flatService;

    @PostMapping("/add")
    public ResponseEntity<Flat> addFlat(@RequestBody Flat flat) {
        Flat savedFlat = flatService.saveFlat(flat);
        return ResponseEntity.ok(savedFlat);
    }

    @GetMapping("/rent/{city}/{pageno}/{size}")
    public ResponseEntity<Page<Flat>> getRentFlats(
            @PathVariable String city,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(flatService.getFlatsByTypeAndCity("rent", city, pageno, size));
    }

    @GetMapping("/sell/{city}/{pageno}/{size}")
    public ResponseEntity<Page<Flat>> getSellFlats(
            @PathVariable String city,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(flatService.getFlatsByTypeAndCity("sell", city, pageno, size));
    }
    
    @GetMapping("/rent/{city}/{flatSize}/{pageno}/{size}")
    public ResponseEntity<Page<Flat>> getRentFlatsBySize(
            @PathVariable String city,
            @PathVariable String flatSize,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(flatService.getFlatsByTypeCityAndSize("rent", city, flatSize, pageno, size));
    }

    @GetMapping("/sell/{city}/{flatSize}/{pageno}/{size}")
    public ResponseEntity<Page<Flat>> getSellFlatsBySize(
            @PathVariable String city,
            @PathVariable String flatSize,
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(flatService.getFlatsByTypeCityAndSize("sell", city, flatSize, pageno, size));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Flat> getFlatById(@PathVariable Long id) {
        Flat flat = flatService.getFlatById(id);
        return ResponseEntity.ok(flat);
    }
    
    @GetMapping("/prime/{pageno}/{size}")
    public ResponseEntity<Page<Flat>> getPrimeFlats(
            @PathVariable int pageno,
            @PathVariable int size) {
        return ResponseEntity.ok(flatService.getPrimeFlats(pageno, size));
    }
    
    @GetMapping("/yourpostsflats/{postedBy}/{pageNo}/{pageSize}")
    public ResponseEntity<Page<Flat>> getFlatsByUser(
        @PathVariable Long postedBy,
        @PathVariable int pageNo,
        @PathVariable int pageSize
    ) {
        Page<Flat> flatsPage = flatService.getFlatsPostedByUser(postedBy, pageNo, pageSize);
        return new ResponseEntity<>(flatsPage, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public void deleteFlatByFlatId(@PathVariable Long id) {
        flatService.deleteFlatByFlatId(id);
    }
    
    @PutMapping("/update/{id}")
    public void updateFlatDetails(@PathVariable Long id, @RequestBody Flat updatedFlat) {
        flatService.updateFlatDetails(id, updatedFlat);
    }
}
