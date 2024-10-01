package com.propertypal.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserInterest {
    
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "flatId", referencedColumnName = "Flat_id", nullable = false)
    private Flat flat;
    
    @ManyToOne
    @JoinColumn(name = "bungalowId", referencedColumnName = "Bungalow_id", nullable = true)
    private Bungalow bungalow;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Flat getFlat() {
        return flat;
    }

    public void setFlat(Flat flat) {
        this.flat = flat;
    }

    public Bungalow getBungalow() {
        return bungalow;
    }

    public void setBungalow(Bungalow bungalow) {
        this.bungalow = bungalow;
    }
}
