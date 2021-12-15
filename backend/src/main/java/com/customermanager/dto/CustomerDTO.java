package com.customermanager.dto;

import java.util.ArrayList;
import java.util.List;

import com.customermanager.model.Customer;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
	private Long id;
	private String name;
	private String cpf;
	private AddressDTO address;
	private List<PhoneDTO> phones;
	private List<EmailDTO> emails;
	
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
}