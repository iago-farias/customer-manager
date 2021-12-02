package com.customermanager.dto;

import com.customermanager.model.Email;

public class EmailDTO {
	private Long id;
	private String emailAddress;
	
	public EmailDTO() {
	}
	
	public EmailDTO(Long id, String emailAddress) {
		this.id = id;
		this.emailAddress = emailAddress;
	}
	
	public EmailDTO(Email email) {
		id = email.getId();
		emailAddress = email.getEmailAddress();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
}
