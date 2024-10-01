package com.propertypal.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="bungalow")
public class Bungalow {
	@Id
    @GeneratedValue
    @Column(name = "Bungalow_id")
    private Long bungalowId;

	@Column(name = "bungalow_name")
    private String bungalowName;

    @Column(name = "bungalowSize")
    private String bungalowSize;

    @Column(name = "type")
    private String type;

    @Column(name = "photo1")
    private String photo1;

    @Column(name = "photo2")
    private String photo2;

    @Column(name = "photo3")
    private String photo3;
    
    @Column(name = "flat_area_square")
    private String bungalowAreaSquare;
    
    @Column(name = "furnishing")
	private String furnishing;
    
    @Column(name = "price")
    private String price;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "age_of_construction")
    private String ageOfConstruction;

    @Column(name = "description")
    private String description;

    @Column(name = "posted_by")
    private Long postedBy;

    @Column(name = "is_prime")
    private String prime;
    
 
	@Column(name = "city")
    private String city;
	
	
	
	 public Long getBungalowId() {
			return bungalowId;
		}

		public void setBungalowId(Long bungalowId) {
			this.bungalowId = bungalowId;
		}


		public String getBungalowName() {
			return bungalowName;
		}

		public void setBungalowName(String bungalowName) {
			this.bungalowName = bungalowName;
		}

		public String getBungalowSize() {
			return bungalowSize;
		}


		public void setBungalowSize(String bungalowSize) {
			this.bungalowSize = bungalowSize;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getPhoto1() {
			return photo1;
		}

		public void setPhoto1(String photo1) {
			this.photo1 = photo1;
		}

		public String getPhoto2() {
			return photo2;
		}

		public void setPhoto2(String photo2) {
			this.photo2 = photo2;
		}

		public String getPhoto3() {
			return photo3;
		}

		public void setPhoto3(String photo3) {
			this.photo3 = photo3;
		}

		public String getBungalowAreaSquare() {
			return bungalowAreaSquare;
		}
		
		public void setBungalowAreaSquare(String bungalowAreaSquare) {
			this.bungalowAreaSquare = bungalowAreaSquare;
		}
		public String getFurnishing() {
			return furnishing;
		}
		public void setFurnishing(String furnishing) {
			this.furnishing = furnishing;
		}
		public String getPrice() {
			return price;
		}

		public void setPrice(String price) {
			this.price = price;
		}

		public String getAddress() {
			return address;
		}

		public void setAddress(String address) {
			this.address = address;
		}

		public String getAgeOfConstruction() {
			return ageOfConstruction;
		}

		public void setAgeOfConstruction(String ageOfConstruction) {
			this.ageOfConstruction = ageOfConstruction;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public Long getPostedBy() {
			return postedBy;
		}

		public void setPostedBy(Long postedBy) {
			this.postedBy = postedBy;
		}

		public String getPrime() {
			return prime;
		}

		public void setPrime(String prime) {
			this.prime = prime;
		}

		public String getCity() {
			return city;
		}

		public void setCity(String city) {
			this.city = city;
		}


    public Bungalow() {
        // Set default image URLs
        this.photo1 = "https://res.cloudinary.com/dq5bhyeii/image/upload/v1715208658/dbtwheiymjqgwbcanlio.jpg";
        this.photo2 = "https://res.cloudinary.com/dq5bhyeii/image/upload/v1715208657/wsvci6qjbqf3zjtgvjee.jpg";
        this.photo3 = "https://res.cloudinary.com/dq5bhyeii/image/upload/v1715208975/ul5azwptxdawkcvjrzjb.jpg";
    }
	
	}