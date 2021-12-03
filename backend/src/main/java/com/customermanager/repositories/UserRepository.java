package com.customermanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.customermanager.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUserName(String userName);
}
