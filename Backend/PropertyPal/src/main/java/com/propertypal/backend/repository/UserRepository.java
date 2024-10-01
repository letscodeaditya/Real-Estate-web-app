package com.propertypal.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.propertypal.backend.model.User;



public interface UserRepository extends JpaRepository<User,Long> {
	User findByEmail(String email);
}

