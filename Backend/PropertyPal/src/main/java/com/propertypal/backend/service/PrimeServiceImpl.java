package com.propertypal.backend.service;
import com.propertypal.backend.model.Prime;
import com.propertypal.backend.repository.PrimeRepository;
import com.propertypal.backend.service.PrimeService;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrimeServiceImpl implements PrimeService {

    @Autowired
    private PrimeRepository primeRepository;

    @Override
    public void addPrimeSubscription(Long userId, Date date, String paymentType) {
        Prime subscription = new Prime();
        subscription.setUserId(userId);
        subscription.setDate(date);
        subscription.setPaymentType(paymentType);
        primeRepository.save(subscription);
    }
}