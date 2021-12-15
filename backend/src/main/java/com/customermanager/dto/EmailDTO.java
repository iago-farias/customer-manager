package com.customermanager.dto;

import com.customermanager.model.Email;

import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailDTO {
	private Long id;
	private String emailAddress;
	
	public EmailDTO(Email email) {
		id = email.getId();
		emailAddress = email.getEmailAddress();
	}
}