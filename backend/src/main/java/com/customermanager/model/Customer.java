package com.customermanager.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import javax.validation.constraints.Pattern;

@Entity
@Table(name = "customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "O Nome é obrigatório")
	@Size(min = 3, max = 100, message = "O Nome deve ter entre 3 a 100 caracteres")
	@Pattern(message = "O nome deve ter apenas letras, espaços e números", regexp = "[a-zA-Z0-9 ]+")
	private String name;
	@NotBlank(message = "O CPF é obrigatório")
	private String cpf;
	@OneToOne(cascade = CascadeType.ALL)
	@Valid
	private Address address;
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	@NotEmpty(message = "É necessário cadastrar pelo menos 1 telefone para contato")
	@Valid
	private List<Phone> phones;
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	@NotEmpty(message = "É necessário cadastrar pelo menos 1 email para contato")
	@Valid
	private List<Email> emails;
	
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
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public List<Phone> getPhones() {
		return phones;
	}
	public void setPhones(List<Phone> phones) {
		this.phones = phones;
	}
	public List<Email> getEmails() {
		return emails;
	}
	public void setEmails(List<Email> emails) {
		this.emails = emails;
	}	
}
