package com.customermanager.dto;

import com.customermanager.model.Address;

public class AddressDTO {
	private Long id;
	private String zipCode;
	private String publicPlace;
	private String district;
	private String city;
	private String state;
	private String complement;
	
	public AddressDTO() {
	}
	
	public AddressDTO(Long id, String zipCode, String publicPlace, String district, String city, String state,
			String complement) {
		this.id = id;
		this.zipCode = zipCode;
		this.publicPlace = publicPlace;
		this.district = district;
		this.city = city;
		this.state = state;
		this.complement = complement;
	}
	
	public AddressDTO(Address address) {
		id = address.getId();
		zipCode = address.getZipCode();
		publicPlace = address.getPublicPlace();
		district = address.getDistrict();
		city = address.getCity();
		state = address.getState();
		complement = address.getComplement();
	}
	
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
