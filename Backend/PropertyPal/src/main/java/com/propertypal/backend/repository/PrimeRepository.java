package com.propertypal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.propertypal.backend.model.Prime;

public interface PrimeRepository extends JpaRepository<Prime, Long> {
}