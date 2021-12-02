package com.customermanager.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "address")
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String zipCode;
	private String publicPlace;
	private String district;
	private String city;
	private String state;
	private String complement;
	
	@OneToOne(mappedBy = "address")
	private Customer customer;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getPublicPlace() {
		return publicPlace;
	}
	public void setPublicPlace(String publicPlace) {
		this.publicPlace = publicPlace;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getComplement() {
		return complement;
	}
	public void setComplement(String complement) {
		this.complement = complement;
	}
}
