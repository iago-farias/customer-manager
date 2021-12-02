package com.customermanager.dto;

import com.customermanager.model.Phone;
import com.customermanager.model.Phone.PhoneType;

public class PhoneDTO {
	private Long id;
	private String number;
	private PhoneType phoneType;
	
	public PhoneDTO(){
	}
	
	public PhoneDTO(Long id, String number, PhoneType phoneType) {
		this.id = id;
		this.number = number;
		this.phoneType = phoneType;
	}
	
	public PhoneDTO(Phone phone) {
		id = phone.getId();
		number = phone.getNumber();
		phoneType = phone.getPhoneType();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public PhoneType getPhoneType() {
		return phoneType;
	}
	public void setPhoneType(PhoneType phoneType) {
		this.phoneType = phoneType;
	}
	
}
