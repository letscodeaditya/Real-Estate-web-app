package com.propertypal.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import com.propertypal.backend.model.Flat;


public interface FlatService {
    Flat saveFlat(Flat flat);
    Page<Flat> getFlatsByTypeAndCity(String type, String city, int page, int size);
    Page<Flat> getFlatsByTypeCityAndSize(String type, String city, String flatSize, int pageno, int size);
    List<Flat> getAllFlat();
    void deleteFlatByFlatId(Long flatId);
    Flat getFlatById(Long id);
    Page<Flat> getPrimeFlats(int pageNo, int pageSize);
    Page<Flat> getFlatsPostedByUser(Long postedBy, int pageNo, int pageSize);
    Flat updateFlatDetails(Long id, Flat updatedFlat);
}