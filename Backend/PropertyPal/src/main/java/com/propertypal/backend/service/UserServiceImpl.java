package com.propertypal.backend.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.propertypal.backend.model.User;
import com.propertypal.backend.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
      
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("User with this email already exists");
        }
        return userRepository.save(user);
    }
    

    @Override
    public User loginUser(String email, String password) {
       
        User user = userRepository.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            
            user.setPassword(null);
            return user;
        }
        
        return null; 
    }
    
    
    
    @Override
    public User updateUserDetails(String email, User updatedUser) {
        
        User existingUser = userRepository.findByEmail(email);
        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }

       
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setName(updatedUser.getName());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setCity(updatedUser.getCity());
        existingUser.setPic(updatedUser.getPic());
      
        return userRepository.save(existingUser);
    }


    
    
    
    @Override
    public User updateUserPic(String email, String newPicUrl) {
        
        User existingUser = userRepository.findByEmail(email);
        if (existingUser == null) {
            throw new RuntimeException("User not found");
        }
        existingUser.setPic(newPicUrl);    
        return userRepository.save(existingUser);
    }
    
    
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    
    @Override
    public void deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            userRepository.delete(user);
        }
    }
    
    @Override
    public Map<String, String> getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            Map<String, String> userDetails = new HashMap<>();
            userDetails.put("name", user.getName());
            userDetails.put("email", user.getEmail());
            userDetails.put("phone", String.valueOf(user.getPhone()));
            return userDetails;
        }
        return null; 
    }
    
    @Override
    public User changeUserSubscription(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setSubscription("true");
            return userRepository.save(user);
        }
        return null;
    }
    
    
}

