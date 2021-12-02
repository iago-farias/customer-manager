package com.customermanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	
	@GetMapping
	public ResponseEntity<Page<CustomerDTO>> listAll(Pageable pageable) {
		Page<CustomerDTO> customers = customerService.listAll(pageable);
		
		return ResponseEntity.ok(customers);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<CustomerDTO> getById(@PathVariable(name = "id") Long id) {
	CustomerDTO customer = customerService.getById(id);
		
		return ResponseEntity.ok(customer);
	}
	
	@PostMapping(value = "/create")
	public ResponseEntity<String> addCustomer(@RequestBody Customer customer){
		customerService.addCustomer(customer);
		
		return ResponseEntity.ok("Cliente criado com sucesso");
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<String> updateCustomer(@PathVariable(name = "id") Long id, @RequestBody Customer customer){
		customerService.updateCustomer(id, customer);
		
		return ResponseEntity.ok("Cliente atualizado com sucesso");
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<String> deleteCustomer(@PathVariable(name = "id") Long id){
		customerService.deleteCustomer(id);
		
		return ResponseEntity.ok("Cliente removido com sucesso");
	}
}
