package com.customermanager.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "phone")
@Getter
@Setter
public class Phone {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "O número de telefone é obrigatório")
	private String number;
	@Enumerated(EnumType.STRING)
	@NotNull(message = "O tipo de telefone é obrigatório")
	private PhoneType phoneType;
	
	public enum PhoneType {
		Residencial,
		Comercial,
		Celular
	}
}
