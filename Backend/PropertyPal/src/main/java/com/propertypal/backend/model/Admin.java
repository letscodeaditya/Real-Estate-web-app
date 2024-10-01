package com.propertypal.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;


@Entity
@Table(name = "Admin")
public class Admin {
	@Id
    @GeneratedValue
    @Column(name = "admin_id")
    private Long id;

	@Column(name = "name")
    private String name;
	
	@Column(name = "email")
    private String email;
	

	@Column(name = "password")
	private String password;
	

	@Column(name = "security_ans")
	private String securityans;

	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getSecurityans() {
		return securityans;
	}

	public void setSecurityans(String securityans) {
		this.securityans = securityans;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
