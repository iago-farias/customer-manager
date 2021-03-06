package com.customermanager.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.customermanager.dto.CustomerDTO;
import com.customermanager.model.Customer;
import com.customermanager.services.CustomerService;

@RestController
@RequestMapping(value = "/customers")
@CrossOrigin
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping
	public ResponseEntity<Page<CustomerDTO>> listAll(Pageable pageable) {
		Page<CustomerDTO> customers = customerService.listAll(pageable);
		
		return ResponseEntity.ok(customers);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping(value = "/{id}")
	public ResponseEntity<CustomerDTO> getById(@PathVariable(name = "id") Long id) {
	CustomerDTO customer = customerService.getById(id);
		
		return ResponseEntity.ok(customer);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(value = "/create")
	public ResponseEntity<CustomerDTO> addCustomer(@Valid @RequestBody Customer customer){
		CustomerDTO newCustomer = customerService.addCustomer(customer);
		
		return ResponseEntity.ok(newCustomer);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable(name = "id") Long id, @Valid @RequestBody Customer customer){
		CustomerDTO updatedCustomer = customerService.updateCustomer(id, customer);
		
		return ResponseEntity.ok(updatedCustomer);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable(name = "id") Long id){
		customerService.deleteCustomer(id);
		
		return ResponseEntity.ok("Cliente removido com sucesso");
	}
}
