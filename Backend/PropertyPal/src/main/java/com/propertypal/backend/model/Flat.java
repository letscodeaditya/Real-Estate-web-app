package com.propertypal.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;


@Entity
@Table(name = "flat")
public class Flat {
    @Id
    @GeneratedValue
    @Column(name = "Flat_id")
    private Long flatId;

	@Column(name = "apartment_name")
    private String apartmentName;

    @Column(name = "floor_number")
    private int floorNumber;
    
    @Column(name = "flat_number")
    private int flatNumber;

    @Column(name = "flat_size")
    private String flatSize;


    @Column(name = "type")
    private String type;

    @Column(name = "photo1")
    private String photo1;

    @Column(name = "photo2")
    private String photo2;

    @Column(name = "photo3")
    private String photo3;
    
    @Column(name = "flat_area_square")
    private String flatAreaSquare;
    
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
	
	
    
	  public String getCity() {
			return city;
		}


		public void setCity(String city) {
			this.city = city;
		}

	
	
    


	public String getApartmentName() {
		return apartmentName;
	}


	public void setApartmentName(String apartmentName) {
		this.apartmentName = apartmentName;
	}


	public int getFloorNumber() {
		return floorNumber;
	}


	public void setFloorNumber(int floorNumber) {
		this.floorNumber = floorNumber;
	}


	public String getFlatSize() {
		return flatSize;
	}


	public void setFlatSize(String flatSize) {
		this.flatSize = flatSize;
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


	public String isPrime() {
		return prime;
	}


	public void setPrime(String prime) {
		this.prime = prime;
	}
	
	 public int getFlatNumber() {
			return flatNumber;
		}


		public void setFlatNumber(int flatNumber) {
			this.flatNumber = flatNumber;
		}


		public String getFlatAreaSquare() {
			return flatAreaSquare;
		}


		public void setFlatAreaSquare(String flatAreaSquare) {
			this.flatAreaSquare = flatAreaSquare;
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

		public Long getFlatId() {
			return flatId;
		}


		public void setFlatId(Long flatId) {
			this.flatId = flatId;
		}





    
    
    public Flat() {
        // Set default image URLs
        this.photo1 = "https://res.cloudinary.com/dq5bhyeii/image/upload/v1715208658/dbtwheiymjqgwbcanlio.jpg";
        this.photo2 = "https://res.cloudinary.com/dq5bhyeii/image/upload/v1715208657/wsvci6qjbqf3zjtgvjee.jpg";
        this.photo3 = "https://res.cloudinary.com/dq5bhyeii/image/upload/v1715208975/ul5azwptxdawkcvjrzjb.jpg";
    }

   
}
