package com.propertypal.backend.service;
import java.util.Date;

public interface PrimeService {
    void addPrimeSubscription(Long userId, Date date, String paymentType);
}