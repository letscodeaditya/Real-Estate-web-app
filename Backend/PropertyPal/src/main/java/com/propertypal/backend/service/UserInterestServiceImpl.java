package com.propertypal.backend.service;

import com.propertypal.backend.model.User;
import com.propertypal.backend.model.Flat;
import com.propertypal.backend.model.Bungalow;
import com.propertypal.backend.model.UserInterest;
import com.propertypal.backend.repository.UserRepository;
import com.propertypal.backend.repository.FlatRepository;
import com.propertypal.backend.repository.BungalowRepository;
import com.propertypal.backend.repository.UserInterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class UserInterestServiceImpl implements UserInterestService {

    private final UserInterestRepository userInterestRepository;
    private final UserRepository userRepository;
    private final FlatRepository flatRepository;
    private final BungalowRepository bungalowRepository;

    @Autowired
    public UserInterestServiceImpl(UserInterestRepository userInterestRepository, 
                                   UserRepository userRepository,
                                   FlatRepository flatRepository,
                                   BungalowRepository bungalowRepository) {
        this.userInterestRepository = userInterestRepository;
        this.userRepository = userRepository;
        this.flatRepository = flatRepository;
        this.bungalowRepository = bungalowRepository;
    }

    @Override
    public UserInterest addInterest(Long userId, Long flatId, Long bungalowId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID must be provided");
        }
        
        if ((flatId == null && bungalowId == null) || (flatId != null && bungalowId != null)) {
            throw new IllegalArgumentException("Exactly one of flatId or bungalowId must be provided");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new IllegalArgumentException("User not found");
        }

        User user = userOptional.get();
        Flat flat = null;
        Bungalow bungalow = null;

        if (flatId != null) {
            Optional<Flat> flatOptional = flatRepository.findById(flatId);
            if (!flatOptional.isPresent()) {
                throw new IllegalArgumentException("Flat not found");
            }
            flat = flatOptional.get();
        } else {
            Optional<Bungalow> bungalowOptional = bungalowRepository.findById(bungalowId);
            if (!bungalowOptional.isPresent()) {
                throw new IllegalArgumentException("Bungalow not found");
            }
            bungalow = bungalowOptional.get();
        }

        UserInterest interest = new UserInterest();
        interest.setUser(user);
        interest.setFlat(flat);
        interest.setBungalow(bungalow);

        return userInterestRepository.save(interest);
    }

    @Override
    public Page<UserInterest> getUserInterests(Long userId, Pageable pageable) {
        return userInterestRepository.findByUserId(userId, pageable);
    }

    @Override
    public void deleteInterest(Long id) {
        userInterestRepository.deleteById(id);
    }

    @Override
    public Long isPropertyInterestedByUser(Long userId, Long flatId, Long bungalowId) {
        if (flatId != null) {
            return userInterestRepository.findIdByUserIdAndFlatId(userId, flatId);
        } else if (bungalowId != null) {
            return userInterestRepository.findIdByUserIdAndBungalowId(userId, bungalowId);
        }
        throw new IllegalArgumentException("Either flatId or bungalowId must be provided");
    }
}
