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

@Entity
@Table(name = "customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String cpf;
	@OneToOne(cascade = CascadeType.ALL)
	private Address address;
	@OneToMany
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
	private List<Phone> phones;
	@OneToMany
	@JoinColumn(name = "customer_id", referencedColumnName = "id")
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
