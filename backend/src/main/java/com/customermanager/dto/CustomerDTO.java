package com.customermanager.dto;

import java.util.ArrayList;
import java.util.List;

import com.customermanager.model.Customer;

public class CustomerDTO {
	private Long id;
	private String name;
	private String cpf;
	private AddressDTO address;
	private List<PhoneDTO> phones;
	private List<EmailDTO> emails;
	
	public CustomerDTO() {
	}
	
	public CustomerDTO(Long id, String name, String cpf, AddressDTO address, List<PhoneDTO> phones,
			List<EmailDTO> emails) {
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.address = address;
		this.phones = phones;
		this.emails = emails;
	}
	
	public CustomerDTO(Customer customer) {
		id = customer.getId();
		name = customer.getName();
		cpf = customer.getCpf();
		address = new AddressDTO(customer.getAddress());
		
		List<PhoneDTO> phonesList = new ArrayList<PhoneDTO>();
		List<EmailDTO> emailList = new ArrayList<EmailDTO>();
		
		customer.getPhones().forEach(phone -> phonesList.add(new PhoneDTO(phone)));
		customer.getEmails().forEach(email -> emailList.add(new EmailDTO(email)));
		
		phones = phonesList;
		emails = emailList;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public AddressDTO getAddress() {
		return address;
	}
	public void setAddress(AddressDTO address) {
		this.address = address;
	}
	public List<PhoneDTO> getPhones() {
		return phones;
	}
	public void setPhones(List<PhoneDTO> phones) {
		this.phones = phones;
	}
	public List<EmailDTO> getEmails() {
		return emails;
	}
	public void setEmails(List<EmailDTO> emails) {
		this.emails = emails;
	}
	
}
