package com.propertypal.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.propertypal.backend.model.Bungalow;
import com.propertypal.backend.model.Flat;


public interface BungalowService {
	Bungalow saveBungalow(Bungalow bungalow);
    Page<Bungalow> getBungalowsByTypeAndCity(String type, String city, int page, int size);
    Page<Bungalow> getBungalowsByTypeCityAndSize(String type, String city, String bungalowSize, int pageno, int size);
    List<Bungalow> getAllBungalow();
    void deleteBungalowByBungalowId(Long bungalowId);
    Bungalow getBungalowById(Long id);
    Page<Bungalow> getBungalowsPostedByUser(Long postedBy, int pageNo, int pageSize);
    
}
