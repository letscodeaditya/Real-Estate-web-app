package com.propertypal.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.util.Random;
import jakarta.persistence.Column;

@Entity
@Table(name = "users")
public class User {
	
	 	@Id
	    @GeneratedValue
	    @Column(name = "user_id")
	    private Long id;
	    
	    @Column(name = "phone")
		private Long phone;
	    
	    @Column(name = "name")
	    private String name;
	    
	    @Column(name = "email")
	    private String email;
	    
	    @Column(name = "password")
	    private String password;
	    
	    @Column(name = "gender")
	    private String gender;
	    
	    @Column(name = "subscription")
	    private String subscription;
	    
	    @Column(name = "city")
	    private String city;
	    
	    @Column(name = "pic")
	    private String pic;
	    
	    @Column(name = "ac_type")
	    private String type;
	    
	    
	 // Constructors, getters, and setters 
	    
	    public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public Long getPhone() {
			return phone;
		}

		public void setPhone(Long phone) {
			this.phone = phone;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getSubscription() {
			return subscription;
		}

		public void setSubscription(String subscription) {
			this.subscription = subscription;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}

		public String getPic() {
			return pic;
		}

		public void setPic(String pic) {
			this.pic = pic;
		}
		
		  @PrePersist
		    public void prePersist() {
		        if (pic == null || pic.isEmpty()) {
		            pic = generateRandomImageUrl(gender);
		        }
		        if (subscription == null || subscription.isEmpty()) {
		            subscription = "false";
		        }
		    }
		
		public User() {}
	    

		// Parameterized constructor
	    public User(Long phone, String name, String email, String password, String gender, String subscription, String city, String type) {
	        this.phone = phone;
	        this.name = name;
	        this.email = email;
	        this.password = password;
	        this.gender = gender;
	        if (subscription == null || subscription.isEmpty()) {
	            this.subscription = "false"; 
	        } else {
	            this.subscription = subscription;
	        }
	        this.city = city;
	        this.pic = generateRandomImageUrl(gender);
	        this.type = type;
	    }

	    
	   

		private String generateRandomImageUrl(String gender) {
	        String[] maleImages = {
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/mqrt2vsiu0rks9gxz0if.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/murqweh6j35pscp7hkml.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/dbttvdwylxks6hxgybkx.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/kl2kpiuyhv9z5gbvp111.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/q5kryu8iz6bvkrzsip2d.png"
	        };
	        String[] femaleImages = {
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824770/itsxq0yas1cenufuw98r.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824770/pvkf4a9tm0xvztam6hfb.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824770/secgm06q6ezgst91y8xf.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/rasjqugnoa9doxr7t3av.png",
	            "https://res.cloudinary.com/dq5bhyeii/image/upload/v1707824769/jrq9ngwsmnfpvxfuxs1m.png"
	        };

	      
	        Random random = new Random();
	        String[] images = (gender.equalsIgnoreCase("male")) ? maleImages : femaleImages;
	        int randomIndex = random.nextInt(images.length);
	        return images[randomIndex];
	    }


}