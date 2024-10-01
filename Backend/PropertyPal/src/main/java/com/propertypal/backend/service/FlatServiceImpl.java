package com.propertypal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.propertypal.backend.model.Flat;
import com.propertypal.backend.model.User;
import com.propertypal.backend.repository.FlatRepository;

@Service
public class FlatServiceImpl implements FlatService {

    @Autowired
    private FlatRepository flatRepository;
    

    @Override
    public Flat saveFlat(Flat flat) {
        return flatRepository.save(flat);
    }

    @Override
    public Page<Flat> getFlatsByTypeAndCity(String type, String city, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return flatRepository.findByTypeAndCity(type, city, pageable);
    }
    
    @Override
    public Page<Flat> getFlatsByTypeCityAndSize(String type, String city, String flatSize, int pageno, int size) {
        Pageable pageable = PageRequest.of(pageno, size);
        return flatRepository.findByTypeAndCityAndFlatSize(type, city, flatSize, pageable);
    }
    
    @Override
    public List<Flat> getAllFlat() {
        return flatRepository.findAll();
    }
    
    @Override
    public void deleteFlatByFlatId(Long flatId) {
        Flat flat = flatRepository.findByFlatId(flatId);
        if (flat != null) {
            flatRepository.delete(flat);
        }
    }
    
    @Override
    public Flat getFlatById(Long id) {
        return flatRepository.findById(id).orElse(null);
    }
    
    @Override
    public Page<Flat> getPrimeFlats(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return flatRepository.findByPrime("true", pageable);
    }
    
    
    @Override
    public Page<Flat> getFlatsPostedByUser(Long postedBy, int pageNo, int pageSize) {
        // Create a pageable object with page number and size
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        // Fetch the flats using pagination
        Page<Flat> flatsPage = flatRepository.findByPostedBy(postedBy, pageable);

        // If the page content is empty, throw an exception or handle it accordingly
        if (flatsPage.hasContent()) {
            return flatsPage;
        } else {
            throw new RuntimeException("No flats found for the user.");
        }
    }

    
    
    @Override
    public Flat updateFlatDetails(Long flatId, Flat updatedFlat) {
    	Flat exisitingFlat = flatRepository.findByFlatId(flatId);
    	
    	if(exisitingFlat == null) {
    		throw new RuntimeException("Flat not found"); 
    	}
    	
    	exisitingFlat.setAddress(updatedFlat.getAddress());
    	exisitingFlat.setApartmentName(updatedFlat.getApartmentName());
    	exisitingFlat.setFloorNumber(updatedFlat.getFloorNumber());
    	exisitingFlat.setFlatNumber(updatedFlat.getFlatNumber());
    	exisitingFlat.setFlatSize(updatedFlat.getFlatSize());
    	exisitingFlat.setPhoto1(updatedFlat.getPhoto1());
    	exisitingFlat.setPhoto2(updatedFlat.getPhoto2());
    	exisitingFlat.setPhoto3(updatedFlat.getPhoto3());
    	exisitingFlat.setFlatAreaSquare(updatedFlat.getFlatAreaSquare());
    	exisitingFlat.setFurnishing(updatedFlat.getFurnishing());
    	exisitingFlat.setPrice(updatedFlat.getPrice());
    	exisitingFlat.setAddress(updatedFlat.getAddress());
    	exisitingFlat.setAgeOfConstruction(updatedFlat.getAgeOfConstruction());
    	exisitingFlat.setDescription(updatedFlat.getDescription());
    	exisitingFlat.setType(updatedFlat.getType());
    	
    	return flatRepository.save(exisitingFlat);
    	
    }
    
    
}


