package com.propertypal.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.propertypal.backend.model.Flat;

@Repository
public interface FlatRepository extends JpaRepository<Flat, Long> {
	Page<Flat> findByTypeAndCity(String type, String city, Pageable pageable);
	Page<Flat> findByTypeAndCityAndFlatSize(String type, String city, String flatSize, Pageable pageable);
	Flat findByFlatId(Long flatId);
	List<Flat> findAllByFlatIdIn(List<Long> flatIds);
	Page<Flat> findByPrime(String prime, Pageable pageable);
	Page<Flat> findByPostedBy(Long postedBy, Pageable pageable);

}
