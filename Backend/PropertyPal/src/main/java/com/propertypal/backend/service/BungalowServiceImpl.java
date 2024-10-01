package com.propertypal.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.propertypal.backend.model.Bungalow;
import com.propertypal.backend.model.Flat;
import com.propertypal.backend.repository.BungalowRepository;

@Service
public class BungalowServiceImpl implements BungalowService {

	@Autowired
    private BungalowRepository bungalowRepository;

    @Override
    public Bungalow saveBungalow(Bungalow bungalow) {
        return bungalowRepository.save(bungalow);
    }

    @Override
    public Page<Bungalow> getBungalowsByTypeAndCity(String type, String city, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bungalowRepository.findByTypeAndCity(type, city, pageable);
    }
    
    @Override
    public Page<Bungalow> getBungalowsByTypeCityAndSize(String type, String city, String bungalowSize, int pageno, int size) {
        Pageable pageable = PageRequest.of(pageno, size);
        return bungalowRepository.findByTypeAndCityAndBungalowSize(type, city, bungalowSize, pageable);
    }
    
    @Override
    public List<Bungalow> getAllBungalow() {
        return bungalowRepository.findAll();
    }
    
    @Override
    public void deleteBungalowByBungalowId(Long bungalowId) {
        Bungalow bungalow = bungalowRepository.findByBungalowId(bungalowId);
        if (bungalow != null) {
            bungalowRepository.delete(bungalow);
        }
    }
    
    @Override
    public Bungalow getBungalowById(Long id) {
        return bungalowRepository.findById(id).orElse(null);
    }
    
    @Override
    public Page<Bungalow> getBungalowsPostedByUser(Long postedBy, int pageNo, int pageSize){
    	   // Create a pageable object with page number and size
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        // Fetch the flats using pagination
        Page<Bungalow> bungalowsPage = bungalowRepository.findByPostedBy(postedBy, pageable);

        // If the page content is empty, throw an exception or handle it accordingly
        if (bungalowsPage.hasContent()) {
            return bungalowsPage;
        } else {
            throw new RuntimeException("No bungalows found for the user.");
        }
    }
    
    
}
