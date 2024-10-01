package com.propertypal.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.propertypal.backend.model.Admin;


public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}