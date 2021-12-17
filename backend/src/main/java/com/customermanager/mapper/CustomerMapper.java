package com.customermanager.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.customermanager.dto.CustomerDTO;
import com.customermanager.model.Customer;

@Mapper
public interface CustomerMapper {
	CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);
	
	CustomerDTO customerToCustomerDTO(Customer customer);
}
