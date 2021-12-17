package com.customermanager.dto;

import java.util.List;

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
}