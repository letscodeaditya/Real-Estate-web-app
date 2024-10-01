package com.propertypal.backend.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.propertypal.backend.model.UserInterest;

@Repository
public interface UserInterestRepository extends JpaRepository<UserInterest, Long> {
	Page<UserInterest> findByUserId(Long userId, Pageable pageable); 
	 @Query("SELECT ui.id FROM UserInterest ui WHERE ui.user.id = :userId AND ui.flat.flatId = :flatId")
	    Long findIdByUserIdAndFlatId(@Param("userId") Long userId, @Param("flatId") Long flatId);

	    @Query("SELECT ui.id FROM UserInterest ui WHERE ui.user.id = :userId AND ui.bungalow.bungalowId = :bungalowId")
	    Long findIdByUserIdAndBungalowId(@Param("userId") Long userId, @Param("bungalowId") Long bungalowId);
}