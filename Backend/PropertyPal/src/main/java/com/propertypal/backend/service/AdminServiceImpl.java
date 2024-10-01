package com.propertypal.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.propertypal.backend.model.Admin;
import com.propertypal.backend.repository.AdminRepository;


@Service
public class AdminServiceImpl implements AdminService {
	
	 private final AdminRepository adminRepository;
	
	@Autowired
    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }
    

    @Override
    public Admin loginAdmin(String email, String password, String securityans) {
       
        Admin admin = adminRepository.findByEmail(email);

        if (admin != null && admin.getPassword().equals(password) && admin.getSecurityans().equals(securityans)) {
            
            admin.setPassword(null);
            return admin;
        }
        
        return null; 
    }
   
}
