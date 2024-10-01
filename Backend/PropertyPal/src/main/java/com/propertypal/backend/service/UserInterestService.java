package com.propertypal.backend.service;
import com.propertypal.backend.model.UserInterest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface UserInterestService {
	UserInterest addInterest(Long userId, Long flatId, Long bungalowId);
	 Page<UserInterest> getUserInterests(Long userId, Pageable pageable); 
    void deleteInterest(Long id);
    Long isPropertyInterestedByUser(Long userId, Long flatId, Long bungalowId);
}