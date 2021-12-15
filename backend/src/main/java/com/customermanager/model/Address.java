package com.customermanager.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "O CEP é obrigatório")
	private String zipCode;
	@NotBlank(message = "O logradouro é obrigatório")
	private String publicPlace;
	@NotBlank(message = "O bairro é obrigatório")
	private String district;
	@NotBlank(message = "A cidade é obrigatória")
	private String city;
	@NotBlank(message = "A UF é obrigatório")
	private String state;
	private String complement;
	
	@OneToOne(mappedBy = "address")
	private Customer customer;
}
