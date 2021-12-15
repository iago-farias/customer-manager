package com.customermanager.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.customermanager.dto.CustomerDTO;
import com.customermanager.exception.BusinessException;
import com.customermanager.model.Customer;
import com.customermanager.repositories.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;
	
	@Transactional(readOnly = true)
	public Page<CustomerDTO> listAll(Pageable pageable) {
		Page<Customer> result = customerRepository.findAll(pageable);
		
		return result.map(customer -> new CustomerDTO(customer));
	}
	
	@Transactional(readOnly = true)
	public CustomerDTO getById(Long id) {
		Optional<Customer> result = customerRepository.findById(id);
		
		if(result.isEmpty()) {
			throw new BusinessException("Cliente com id "+ id + " não encontrado");
		}
		
		return new CustomerDTO(result.get());
	}
	
	@Transactional
	public CustomerDTO addCustomer(Customer customer) {
		Customer newCustomer = customerRepository.save(customer);
		
		return new CustomerDTO(newCustomer);
	}
	
	@Transactional
	public CustomerDTO updateCustomer(Long id, Customer customer) {
		boolean exists = customerRepository.existsById(id);
		
		if(!exists) {
			throw new BusinessException("Cliente com id "+ id + " não encontrado");
		}
		
		customer.setId(id);
		
		Customer updatedCustomer = customerRepository.save(customer);
		
		return new CustomerDTO(updatedCustomer);
	}
	
	@Transactional
	public void deleteCustomer(Long id) {
		boolean exists = customerRepository.existsById(id);
		
		if(!exists) {
			throw new BusinessException("Cliente com id "+ id + " não encontrado");
		}
		
		customerRepository.deleteById(id);
	}
}
