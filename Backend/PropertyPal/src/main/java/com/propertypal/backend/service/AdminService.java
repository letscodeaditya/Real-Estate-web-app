package com.propertypal.backend.service;

import com.propertypal.backend.model.Admin;

public interface AdminService {
	Admin loginAdmin(String email, String password, String securityans);
}
