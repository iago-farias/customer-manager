package com.customermanager.dto;

import com.customermanager.model.Phone;
import com.customermanager.model.Phone.PhoneType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PhoneDTO {
	private Long id;
	private String number;
	private PhoneType phoneType;
	
	public PhoneDTO(Phone phone) {
		id = phone.getId();
		number = phone.getNumber();
		phoneType = phone.getPhoneType();
	}	
}
