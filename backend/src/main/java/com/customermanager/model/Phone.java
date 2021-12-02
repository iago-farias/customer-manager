package com.customermanager.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

enum PhoneType {
	Residencial,
	Comercial,
	Celular
}

@Entity
@Table(name = "phone")
public class Phone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String number;
	@Enumerated(EnumType.STRING)
	private PhoneType phoneType;
	
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
