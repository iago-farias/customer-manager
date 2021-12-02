package com.customermanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.customermanager.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
}
