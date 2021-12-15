package com.customermanager.dto;

import com.customermanager.model.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDTO {
	private Long id;
	private String zipCode;
	private String publicPlace;
	private String district;
	private String city;
	private String state;
	private String complement;
	
	public AddressDTO(Address address) {
		id = address.getId();
		zipCode = address.getZipCode();
		publicPlace = address.getPublicPlace();
		district = address.getDistrict();
		city = address.getCity();
		state = address.getState();
		complement = address.getComplement();
	}	
}